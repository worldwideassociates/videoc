import { StreamClient } from "@stream-io/node-sdk";
import { PrismaClient } from "@prisma/client";
import { createReadStream, createWriteStream } from "fs";
import { pipeline as pipelineCallback } from "stream";
import { promisify } from "util";
import { fileURLToPath } from "url";
import path from "path";
import { readdir, unlink } from "fs/promises";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAVE_PATH = path.join(__dirname, "../.stream-data/");
const CDN_BASE_URL = "https://videoconf.b-cdn.net";

const streamApiKey = process.env.STREAM_API_KEY;
const streamSecret = process.env.STREAM_API_SECRET;
const bunnyApiKey = process.env.BUNNY_API_KEY;

const client = new StreamClient(streamApiKey, streamSecret);

const prisma = new PrismaClient();

/**
 * Download a video from a URL and save it to the local filesystem
 * @param {String} url - The URL of the video to download
 * @param {String} filename - The name of the file to save the video as
 */
async function download(url, filename) {
  console.log("Downloading:", filename);

  const pipeline = promisify(pipelineCallback);

  const savePath = path.join(SAVE_PATH, filename);

  const response = await axios({
    method: "get",
    url,
    headers: {
      api_key: streamApiKey,
    },
  });

  if (response.status !== 200)
    throw new Error(`unexpected response ${response.statusText}`);

  await pipeline(response.data, createWriteStream(savePath));
  console.log(`Video downloaded to ${savePath}`);
}

async function main() {
  // Get current time
  const currentTime = new Date();

  // Calculate the past 12 hours
  const pastTime = new Date(currentTime.getTime() - 12 * 60 * 60 * 1000);

  // Get meetings scheduled and done in the past 12 hours
  const meetings = await prisma.meeting.findMany({
    where: {
      startDateTime: {
        // gte: currentTime,
        // gte: pastTime,
      },
    },
    include: {
      recordings: true,
    },
  });

  await new Promise((resolve, reject) =>
    meetings.forEach(async (meeting) => {
      // TODO: uncomment this line
      // if (meeting.recordings.length > 0)
      //   return console.log("Skip meeting: saved recording found");

      const callType = "default";
      const call = client.video.call(callType, meeting.id);

      const result = await call.listRecordings();
      if (result.recordings.length === 0)
        return console.log("No recordings found for meeting", meeting.id);

      if (result.recordings.length > 0) {
        const recording = result.recordings[0];

        try {
          await download(recording.url, recording.filename);
        } catch (error) {
          // TODO: send to honeybadger
          console.error;
        } finally {
          resolve(true);
        }
      }
    })
  );

  console.log("Downloaded......");

  //update the downloaded recordings to bunnycdn
  uploadToCdn();
}

/**
 * Reads the files in the SAVE_PATH directory and uploads them to BunnyCDN
 * it clears the directory after uploading
 */
async function uploadToCdn() {
  const files = await readdir(SAVE_PATH);

  await new Promise((resolve, reject) =>
    files.forEach(async (file) => {
      const filePath = path.join(SAVE_PATH, file);
      const fileStream = createReadStream(filePath);
      const meetingId = file.split("_")[2];

      const baseURL = `https://storage.bunnycdn.com`;

      const client = axios.create({
        baseURL: `${baseURL}/videoc/`,
        headers: {
          AccessKey: bunnyApiKey,
        },
        maxContentLength: Infinity,
      });

      try {
        const response = await client({
          method: "PUT",
          url: file,
          data: fileStream,
        });

        if (response.status == 200) {
          const url = `${CDN_BASE_URL}/${file}`;

          const recording = await prisma.recording.create({
            data: {
              url,
              meetingId,
            },
          });
          console.log("Recording saved to DB:", recording.id);
        }
      } catch (error) {
        console.error("Error uploading to CDN", error);
      }
      resolve(true);
    })
  );

  console.log("clearing data directory");

  // Clear the SAVE_PATH directory after uploading
  for (const file of files) {
    const filePath = path.join(SAVE_PATH, file);
    try {
      await unlink(filePath);
    } catch (error) {
      console.error("Error deleting file: ", filePath);
    }
  }

  console.log("Uploaded....");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

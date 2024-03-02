import { StreamClient } from "@stream-io/node-sdk";
import { PrismaClient } from "@prisma/client";

const streamApiKey = process.env.STREAM_API_KEY;
const streamSecret = process.env.STREAM_API_SECRET;

const client = new StreamClient(streamApiKey, streamSecret);

const prisma = new PrismaClient();

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
      if (meeting.recordings.length > 0)
        return console.log("Skip meeting: saved recording found");

      const callType = "default";
      const call = client.video.call(callType, meeting.id);

      const result = await call.listRecordings();
      if (result.recordings.length === 0)
        return console.log("No recordings found for meeting", meeting.id);

      if (result.recordings.length > 0) {
        const recording = result.recordings[0];

        try {
          // await download(recording.url, recording.filename);
          await uploadRecording(recording.url, recording.filename, meeting.id);
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

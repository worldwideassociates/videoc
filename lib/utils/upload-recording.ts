
import axios from "axios";
import prismadb from "../prismadb";


const CDN_BASE_URL = "https://videoconf.b-cdn.net";

const streamApiKey = process.env.STREAM_API_KEY;
const bunnyApiKey = process.env.BUNNY_API_KEY;

// Function to download file from a public URL using Axios
async function downloadFileFromUrl(url: string) {
  console.log("Downloading file from URL:", url);

  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        api_key: streamApiKey,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error downloading file from URL:", err);
    throw err;
  }
}


export async function uploadRecording(url: string, filename: string, meetingId: string) {
  const fileData = await downloadFileFromUrl(url);

  const baseURL = `https://storage.bunnycdn.com`;
  const client = axios.create({
    baseURL: `${baseURL}/videoc/`,
    headers: {
      AccessKey: bunnyApiKey,
    },
    maxContentLength: Infinity,
  });

  try {
    const uploadResponse = await client({
      method: "PUT",
      url: filename,
      data: fileData,
    });

    console.log("Uploaded to CDN:", uploadResponse.status);

    if (uploadResponse.status == 201) {
      const url = `${CDN_BASE_URL}/${filename}`;
      const recording = await prismadb.recording.create({
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
}
import { StreamClient } from "@stream-io/node-sdk";
import { PrismaClient } from "@prisma/client";

const streamApiKey = process.env.STREAM_API_KEY;
const streamSecret = process.env.STREAM_API_SECRET;

const client = new StreamClient(streamApiKey, streamSecret);

const prisma = new PrismaClient();

async function main() {
  // 1. create a new storage with all the required parameters
  const result = await client.video.createExternalStorage({
    bucket: "videoc12345",
    name: "my-s3-another",
    storage_type: "s3",
    path: "/",
    aws_s3: {
      s3_region: "eu-north-1",
      s3_api_key: "AKIA5FTZE2QSSFGHYGB7",
      s3_secret: "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",
    },
  });

  console.log(result);

  // 2. update the call type to use the new storage
  // await videoClient.updateCallType("default", {
  //   external_storage: "my-s3",
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {});

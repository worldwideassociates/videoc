import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "../auth/[...nextauth]/auth";
import { Role } from "@prisma/client";
import { importer } from "@/lib/importer";


const f = createUploadthing();

const middleware = async ({ req }: any) => {
  const session = await auth();
  if (!session?.user) throw new UploadThingError("Unauthorized");

  return { userId: session.user.id };
}

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {
      //TODO: Save image url to DB
      return { uploadedBy: metadata.userId };
    }),
  customerImporter: f({ 'application/vnd.ms-excel': { maxFileSize: "128MB" }, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { maxFileSize: '128MB' } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => {

      importer({ url: file.url, type: Role.CUSTOMER })

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

import { uploadRecording } from "@/lib/utils/upload-recording";
import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const event = await req.json();

  console.log("Received event", event.type);
  if (event.type === "call.recording_ready") {
    console.log("Recording is ready", event);
    const { filename, url } = event.call_recording;
    const meetingId = filename.split("_")[2];

    uploadRecording(url, filename, meetingId);
  }
  //
  // const meetingId = event.call_cid.split(":")[1];
  //
  // if (event.type == "call.session_participant_left") {
  //   await prismadb.user.update({
  //     where: { id: event.participant.user.id },
  //     data: { activeMeetingId: null },
  //   });
  // }
  //
  // if (event.type == "call.session_participant_joined") {
  //   await prismadb.user.update({
  //     where: { id: event.participant.user.id },
  //     data: { activeMeetingId: meetingId },
  //   });
  // }
  //
  return Response.json({ status: "ok" });
}

import { uploadRecording } from '@/lib/utils/upload-recording';
import type { NextApiRequest, NextApiResponse } from 'next'

export async function POST(req: Request) {

  const event = await req.json();

  console.log('Received event', event.type);
  if (event.type === 'call.recording_ready') {
    console.log('Recording is ready', event);
    const { filename, url } = event.call_recording
    const meetingId = filename.split('_')[2];

    uploadRecording(url, filename, meetingId);
  }

  return Response.json({ status: 'ok' });
}
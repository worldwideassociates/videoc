'use server'

import prismadb from "@/lib/prismadb";
import { Meeting } from "@prisma/client";
import streamClient from "@/lib/stream-server-client";
import { sendInvites } from "@/lib/send-invites";
import { auth } from "@/app/api/auth/[...nextauth]/auth";




export const create = async (values: Meeting & { participants: { id: string }[] }) => {

  const session = await auth();
  const hostId = session?.user?.id!

  try {
    const meeting = await prismadb.meeting.create({
      data: {
        title: values.title,
        description: values.description,
        estimatedDuration: values.estimatedDuration,
        startDateTime: values.startDateTime,
        hostId,
      }
    })

    // Create stream call
    const callType = 'default';
    const call = await streamClient.video.call(callType, meeting.id);


    // expiring in 48 hours
    const stream_token_exp = Math.round(new Date().getTime() / 1000) + 60 * 60 * 48;

    await call.create({
      data: {
        created_by_id: hostId,
        members: [
          { user_id: hostId, role: 'admin' },
        ].concat(values.participants.map((participant: any) => ({ user_id: participant.id, role: 'user' }))),
      }
    })

    // host token
    const token = await streamClient.createToken(hostId, stream_token_exp)

    const participantMeetings = await Promise.all(values.participants.map(async (participant) => {
      const token = await streamClient.createToken(participant.id, stream_token_exp)
      return {
        userId: participant.id,
        meetingId: meeting.id,
        token,
      }
    }))

    await prismadb.invite.createMany({
      data: participantMeetings
    })

    // send meeting link to participants
    sendInvites([{ userId: hostId, token, meetingId: meeting.id }, ...participantMeetings])

    return { success: true, message: "Meeting scheduled successfully." };
  } catch (error: any) {
    console.log(error);


    return { success: false, message: 'Something went wrong.' };
  }
}

export const update = async (id: string, values: Meeting & { participants: { id: string }[] }) => {
  try {
    await prismadb.meeting.update({
      where: { id },
      data: {
        ...values,
      }
    })

    return { success: true, message: "Meeting created successfully." };
  } catch (error: any) {
    console.log(error);

    if (error.code === 'P2002') {
      return { success: false, message: 'Meeting with that name already exists.' };
    }
    return { success: false, message: 'Something went wrong.' };
  }
}

// TODO: usr string ID for all entities
export const deleteMeeting = async (id: string) => {
  try {
    await prismadb.department.delete({
      where: { id }
    })

    return { success: true, message: "Meeting deleted successfully." };
  } catch (error: any) {
    return { success: false, message: 'Something went wrong.' };
  }
}
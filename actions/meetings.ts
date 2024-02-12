'use server'

import prismadb from "@/lib/prismadb";
import { MEETING_STATUS, Meeting } from "@prisma/client";
import streamClient from "@/lib/stream-server-client";
import { sendInvites } from "@/lib/send-invites";
import { auth } from "@/app/api/auth/[...nextauth]/auth";






export const cancelMeeting = async (id: string) => {
  try {
    await prismadb.meeting.update({
      where: { id },
      data: {
        status: MEETING_STATUS.CANCELED
      }
    })

    return { success: true, message: "Meeting canceled successfully." };
  } catch (error: any) {
    return { success: false, message: 'Something went wrong.' };
  }
}


export const upsert = async (values: Meeting & { participants: { id: string }[] }, meetingId?: string) => {
  if (meetingId) {
    return await update(meetingId, values);
  } else {
    return await create(values);
  }
}


/** Private methods */


const update = async (id: string, values: Meeting & { participants: { id: string }[] }) => {
  const oldMeeting = await prismadb.meeting.findFirst({
    where: {
      id
    }
  })
  try {
    const meeting = await prismadb.meeting.update({
      where: { id },
      data: {
        title: values.title,
        description: values.description,
        estimatedDuration: values.estimatedDuration,
        startDateTime: values.startDateTime,
        status: values.startDateTime > oldMeeting?.startDateTime! ?
          MEETING_STATUS.RESCHEDULED
          : oldMeeting?.status,
      },
    })


    const invites = await prismadb.invite.findMany({
      where: {
        meetingId: id
      }
    })

    //filter participants that are only in the new list
    const userIds = invites.map((invite: any) => invite.userId)
    const newParticipants = values.participants.filter((p: any) => !userIds.includes(p.id))

    // Create stream call
    const callType = 'default';
    const call = await streamClient.video.call(callType, meeting.id);



    if (newParticipants.length > 0) {
      // participants tokens
      const participantMeetings = await createUserTokens(meeting.id, newParticipants)

      await prismadb.invite.createMany({
        data: participantMeetings
      })

      // send meeting link to participants
      const message = `You have been invited to the meeting "${meeting.title}" on ${values.startDateTime.toLocaleString()}.`
      sendInvites(participantMeetings, message)

      // Add new users to stream call
      await call.updateCallMembers({
        update_members: newParticipants.map((participant: any) => ({ user_id: participant.id, role: 'user' }))
      })
    }

    // if incoming invites are missing saved invites, delete them from db and stream call
    const missingParticipants = invites.filter((i: any) => !values.participants.map((p: any) => p.id).includes(i.userId))
    if (missingParticipants.length > 0) {
      await prismadb.invite.deleteMany({
        where: {
          userId: {
            in: missingParticipants.map((p: any) => p.userId)
          }
        }
      })


      await call.updateCallMembers({
        remove_members: missingParticipants.map((p: any) => p.userId)
      })
    }

    // if the meeting start date time is changed, sent to old participants
    if (values.startDateTime.toISOString() !== meeting.startDateTime.toISOString()) {

      const userIds = values.participants.map((p: any) => p.id)
      const oldParticipants = invites.filter((i: any) => userIds.includes(i.userId))

      const message = `The meeting "${meeting.title}" has been rescheduled to ${values.startDateTime.toLocaleString()}.`

      sendInvites(oldParticipants, message)
    }

    return { success: true, message: "Meeting updated successfully." };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: 'Something went wrong.' };
  }
}


const create = async (values: Meeting & { participants: { id: string }[] }) => {

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

    await call.create({
      data: {
        created_by_id: hostId,
        members: [
          { user_id: hostId, role: 'admin' },
        ].concat(values.participants.map((participant: any) => ({ user_id: participant.id, role: 'user' }))),
      }
    })

    // host token
    const stream_token_exp = Math.round(new Date().getTime() / 1000) + 60 * 60 * 48;
    const token = await streamClient.createToken(hostId, stream_token_exp)

    // participants tokens
    const participantMeetings = await createUserTokens(meeting.id, values.participants)

    await prismadb.invite.createMany({
      data: participantMeetings
    })

    // send meeting link to participants
    const message = `You have been invited to the meeting "${meeting.title}" on ${values.startDateTime.toLocaleTimeString()}.`
    sendInvites([{ userId: hostId, token, meetingId: meeting.id }, ...participantMeetings], message)

    return { success: true, message: "Meeting scheduled successfully." };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: 'Something went wrong.' };
  }
}


const createUserTokens = async (meetingId: string, participants: { id: string }[]) => {
  const stream_token_exp = Math.round(new Date().getTime() / 1000) + 60 * 60 * 48;

  return await Promise.all(participants.map(async (participant) => {
    const token = await streamClient.createToken(participant.id, stream_token_exp)
    return {
      userId: participant.id,
      meetingId,
      token,
    }
  }))
}


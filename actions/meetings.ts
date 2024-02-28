'use server'

import prismadb from "@/lib/prismadb";
import { MEETING_STATUS, Meeting, User } from "@prisma/client";
import streamClient from "@/lib/stream-server-client";
import { sendInvites } from "@/lib/send-invites";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";






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


export const upsert = async (values: Meeting & { participants: User[] }, meetingId?: string) => {
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
      },
      include: {
        user: true,
        meeting: true
      }
    })

    //filter participants that are only in the new list
    const userIds = invites.map((invite: any) => invite.userId)
    const newParticipants = values.participants.filter((p: any) => !userIds.includes(p.id)) as User[]

    // Create stream call
    const callType = 'default';
    const call = await streamClient.video.call(callType, meeting.id);



    if (newParticipants.length > 0) {
      // participants tokens
      const participantMeetings = await createUserTokens(meeting, newParticipants)

      await prismadb.invite.createMany({
        data: participantMeetings.map((p: any) => ({ userId: p.participant.id, meetingId: p.meeting.id, token: p.token }))
      })

      // send meeting link to participants

      const locale = (process.env.DEFAULT_LOCALE ?? 'en') as Locale
      const { email: t } = await getDictionary(locale) as any
      const message = `${t.inviteMessage} "${meeting.title}": ${values.startDateTime.toLocaleString()}.`
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
      const oldParticipants = invites.filter((i: any) => userIds.includes(i.userId)).map((i: any) => ({ participant: i.user, meeting, token: i.token }))


      const locale = (process.env.DEFAULT_LOCALE ?? 'en') as Locale
      const { email: t } = await getDictionary(locale) as any
      const message = `"${meeting.title}":  ${t.rescheduledMessage.body} ${values.startDateTime.toLocaleString()}.`

      sendInvites(oldParticipants, message)
    }

    return { success: true, message: "Meeting updated successfully." };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: 'Something went wrong.' };
  }
}


const create = async (values: Meeting & { participants: User[] }) => {

  const session = await auth();
  const hostId = session?.user?.id!
  const host = await prismadb.user.findFirst({
    where: {
      id: hostId
    }
  })

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
    const hostMeeting = await createUserTokens(meeting, [host as User])
    const participantMeetings = await createUserTokens(meeting, values.participants)
    const userToInvite = [...hostMeeting, ...participantMeetings]

    await prismadb.invite.createMany({
      data: userToInvite.map((p: any) => ({ userId: p.participant.id, meetingId: p.meeting.id, token: p.token }))
    })

    // send meeting link to participants
    const locale = (process.env.DEFAULT_LOCALE ?? 'en') as Locale
    const { email: t } = await getDictionary(locale) as any
    const message = `${t.inviteMessage.body} "${meeting.title}": ${values.startDateTime.toLocaleTimeString()}.`
    sendInvites(participantMeetings, message)

    return { success: true, message: "Meeting scheduled successfully." };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: 'Something went wrong.' };
  }
}


const createUserTokens = async (meeting: Meeting, participants: User[]) => {
  const stream_token_exp = Math.round(new Date().getTime() / 1000) + 60 * 60 * 48;

  participants = await prismadb.user.findMany({
    where: {
      id: {
        in: participants.map(participant => participant.id)
      }
    }
  });

  return await Promise.all(participants.map(async (participant) => {

    const token = await streamClient.createToken(participant.id, stream_token_exp)
    return {
      participant,
      meeting,
      token,
    }
  }))
}


import { auth } from '@/app/[lang]/api/auth/[...nextauth]/auth';
import VideoConference from '@/components/video-conference/video-conference';
import prismadb from '@/lib/prismadb';
import { User } from '@prisma/client';
import React, { FC } from 'react'

interface pageProps {
  params: { meetingId: string }
}

const page: FC<pageProps> = async ({ params }: pageProps) => {

  const session = await auth();


  if (!session) {
    return null;
  }

  const meeting = await prismadb.meeting.findFirst({
    where: {
      id: params.meetingId
    }
  })

  return (
    <div>
      <VideoConference
        callId={params.meetingId}
        user={session.user as User}
        meeting={meeting!} />
    </div>
  )
}

export default page;
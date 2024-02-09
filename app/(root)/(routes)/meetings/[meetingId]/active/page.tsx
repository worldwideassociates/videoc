import { auth } from '@/app/api/auth/[...nextauth]/auth';
import VideoConference from '@/components/video-conference/video-conference';
import React, { FC } from 'react'

interface pageProps {
  params: { meetingId: string }
}

const page: FC<pageProps> = async ({ params }: pageProps) => {

  const session = await auth();

  if (!session) {
    return null;
  }

  return (
    <div>
      <VideoConference callId={params.meetingId} user={session.user} />
    </div>
  )
}

export default page;
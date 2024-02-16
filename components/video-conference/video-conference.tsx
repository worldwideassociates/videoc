'use client'

import { useState } from "react"
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk"
import { useRouter, useSearchParams } from "next/navigation"
import { Meeting, User } from "@prisma/client";


import '@stream-io/video-react-sdk/dist/css/styles.css';
import './style.css';
import { UserObjectRequest } from "@stream-io/node-sdk";
import { Button } from "../ui/button";

interface Props {
  user: User,
  callId: string,
  meeting: Meeting
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!

const CallUiLayout = () => {


  return (
    <StreamTheme className="light">
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls onLeave={() => window.location.reload()} />
    </StreamTheme>
  );
}


export default function VideoConference({ user, callId, meeting }: Props) {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')!
  const [joined, setJoined] = useState(false)
  const [joining, setJoining] = useState(false)


  const [client] = useState<StreamVideoClient>(() => {
    const streamUser: UserObjectRequest = {
      id: user.id,
      name: user.name,
      image: user.image,
    };

    return new StreamVideoClient({
      apiKey,
      user: streamUser,
      token,
      options: { logLevel: "warn" },
    });
  });

  const [call] = useState(() => client.call('default', callId));


  const joinCall = async () => {
    try {
      setJoining(true);
      await call.join({ create: true });
      setJoined(true);
    } catch (error: any) {
      console.log('error', error);
    } finally {
      setJoining(false);
    }
  }


  if (joined) {

    return (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <CallUiLayout />
        </StreamCall>
      </StreamVideo>
    );
  } else {
    return (
      <div className="flex justify-center items-center min-h-[650px]">
        <div className="flex flex-col space-y-8">

          <div className="">
            <h2 className="text-2xl font-bold tracking-tight text-center">{meeting.title}</h2>
            <p className="text-muted-foreground tesxt-center">{meeting.description}</p>
          </div>
          <Button disabled={joining} variant='outline' size='lg' onClick={joinCall}>
            {joining ? 'Joining...' : 'Join call'}
          </Button>
        </div>
      </div>
    )
  }
}
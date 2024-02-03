
import { useCallback, useEffect, useState } from "react"
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User as StreamUser,
  useCallStateHooks,
  Call
} from "@stream-io/video-react-sdk"



type User = {
  id: string
  firstName: string
  lastName: string
  profileImageUrl?: string
  role: string
}

interface Props {
  user: User,
  callId: string
}

import '@stream-io/video-react-sdk/dist/css/styles.css';
import './style.css';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const token = process.env.NEXT_PUBLIC_STREAM_API_TOKEN


const CallUiLayout = () => {
  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls />
    </StreamTheme>
  );
}


export default function VideoConference({ user, callId }: Props) {
  // const [client] = useState<StreamVideoClient>(() => {
  //   const streamUser: StreamUser = {
  //     id: user.id,
  //     name: `${user.firstName} ${user.lastName}`,
  //     image: user.profileImageUrl,
  //   }
  //   return new StreamVideoClient({
  //     apiKey,
  //     token,
  //     user: streamUser,
  //     options: { logLevel: 'warn' }
  //   })
  // })

  const [client] = useState<StreamVideoClient>(() => {
    const user = {
      id: "sweet-block-8",
      name: "sweet",
      image:
        "https://getstream.io/random_svg/?id=sweet-block-8&name=sweet",
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2FkZV9Ta3l3YWxrZXIiLCJpc3MiOiJwcm9udG8iLCJzdWIiOiJ1c2VyL0NhZGVfU2t5d2Fsa2VyIiwiaWF0IjoxNjg5MjY2MjQxLCJleHAiOjE2ODk4NzEwNDZ9.xMZKhSOeYybtXlpalHdrwiJCEd2wxhY6UtHU4PfJxmk";
    return new StreamVideoClient({
      apiKey: "mmhfdzb5evj2",
      user,
      token,
      options: { logLevel: "warn" },
    });
  });
  const [call] = useState(() => client.call('default', 'ntQ1WKmHaf'));

  // const [call] = useState(() => client.call('default', callId))


  useEffect(() => {
    call.join({ create: true }).catch(err => {
      console.error('Failed to join the call', err);
    });
  }, [call]);


  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUiLayout />
      </StreamCall>
    </StreamVideo>
  );
}
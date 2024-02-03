
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
import { Button } from "../ui/button"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const token = process.env.NEXT_PUBLIC_STREAM_API_TOKEN


const CallUiLayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls />
    </StreamTheme>
  );
}


export default function VideoConference({ user, callId }: Props) {
  const [client, setClient] = useState<StreamVideoClient>()
  const [activeCall, setActiveCall] = useState<Call>();
  const [isCallActive, setIsCallActive] = useState<boolean>();
  const callType = 'default';

  useEffect(() => {
    if (!client) return;
    const call = client.call(callType, callId);
    setActiveCall(call);
    call
      .getOrCreate()
      .catch((err) => console.error(`Failed to get or create call`, err));

    return () => {
      call.leave();
      setActiveCall(undefined);
    };
  }, [callId, callType, client]);

  // TODO: optimize this, maybe useMemo
  const streamUser: StreamUser = {
    id: user.id,
    name: user.firstName + ' ' + user.lastName,
    image: user.profileImageUrl
  }

  useEffect(() => {
    const client = new StreamVideoClient({ apiKey, token, user: streamUser })
    setClient(client)
    return () => {
      if (client) {
        client?.disconnectUser();
        setClient(undefined);
      }
    }
  }, [])


  const joinMeeting = useCallback(async () => {
    try {
      await activeCall?.join({ create: true });
      setIsCallActive(true);
    } catch (e) {
      console.error(e);
    }
  }, [activeCall]);

  if (!client || !activeCall) {
    return null;
  }



  if (!isCallActive) {
    return <Button onClick={joinMeeting}>Join</Button>
  }


  return (
    <StreamVideo client={client} >
      <StreamCall call={activeCall} >
        <CallUiLayout />
      </StreamCall>
    </StreamVideo>
  )
}
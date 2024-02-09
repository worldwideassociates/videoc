'use client'

import { CallingState, StreamCall, StreamVideo, StreamVideoClient, useCall, useCallStateHooks, User } from '@stream-io/video-react-sdk';

const apiKey = process.env.STREAM_API_KEY
const token = process.env.STREAM_API_TOKEN; // the token can be found in the "Credentials" section
const userId = process.env.STREAM_USER_ID; // the user id can be found in the "Credentials" section
const callId = process.env.STREAM_CALL_ID; // the call id can be found in the "Credentials" section


console.log('-------------------------', apiKey, token, userId, callId);


// set up the user object
const user: User = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const call = useCall();

  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Call &quot;{call?.id}&quot; has {participantCount} participants
    </div>
  );
};

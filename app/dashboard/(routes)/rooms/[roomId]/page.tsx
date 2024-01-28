'use client'

import { CallingState, StreamCall, StreamVideo, StreamVideoClient, useCall, useCallStateHooks, User } from '@stream-io/video-react-sdk';

const apiKey = "mmhfdzb5evj2" //process.env.STREAM_API_KEY
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiRGVuZ2FyIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9EZW5nYXIiLCJpYXQiOjE3MDY0MzkxNTcsImV4cCI6MTcwNzA0Mzk2Mn0.0kMODnY-6tibStXNArt1puInjNs97pzuYi7FFlPjAh4" // process.env.STREAM_API_TOKEN; // the token can be found in the "Credentials" section
const userId = "Dengar" //process.env.STREAM_USER_ID; // the user id can be found in the "Credentials" section
const callId = "3nkF5OkIsj5X" //process.env.STREAM_CALL_ID; // the call id can be found in the "Credentials" section



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

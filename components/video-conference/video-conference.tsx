"use client";

import { useState } from "react";
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Invite, Meeting, User } from "@prisma/client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./style.css";
import { UserObjectRequest } from "@stream-io/node-sdk";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  invite: Invite & { user: User } & { meeting: Meeting };
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

const CallUiLayout = () => {
  return (
    <StreamTheme className="light">
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls onLeave={() => window.location.reload()} />
    </StreamTheme>
  );
};

export default function VideoConference({ invite }: Props) {
  const { meeting, user, token } = invite;
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

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

  const [call] = useState(() => client.call("default", meeting.id));

  const joinCall = async () => {
    try {
      setJoining(true);
      await call.join({ create: true });

      setJoined(true);
    } catch (error: any) {
    } finally {
      setJoining(false);
    }
  };

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
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col space-y-8">
          <div className="flex space-x-4 items-center">
            <Button disabled={joining} size="lg" onClick={joinCall}>
              {joining ? "Joining..." : "Join call"}
            </Button>
            <Link className="underline" href={`/en/dashboard`}>
              Return home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

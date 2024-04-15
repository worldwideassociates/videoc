"use client";

import { fetchInvite } from "@/actions/meetings";
import VideoConference from "@/components/video-conference/video-conference";
import { Invite, Meeting, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface pageProps { }

const page: FC<pageProps> = () => {
  const [invite, setInvite] = useState<
    (Invite & { user: User; meeting: Meeting }) | null
  >(null);
  const params = useParams<{ meetingId: string }>();

  const { data: session } = useSession();

  const getInvite = async () => {
    const invite = await fetchInvite(params.meetingId);
    setInvite(invite);
  };

  useEffect(() => {
    getInvite();
  }, []);

  if (!session) {
    return null;
  }

  if (invite) {
    return (
      <div>
        <VideoConference invite={invite} />
      </div>
    );
  }
};

export default page;

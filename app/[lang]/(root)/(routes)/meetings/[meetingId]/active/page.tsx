import { auth } from "@/app/api/auth/[...nextauth]/auth";
import VideoConference from "@/components/video-conference/video-conference";
import prismadb from "@/lib/prismadb";
import { User } from "@prisma/client";
import React, { FC } from "react";

interface pageProps {
  params: { meetingId: string };
}

const page: FC<pageProps> = async ({ params }: pageProps) => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const invite = await prismadb.invite.findFirst({
    where: {
      meetingId: params.meetingId,
      userId: session.user?.id!,
    },
    include: {
      meeting: true,
      user: true,
    },
  });

  return (
    <div>
      <VideoConference invite={invite!} />
    </div>
  );
};

export default page;

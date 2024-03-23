import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import prismadb from "@/lib/prismadb";
import React, { FC } from "react";
import { HistoryClient } from "./_components/client";

interface pageProps {
  params: { lang: Locale };
}

const page: FC<pageProps> = async ({ params }) => {
  const { meetings: meetingsT, dashboard: dashT } = (await getDictionary(
    params.lang
  )) as any;

  const session = await auth();

  const t = meetingsT.history;

  const meetings = await prismadb.meeting.findMany({
    where: {
      startDateTime: {
        lte: new Date(),
      },
    },
    orderBy: {
      startDateTime: "desc",
    },
    include: {
      invites: {
        include: {
          user: true,
        },
      },
      recordings: true,
    },
  });

  const myPastMeetings = meetings.filter((meeting) => {
    const isInvited = meeting.invites.find(
      (invite) => invite.userId === session?.user?.id
    )!!;
    const isHost = meeting.hostId === session?.user?.id;

    return isInvited || isHost;
  });

  return (
    <div className="pace-y-6 p-10 py-5">
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0  h-[1px] w-full my-6"
      >
        <HistoryClient
          meetings={myPastMeetings}
          meetingT={t}
          t={dashT}
          locale={params.lang}
        />
      </div>
    </div>
  );
};

export default page;

import { Locale } from "@/i18n.config";
import { UpcomingClient } from "./_components/client";
import { getDictionary } from "@/lib/dictionary";
import prismadb from "@/lib/prismadb";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

interface PageProps {
  params: {
    lang: Locale;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const session = await auth();

  const { dashboard: t } = (await getDictionary(params.lang)) as any;

  const meetings = await prismadb.meeting.findMany({
    where: {
      startDateTime: {
        gte: new Date(),
      },
    },
    orderBy: {
      startDateTime: "asc",
    },
    include: {
      invites: {
        include: {
          user: true,
        },
      },
    },
  });

  const effectiveMeetings = meetings.filter((meeting) => {
    const startDateTime = new Date(meeting.startDateTime);
    const now = new Date();
    const diff = startDateTime.getTime() - now.getTime();
    const isToday = diff < 1000 * 60 * 60 * 24;

    const isInvited = meeting.invites.find(
      (invite) => invite.userId === session?.user?.id
    )!!;

    return isInvited || isToday;
  });

  return <UpcomingClient t={t} meetings={effectiveMeetings} />;
};

export default Page;

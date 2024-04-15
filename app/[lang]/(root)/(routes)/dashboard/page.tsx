import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { DashClient } from "./_components/client";
import prismadb from "@/lib/prismadb";

interface PageProps {
  params: {
    lang: Locale;
  };
}

const Home: React.FC<PageProps> = async ({ params }) => {
  const { meetings: t } = (await getDictionary(params.lang)) as any;

  const now = new Date();
  const upcomingMeeting = await prismadb.meeting.findFirst({
    where: {
      startDateTime: {
        gt: now,
      },
    },
    orderBy: {
      startDateTime: "asc",
    },
  });

  return (
    <DashClient locale={params.lang} upcomingMeeting={upcomingMeeting!} t={t} />
  );
};

export default Home;

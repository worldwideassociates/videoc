import { getDictionary } from "@/lib/dictionary";
import { RecordingClient } from "./_components/client";
import { Locale } from "@/i18n.config";
import prismadb from "@/lib/prismadb";

interface PageProps {
  params: {
    lang: Locale;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const recordings = await prismadb.recording.findMany({
    include: {
      meeting: {
        include: {
          invites: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const { meetings: meetingsT, dashboard: dashT } = (await getDictionary(
    params.lang
  )) as any;

  return (
    <RecordingClient
      locale={params.lang}
      t={meetingsT}
      dashT={dashT}
      recordings={recordings}
    />
  );
};

export default Page;

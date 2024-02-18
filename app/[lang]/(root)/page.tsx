import { StatsCard } from "@/components/stats-card";
import { CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import prismadb from "@/lib/prismadb";
import { DashboardClient } from "./_components/client";
import { auth } from "../../api/auth/[...nextauth]/auth";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";



interface Props {
  params: { lang: Locale }
}

export default async function DashboardPage({ params }: Props) {

  const { dashboard } = await getDictionary(params.lang) as any;

  const session = await auth()

  const meetings = await prismadb.meeting.findMany({
    where: {
      startDateTime: {
        gte: new Date()
      }
    },
    orderBy: {
      startDateTime: 'asc'
    },
    include: {
      invites: {
        include: {
          user: true
        }
      }
    }
  })

  const todaysMeetings = meetings.filter((meeting) => {
    const startDateTime = new Date(meeting.startDateTime)
    const now = new Date()
    const diff = startDateTime.getTime() - now.getTime()
    const isToday = diff < 1000 * 60 * 60 * 24

    const isInvited = meeting.invites.find((invite) => invite.userId === session?.user?.id)!!

    return isInvited || isToday
  })

  const scheduledMeetings = meetings.filter((meeting) => {
    const startDateTime = new Date(meeting.startDateTime)
    const now = new Date()
    const diff = startDateTime.getTime() - now.getTime()

    const notToday = diff > 1000 * 60 * 60 * 24
    const isInvited = meeting.invites.find((invite) => invite.userId === session?.user?.id)!!
    const isHost = meeting.hostId === session?.user?.id

    return notToday && (isInvited || isHost)
  }).slice(0, 10)




  return (
    <div className="flex flex-col space-y-2">
      <div className="">
        <CardHeader className="px-0">
          <div className="flex space-x-2">
            <div className="">
              <h2 className="text-2xl font-bold tracking-tight">{dashboard.title}</h2>
              <p className="text-muted-foreground">
                {dashboard.subTitle}
              </p>
            </div>
          </div>
        </CardHeader>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 px-0 py-4">
            <StatsCard title="Total Meetings" description="1,234" footerText="+20% since yesterday" />
            <StatsCard title="Total Colaborators" description="1,234" footerText="+20% since yesterday" />
            <StatsCard title="Total Participants" description="135" footerText="+20% since yesterday" />
            <StatsCard title="Total Customers" description="1430" footerText="+20% since yesterday" />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <DashboardClient todaysMeetings={todaysMeetings} scheduledMeetings={scheduledMeetings} t={dashboard} locale={params.lang} />
    </div>
  )
}


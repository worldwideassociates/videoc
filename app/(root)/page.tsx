import { ActiveMeetingCard } from "@/components/active-meeting-card";
import { StatsCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UpcomingMeetingCard } from "@/components/upcoming-meeting-card";
import prismadb from "@/lib/prismadb";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {

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

  const upcomingMeetings = meetings.filter((meeting) => {
    const startDateTime = new Date(meeting.startDateTime)
    const now = new Date()
    const diff = startDateTime.getTime() - now.getTime()
    return diff < 1000 * 60 * 60 * 24
  })

  const scheduledMeetings = meetings.filter((meeting) => {
    const startDateTime = new Date(meeting.startDateTime)
    const now = new Date()
    const diff = startDateTime.getTime() - now.getTime()
    return diff > 1000 * 60 * 60 * 24
  }).slice(0, 10)


  return (
    <div className="flex flex-col space-y-2">
      <div className="">
        <CardHeader className="px-0">
          <div className="flex space-x-2">
            <div className="">
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Welcome to your dashboard.
              </p>
            </div>
          </div>
        </CardHeader>
        <div className="flex space-x-2">
          <StatsCard title="Total Meetings" description="1,234" footerText="+20% since yesterday" />
          <StatsCard title="Total Colaborators" description="1,234" footerText="+20% since yesterday" />
          <StatsCard title="Total Participants" description="135" footerText="+20% since yesterday" />
          <StatsCard title="Total Customers" description="1430" footerText="+20% since yesterday" />
        </div>
      </div>
      <div className="">
        <CardHeader className="px-0">
          <div className="flex space-x-2 items-center">
            <div className="">
              <h2 className="text-xl font-bold tracking-tight">Upcoming meetings</h2>
              <p className="text-muted-foreground">
                Meetings scheduled for today.
              </p>
            </div>
            {/* <Button variant="outline" asChild className="rounded-full">
              <Link href='/rooms/new'>
                <Plus size={24} />
              </Link>
            </Button> */}
          </div>
        </CardHeader>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 px-0 py-4">
            {
              upcomingMeetings.map((meeting) => (
                <ActiveMeetingCard key={meeting.id} meeting={meeting} />
              ))
            }
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="">
        <CardHeader className="px-0">
          <div className="flex space-x-2 items-center">
            <div className="">
              <h2 className="text-xl font-bold tracking-tight">Scheduled Meetings</h2>
              <p className="text-muted-foreground">
                All meetings scheduled for the next 7 days.
              </p>
            </div>
            <Button variant="outline" asChild className="rounded-full">
              <Link href='/meetings/schedule'>
                <Plus size={24} />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <div className="flex flex-col  space-y-2">
          {
            scheduledMeetings.map((meeting) => (
              <UpcomingMeetingCard key={meeting.id} meeting={meeting} />
            ))
          }
        </div>
      </div>
    </div>
  )
}


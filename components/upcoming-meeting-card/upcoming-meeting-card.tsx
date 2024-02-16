import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Edit2, X } from "lucide-react";
import { UserCard } from "@/components/user-card";
import { Button } from "@/components/ui/button";
import { Invite, MEETING_STATUS, Meeting, User } from "@prisma/client";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";




interface Props {
  meeting: Meeting & { invites: (Invite & { user: User })[] }
  handleCancelMeeting: (meeting: Meeting) => any
}


export default function UpcomingMeetingCard({ meeting, handleCancelMeeting }: Props) {
  return (
    <Card>
      <CardContent className="p-4">

        <div className="flex space-x-2">
          <div className="flex space-x-4 items-center">
            <Calendar size={24} className="text-gray-400" />
            <h1 className="font-bold text-lg text-gray-600">{meeting.title}</h1>
            <p className="text-gray-400 text-sm">{meeting.startDateTime.toLocaleString()}</p>
          </div>
          {
            meeting.status !== MEETING_STATUS.CANCELED && (
              <div className="">
                <Button asChild variant="ghost" size='icon' className="rounded-full">
                  <Link href={`/meetings/${meeting.id}/edit`}>
                    <Edit2 size={24} className="text-gray-400" />
                  </Link>
                </Button>
                <Button onClick={() => handleCancelMeeting(meeting)} variant="ghost" size='icon' className="rounded-full">
                  <X size={24} className="text-gray-400" />
                </Button>
              </div>
            )
          }
          <div className="">
            {
              meeting.status !== MEETING_STATUS.PLANNED && (
                <Badge variant="secondary" className={
                  cn("rounded-full mt-2",
                    meeting.status === MEETING_STATUS.RESCHEDULED
                      ? "bg-yellow-100 text-yellow-500"
                      : "bg-red-100 text-red-500")}>
                  {meeting.status}
                </Badge>
              )
            }
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap py-3">
          <div className="flex w-max space-x-4 p-4">
            {
              meeting.invites.map((invite, idx) => (
                <UserCard
                  user={invite.user}
                  key={`upcoming-participants-${idx}`}
                  isModerator={false}
                  isOnline={false} />
              ))
            }
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

      </CardContent>
    </Card>
  )
}
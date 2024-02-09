import { Card, CardContent } from "@/components/ui/card";
import { Calendar, PlusCircle } from "lucide-react";
import { UserCard } from "@/components/user-card";
import { Button } from "@/components/ui/button";
import { Invite, Meeting, User } from "@prisma/client";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";




interface Props {
  meeting: Meeting & { invites: (Invite & { user: User })[] }
}


export default function UpcomingMeetingCard({ meeting }: Props) {
  return (
    <Card>
      <CardContent className="p-4">

        <div className="flex justify-between">
          <div className="flex space-x-4 items-center">
            <Calendar size={24} className="text-gray-400" />
            <h1 className="font-bold text-lg text-gray-600">{meeting.title}</h1>
            <p className="text-gray-400 text-sm">{meeting.startDateTime.toISOString()}</p>
          </div>
          <div className="">
            <Button variant="link" className="rounded-full">
              <PlusCircle size={24} className="text-gray-400" />
            </Button>
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
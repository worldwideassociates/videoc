import { Card, CardContent } from "@/components/ui/card";
import { Calendar, PlusCircle, User } from "lucide-react";
import { UserCard } from "@/components/user-card";
import { Button } from "@/components/ui/button";



type MeetingType = {
  id: string,
  name: string,
  description: string,
  participants: any[] //TODO: change to user type
  startDate: string,
  moderator: any //TODO: change to user type

}

interface Props {
  meeting: MeetingType
}


export default function UpcomingMeetingCard({ meeting }: Props) {
  return (
    <Card>
      <CardContent className="p-4">

        <div className="flex justify-between">
          <div className="flex space-x-4 items-center">
            <Calendar size={24} className="text-gray-400" />
            <h1 className="font-bold text-lg text-gray-600">{meeting.name}</h1>
            <p className="text-gray-400 text-sm">{meeting.startDate}</p>
          </div>
          <div className="">
            <Button variant="link" className="rounded-full">
              <PlusCircle size={24} className="text-gray-400" />
            </Button>
          </div>
        </div>
        <div className="flex space-x-4 items-center my-4">
          {
            meeting.participants.map((participant, idx) => (
              <UserCard
                user={participant}
                key={`upcoming-participants-${idx}`}
                isModerator={false}
                isOnline={false} />
            ))
          }
        </div>

      </CardContent>
    </Card>
  )
}
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, VideoIcon } from "lucide-react";
import { UserCard } from "@/components/user-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Invite, Meeting, User } from "@prisma/client";


interface Props {
  meeting: Meeting & { invites: (Invite & { user: User })[] }
}




export default function ActiveMeetingCard({ meeting }: Props) {

  const onlineAttendees: any[] = [] //TODO: get online attendees
  const isModerator = (participant: any) => participant.id === meeting.hostId //TODO: make sure this check is correct
  const isOnline = (participant: any) => onlineAttendees.includes(participant.id) //TODO: make sure this check is correct

  return (
    <Card className="rounded-2xl max-w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle>{meeting.title}</CardTitle>
            <CardDescription className="mt-1">Started: {meeting.startDateTime.toISOString()}</CardDescription>
          </div>
          <div className="flex space-x-2 items-center">
            <VideoIcon size={32} className="text-green-500" />
            <h1 className="text-gray-400 text-lg">+{onlineAttendees.length}</h1>
          </div>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <div className="px-5">
        <div className="flex flex-col space-y-2">
          {meeting.invites.map((invite, idx) => (
            <UserCard
              user={invite.user}
              key={`participants-${idx}`}
              isModerator={isModerator(invite)}
              isOnline={isOnline(invite)} />
          )).slice(0, 4)}
        </div>
      </div>
      <CardFooter className="flex justify-end pb-2 pr-2">
        <Button variant="link">Join
          <ArrowRight size={18} className="ml-2 text-gray-400" />
        </Button>
      </CardFooter>
    </Card>
  )
}

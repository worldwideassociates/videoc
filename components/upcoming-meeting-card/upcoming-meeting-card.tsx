import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Calendar,
  Download,
  Edit2,
  Info,
  PlayIcon,
  Video,
  X,
} from "lucide-react";
import { UserCard } from "@/components/user-card";
import { Button } from "@/components/ui/button";
import {
  Invite,
  MEETING_STATUS,
  Meeting,
  Recording,
  User,
} from "@prisma/client";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/hooks/use-admin";

interface IMeeting extends Meeting {
  invites: (Invite & { user: User })[];
  recordings: Recording[];
}

interface Props {
  meeting: IMeeting;
  handleCancelMeeting: (meeting: Meeting) => any;
  handlePlayRecording: (meeting: IMeeting) => any;
}

export default function UpcomingMeetingCard({
  meeting,
  handleCancelMeeting,
  handlePlayRecording,
}: Props) {
  const isInthePast = () => new Date(meeting.startDateTime) < new Date();
  const { isEmployee } = useAdmin();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex space-x-2">
          <div className="flex space-x-4 items-center">
            <Calendar size={24} className="text-gray-400" />
            <h1 className="font-bold text-lg text-gray-600">{meeting.title}</h1>
            <p className="text-gray-400 text-sm">
              {meeting.startDateTime.toLocaleString()}
            </p>
          </div>
          {meeting.status !== MEETING_STATUS.CANCELED &&
          !isInthePast() &&
          isEmployee ? (
            <div className="">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Link href={`/meetings/${meeting.id}/edit`}>
                  <Edit2 size={24} className="text-gray-400" />
                </Link>
              </Button>
              <Button
                onClick={() => handleCancelMeeting(meeting)}
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <X size={24} className="text-gray-400" />
              </Button>
            </div>
          ) : null}
          <div className="">
            {meeting.status !== MEETING_STATUS.PLANNED && (
              <Badge
                variant="secondary"
                className={cn(
                  "rounded-full mt-2",
                  meeting.status === MEETING_STATUS.RESCHEDULED
                    ? "bg-yellow-100 text-yellow-500"
                    : "bg-red-100 text-red-500"
                )}
              >
                {meeting.status}
              </Badge>
            )}
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap py-3">
          <div className="flex w-max space-x-4 p-4">
            {meeting.invites.map((invite, idx) => (
              <UserCard
                user={invite.user}
                key={`upcoming-participants-${idx}`}
                isModerator={false}
                isOnline={false}
              />
            ))}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <CardFooter className="pb-0 flex justify-end">
          {isInthePast() && (
            <div>
              {meeting.recordings.length > 0 && (
                <Button
                  asChild
                  variant="link"
                  className=""
                  onClick={() => handlePlayRecording(meeting)}
                >
                  <div className="flex space-x-2">
                    <Video size={24} className="text-gray-600" />
                    <span className="text-gray-600">Recording</span>
                  </div>
                </Button>
              )}
            </div>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
}

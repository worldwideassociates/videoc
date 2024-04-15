"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, X } from "lucide-react";
import { UserCard } from "@/components/user-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Invite, MEETING_STATUS, Meeting, User } from "@prisma/client";
import { use } from "react";
import { LocaleContext } from "@/providers/locale-provider";
import Link from "next/link";
import { useAdmin } from "@/hooks/use-admin";
import { Badge } from "../ui/badge";
import { getFormatedDate, getFormatedTime } from "@/lib/utils";

interface Props {
  meeting: Meeting & { invites: (Invite & { user: User })[] };
  handleCancelMeeting: (meeting: Meeting) => any;
}

export default function MeetingCard({ meeting, handleCancelMeeting }: Props) {
  const { dictionary: t, locale } = use(LocaleContext);
  const { isEmployee } = useAdmin();

  const onlineAttendees: any[] = []; //TODO: get online attendees
  const isModerator = (invite: any) => invite.userId === meeting.hostId;
  const isOnline = (participant: any) =>
    onlineAttendees.includes(participant.id); //TODO: make sure this check is correct

  return (
    <Card className="rounded-2xl flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle>{meeting.title.slice(0, 18)}</CardTitle>
            <CardDescription className="mt-1">
              {`${getFormatedDate(
                meeting.startDateTime,
                locale
              )}: ${getFormatedTime(meeting.startDateTime, locale)}`}
            </CardDescription>
          </div>
          {isEmployee &&
          meeting.status !== MEETING_STATUS.CANCELED &&
          meeting.startDateTime > new Date() ? (
            <div className="flex space-x-2 items-center">
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
          {meeting.status == MEETING_STATUS.CANCELED ? (
            <div className="flex space-x-2 items-center">
              <Badge className="text-orange-500 border-orange-500 bg-white">
                CANCELED
              </Badge>
            </div>
          ) : null}
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="px-5 flex-grow">
        <div className="flex flex-col space-y-2">
          {meeting.invites
            .map((invite, idx) => (
              <UserCard
                user={invite.user}
                key={`participants-${idx}`}
                isModerator={isModerator(invite)}
                isOnline={isOnline(invite)}
              />
            ))
            .slice(0, 3)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pb-2 pr-2">
        {meeting.status !== MEETING_STATUS.CANCELED ? (
          <Button asChild variant="link">
            <Link href={`/${locale}/meetings/${meeting.id}/active`}>
              {t.upcomingMeetings.joinButton}
              <ArrowRight size={18} className="ml-2 text-gray-400" />
            </Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

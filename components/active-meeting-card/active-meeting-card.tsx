"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Edit2, X } from "lucide-react";
import { UserCard } from "@/components/user-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Invite, Meeting, User } from "@prisma/client";
import { use } from "react";
import { LocaleContext } from "@/providers/locale-provider";
import Link from "next/link";

interface Props {
  meeting: Meeting & { invites: (Invite & { user: User })[] };
  handleCancelMeeting: (meeting: Meeting) => any;
}

export default function ActiveMeetingCard({
  meeting,
  handleCancelMeeting,
}: Props) {
  const { dictionary: t, locale } = use(LocaleContext);

  const onlineAttendees: any[] = []; //TODO: get online attendees
  const isModerator = (invite: any) => invite.userId === meeting.hostId;
  const isOnline = (participant: any) =>
    onlineAttendees.includes(participant.id); //TODO: make sure this check is correct

  return (
    <Card className="rounded-2xl w-[350px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle>{meeting.title.slice(0, 18)}</CardTitle>
            <CardDescription className="mt-1">
              {meeting.startDateTime <= new Date()
                ? t.upcomingMeetings.startLabelPast
                : t.upcomingMeetings.startLabel}
              {meeting.startDateTime.toLocaleTimeString()}
            </CardDescription>
          </div>
          <div className="flex space-x-2 items-center">
            <Link href={`/meetings/${meeting.id}/edit`}>
              <Edit2 size={24} className="text-gray-400" />
            </Link>
            <Button
              onClick={() => handleCancelMeeting(meeting)}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <X size={24} className="text-gray-400" />
            </Button>
          </div>
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
        <Button asChild variant="link">
          <Link href={`/${locale}/meetings/${meeting.id}/active`}>
            {t.upcomingMeetings.joinButton}
            <ArrowRight size={18} className="ml-2 text-gray-400" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

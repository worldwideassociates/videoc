"use client";
import { ActiveMeetingCard } from "@/components/active-meeting-card";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UpcomingMeetingCard } from "@/components/upcoming-meeting-card";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Invite, Meeting, User } from "@prisma/client";
import React, { FC, use, useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { cancelMeeting } from "@/actions/meetings";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { LocaleContext, LocaleProvider } from "@/providers/locale-provider";
import { Locale } from "@/i18n.config";

interface IMeeting extends Meeting {
  invites: (Invite & { user: User })[];
}

interface clientProps {
  todaysMeetings: IMeeting[];
  scheduledMeetings: IMeeting[];
  t: Record<string, any>;
  locale: Locale;
}

export const DashboardClient: FC<clientProps> = ({
  todaysMeetings,
  scheduledMeetings,
  t,
  locale,
}) => {
  const [cancelling, setCancelling] = useState(false);
  const [meetingToCancel, setMeetingToCancel] = useState<Meeting | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const isOpen = useAlertModal((state) => state.isOpen);
  const onClose = useAlertModal((state) => state.onClose);
  const onOpen = useAlertModal((state) => state.onOpen);

  const handleCanelMeeting = async () => {
    const result = await cancelMeeting(meetingToCancel!.id);

    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
    } else {
      toast({
        title: "Error!",
        description: result.message,
      });
    }
    onCancel();
    router.push(`/${locale}`);
  };

  const prepareCanceling = (meeting: Meeting) => {
    setMeetingToCancel(meeting);
    onOpen();
  };

  const onConfirm = () => {
    setCancelling(true);
    handleCanelMeeting();
  };

  const onCancel = () => {
    setCancelling(false);
    setMeetingToCancel(null);
    onClose();
  };

  return (
    <LocaleProvider dictionary={t}>
      <AlertModal
        isOpen={isOpen}
        onClose={onCancel}
        onConfirm={onConfirm}
        loading={cancelling}
        title={t.alertModal.title}
        description={t.alertModal.description}
      />
      <div className="">
        <CardHeader className="px-0 pb-0">
          <div className="flex space-x-2 items-center">
            <div className="">
              <h2 className="text-xl font-bold tracking-tight">
                {t.upcomingMeetings.title}
              </h2>
              <p className="text-muted-foreground">
                {t.upcomingMeetings.subTitle}
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
            {todaysMeetings.map((meeting) => (
              <ActiveMeetingCard
                key={meeting.id}
                meeting={meeting}
                handleCancelMeeting={prepareCanceling}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="">
        <CardHeader className="px-0">
          <div className="flex space-x-2 items-center">
            <div className="">
              <h2 className="text-xl font-bold tracking-tight">
                {t.scheduledMeetings.title}
              </h2>
              <p className="text-muted-foreground">
                {t.scheduledMeetings.subTitle}
              </p>
            </div>
            <Button variant="outline" asChild className="rounded-full">
              <Link href={`/${locale}/meetings/new`}>
                <Plus size={24} />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <div className="flex flex-col  space-y-2">
          {scheduledMeetings.map((meeting) => (
            <UpcomingMeetingCard
              key={meeting.id}
              meeting={meeting}
              handleCancelMeeting={prepareCanceling}
            />
          ))}
        </div>
      </div>
    </LocaleProvider>
  );
};

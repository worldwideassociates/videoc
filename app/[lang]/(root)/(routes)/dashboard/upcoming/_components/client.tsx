"use client";

import { cancelMeeting } from "@/actions/meetings";
import { MeetingCard } from "@/components/meeting-card";
import { AlertModal } from "@/components/modals/alert-modal";
import { useToast } from "@/components/ui/use-toast";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { LocaleProvider } from "@/providers/locale-provider";
import { Invite, Meeting, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IMeeting extends Meeting {
  invites: (Invite & { user: User })[];
}

interface Props {
  t: Record<string, any>;
  meetings: IMeeting[];
}

export const UpcomingClient: React.FC<Props> = ({ t, meetings }) => {
  const router = useRouter();

  const [cancelling, setCancelling] = useState(false);
  const [meetingToCancel, setMeetingToCancel] = useState<Meeting | null>(null);

  const { toast } = useToast();

  const onCancel = () => {
    setCancelling(false);
    setMeetingToCancel(null);
    onClose();
  };

  const isOpen = useAlertModal((state) => state.isOpen);
  const onClose = useAlertModal((state) => state.onClose);
  const onOpen = useAlertModal((state) => state.onOpen);

  const prepareCanceling = (meeting: Meeting) => {
    setMeetingToCancel(meeting);
    onOpen();
  };

  const onConfirm = () => {
    setCancelling(true);
    handleCancelMeeting();
  };

  const handleCancelMeeting = async () => {
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
    router.refresh();
  };

  return (
    <LocaleProvider dictionary={t}>
      <section className="flex size-full flex-col gap-10">
        <h1 className="text-3xl font-bold">{t.upcomingMeetings.title}</h1>
        <div className="grid grid-cols-2 gap-4">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              handleCancelMeeting={prepareCanceling}
            />
          ))}
        </div>
        <AlertModal
          isOpen={isOpen}
          onClose={onCancel}
          onConfirm={onConfirm}
          loading={cancelling}
          title={t.alertModal.title}
          description={t.alertModal.description}
        />
      </section>
    </LocaleProvider>
  );
};

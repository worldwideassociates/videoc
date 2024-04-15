"use client";

import { Modal } from "@/components/ui/modal";
import HomeCard from "./home-card";
import { Calendar } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import MeetingForm from "./meeting-form";
import { useRouter } from "next/navigation";
import useLocale from "@/hooks/use-locale";

export const MeetingTypeList = () => {
  const router = useRouter();
  const { locale } = useLocale();
  const modal = useModal();

  const { dictionary: t } = useLocale();

  const _t = t.dashboard.homeCards;

  return (
    <>
      <section className="gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <HomeCard
          img="/icons/schedule.svg"
          title={_t.schedule.title}
          description={_t.schedule.description}
          className="bg-purple-1"
          handleClick={() => modal.onOpen()}
        />
        <HomeCard
          img="/icons/recordings.svg"
          title={_t.recordings.title}
          description={_t.recordings.description}
          className="bg-yellow-1"
          handleClick={() => router.push(`/${locale}/dashboard/recordings`)}
        />
        <HomeCard
          img="/icons/previousLight.svg"
          title={_t.upcoming.title}
          description={_t.upcoming.description}
          handleClick={() => router.push(`/${locale}/dashboard/upcoming`)}
        />
      </section>
      <Modal
        title={t.dashboard.meetingFormModal.title}
        Icon={Calendar}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        <MeetingForm />
      </Modal>
    </>
  );
};

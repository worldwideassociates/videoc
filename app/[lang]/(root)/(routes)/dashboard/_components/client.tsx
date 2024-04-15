"use client";

import { LocaleProvider } from "@/providers/locale-provider";
import { MeetingTypeList } from "./meeting-type-list";
import { Meeting } from "@prisma/client";
import { Locale } from "@/i18n.config";
import { getFormatedDate, getFormatedTime } from "@/lib/utils";

interface Props {
  t: any;
  upcomingMeeting?: Meeting;
  locale: Locale;
}

export const DashClient: React.FC<Props> = ({ t, upcomingMeeting, locale }) => {
  const now = new Date();

  const isMeetingToday = () => {
    if (!upcomingMeeting) return false;
    const today = new Date();
    const meetingDate = new Date(upcomingMeeting.startDateTime);

    return today.toDateString() === meetingDate.toDateString();
  };

  return (
    <LocaleProvider dictionary={t}>
      <section className="flex size-full flex-col gap-5 text-white">
        <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
          <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
            <h2 className="glassmorphism max-w-[273px] rounded py-2 text-base font-normal">
              {isMeetingToday()
                ? `${t.dashboard.upcomingMeeting} ${getFormatedTime(
                    upcomingMeeting?.startDateTime!,
                    locale
                  )}`
                : t.dashboard.noTodayMeeting}
            </h2>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold lg:text-7xl">
                {getFormatedTime(now, locale)}
              </h1>
              <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                {getFormatedDate(now, locale)}
              </p>
            </div>
          </div>
        </div>
        <MeetingTypeList />
      </section>
    </LocaleProvider>
  );
};

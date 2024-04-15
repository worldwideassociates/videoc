"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchInput } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserCard } from "@/components/user-card";
import { Locale } from "@/i18n.config";
import { getFormatedDate, getFormatedTime } from "@/lib/utils";
import { LocaleProvider } from "@/providers/locale-provider";
import { Invite, Meeting, Recording, User } from "@prisma/client";
import { ChevronRight, CopyIcon, PlayIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IRecording extends Recording {
  meeting: Meeting & { invites: (Invite & { user: User })[] };
}

interface Props {
  t: Record<string, any>;
  dashT: Record<string, any>;
  locale: Locale;
  recordings: IRecording[];
}

export const RecordingClient: React.FC<Props> = ({
  locale,
  dashT,
  t,
  recordings,
}) => {
  const [query, setQuery] = useState("");
  const [filteredRecordings, setFilteredRecordings] =
    useState<IRecording[]>(recordings);

  const { toast } = useToast();
  const router = useRouter();

  const filterRecords = () => {
    return recordings.filter((item) => {
      // Check if the meeting title matches the search text
      const isTitleMatch = item.meeting.title
        .toLowerCase()
        .includes(query.toLowerCase());

      // Check if any user name or email matches the search text
      const isUserMatch = item.meeting.invites.some((invite) => {
        const isNameMatch = invite.user?.name
          ?.toLowerCase()
          .includes(query.toLowerCase());
        const isEmailMatch = invite.user.email
          .toLowerCase()
          .includes(query.toLowerCase());
        return isNameMatch || isEmailMatch;
      });

      return isTitleMatch || isUserMatch;
    });
  };

  useEffect(() => {
    const records = filterRecords();

    const timeoutId = setTimeout(() => {
      setFilteredRecordings(records);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, recordings]);

  const handleCopyLinkClicked = (recording: IRecording) => {
    navigator.clipboard.writeText(recording.url);
    toast({
      description: dashT.recordings.linkCopied,
    });
  };

  return (
    <LocaleProvider dictionary={t}>
      <section className="flex size-full flex-col gap-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{dashT.recordings.title}</h1>
          <div className="max-w-[300px] flex gap-2">
            <SearchInput
              placeholder={dashT.recordings.filterInputPlaceholder}
              onChange={(value) => setQuery(value.target.value)}
              className="h-12 "
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredRecordings.map((recording) => (
            <Card key={recording.id}>
              <CardHeader>
                <CardTitle>
                  <VideoIcon size={30} />
                </CardTitle>
                <div className="flex items-center">
                  <p className="text-xl text-black">
                    {recording.meeting.title.slice(0, 10)}
                  </p>
                  <ChevronRight size={20} className="text-muted-foreground" />
                  <p className=" text-muted-foreground text-xl">{`record_${recording.id.slice(
                    0,
                    10
                  )}`}</p>
                </div>
                <CardDescription>
                  {`${getFormatedDate(
                    recording.createdAt,
                    locale
                  )}  ${getFormatedTime(recording.createdAt, locale)}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  {recording.meeting.invites
                    .map((invite, idx) => (
                      <UserCard
                        user={invite.user}
                        key={`participants-${idx}`}
                        isModerator={false}
                        isOnline={false}
                      />
                    ))
                    .slice(0, 3)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button onClick={() => router.push(recording.url)}>
                  <PlayIcon size={25} className="mr-2" /> Play
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCopyLinkClicked(recording)}
                >
                  <CopyIcon size={25} className="mr-2" /> Copy link
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </LocaleProvider>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";
import { UpcomingMeetingCard } from "@/components/upcoming-meeting-card";
import { VideoPlayer } from "@/components/video-player";
import { useModal } from "@/hooks/use-modal";
import { LocaleProvider } from "@/providers/locale-provider";
import { Invite, Meeting, Recording, User } from "@prisma/client";
import { Download } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import videojs from "video.js";

interface IMeeting extends Meeting {
  invites: (Invite & { user: User })[];
  recordings: Recording[];
}

interface clientProps {
  meetings: IMeeting[];
  t: Record<string, any>;
  meetingT: Record<string, any>;
  locale: string;
}

export const HistoryClient: FC<clientProps> = ({ meetings, t, meetingT }) => {
  const [currentMeeting, setCurrentMeeting] = useState<IMeeting>();
  const [currentRecordingIndex, setCurrentRecordingIndex] = useState<number>(0);
  const [filterInput, setFilterInput] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("title");
  const [filteredMeetings, setFilteredMeetings] = useState<IMeeting[]>([]);

  const isOpen = useModal((state) => state.isOpen);
  const onOpen = useModal((state) => state.onOpen);
  const onClose = useModal((state) => state.onClose);

  const handlePlayMeeting = (meeting: IMeeting) => {
    setCurrentMeeting(meeting);
    onOpen();
  };

  const handlePauseRecording = () => {
    setCurrentMeeting(undefined);
    onClose();
  };

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: currentMeeting?.recordings[currentRecordingIndex].url,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  useEffect(() => {
    const filterMeetings = (
      arr: IMeeting[],
      filterType: string,
      filterInput: string
    ) => {
      return arr.filter((meeting) => {
        if (filterType === "title") {
          return meeting.title
            .toLowerCase()
            .includes(filterInput.toLowerCase());
        }

        if (filterType === "participant") {
          return meeting.invites.some(
            (invite) =>
              invite.user.name
                ?.toLowerCase()
                .includes(filterInput.toLowerCase()) ||
              invite.user.email
                .toLowerCase()
                .includes(filterInput.toLowerCase())
          );
        }
      });
    };

    const timeoutId = setTimeout(() => {
      setFilteredMeetings(filterMeetings(meetings, filterType, filterInput));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filterInput, filterType]);

  const handleFilterInputChange = (e: any) => {
    setFilterInput(e.target.value);
  };

  const handleFilterTypeChange = (newType: string) => {
    setFilterInput("");
    setFilterType(newType);
  };

  return (
    <LocaleProvider dictionary={t}>
      <Modal isOpen={isOpen} onClose={handlePauseRecording}>
        <div className="mb-4">
          <div className="flex space-x-2 h-5 items-center">
            <span className="text-2xl text-gray-600">
              {currentMeeting?.title}
            </span>
            <Separator orientation="vertical" className="bg-gray-600" />
            <span>{currentRecordingIndex + 1}</span>
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex-grow">
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
          <div className=" flex flex-col space-y-2 p-3 pt-0">
            {currentMeeting?.recordings.map((recording, idx) => (
              <div className="flex spac-x-2">
                <Button
                  key={recording.id}
                  onClick={() => setCurrentRecordingIndex(idx)}
                  variant="link"
                  className="text-gray-500 py-0"
                >
                  Recording {idx + 1}
                </Button>
                <Button variant="ghost" size="icon">
                  <a
                    key={`recording-${idx}`}
                    href={recording.url}
                    // download={`meeting_${currentMeeting.id}_${currentRecordingIndex}`}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Download size={24} className="text-gray-400" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <div className="space-y-0.5 mb-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {meetingT.title}
            </h2>
            <p className="text-muted-foreground">{meetingT.subTitle}</p>
          </div>
          <div className="max-w-[300px] flex gap-2">
            <Input placeholder="filter" onChange={handleFilterInputChange} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto text-muted-foreground"
                >
                  by &gt; {filterType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => handleFilterTypeChange("title")}
                >
                  Title
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => handleFilterTypeChange("participant")}
                >
                  Participant
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex flex-col  space-y-2">
        {filteredMeetings.map((meeting) => (
          <UpcomingMeetingCard
            key={meeting.id}
            meeting={meeting}
            handleCancelMeeting={() => {}}
            handlePlayRecording={handlePlayMeeting}
          />
        ))}
      </div>
    </LocaleProvider>
  );
};

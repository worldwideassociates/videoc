"use client";

import { Modal } from "@/components/ui/modal";
import { UpcomingMeetingCard } from "@/components/upcoming-meeting-card";
import { VideoPlayer } from "@/components/video-player";
import { useModal } from "@/hooks/use-modal";
import { LocaleProvider } from "@/providers/locale-provider";
import { Invite, Meeting, Recording, User } from "@prisma/client";
import React, { FC, useState } from "react";
import videojs from "video.js";

interface IMeeting extends Meeting {
  invites: (Invite & { user: User })[];
  recordings: Recording[];
}

interface clientProps {
  meetings: IMeeting[];
  t: Record<string, any>;
  locale: string;
}

export const HistoryClient: FC<clientProps> = ({ meetings, t }) => {
  const [currentMeeting, setCurrentMeeting] = useState<IMeeting>();

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
        src: currentMeeting?.recordings[0].url!,
        type: "video/mp4",
      },
    ],
  };

  console.log(videoJsOptions);

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

  return (
    <LocaleProvider dictionary={t}>
      <Modal
        isOpen={isOpen}
        title={currentMeeting?.title!}
        onClose={handlePauseRecording}
      >
        {/* <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} /> */}
        <video
          id="my-player"
          className="video-js"
          controls
          preload="auto"
          width="640"
          height="264"
          data-setup="{}"
          src={currentMeeting?.recordings[0].url!}
        />
      </Modal>
      <div className="flex flex-col  space-y-2">
        {meetings.map((meeting) => (
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

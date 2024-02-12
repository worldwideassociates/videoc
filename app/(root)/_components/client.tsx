'use client'
import { ActiveMeetingCard } from "@/components/active-meeting-card";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UpcomingMeetingCard } from "@/components/upcoming-meeting-card";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Invite, Meeting, User } from '@prisma/client'
import React, { FC, useState } from 'react'
import { AlertModal } from "@/components/modals/alert-modal";
import { useAlertModal } from "@/hooks/use-alert-modal ";
import { cancelMeeting } from "@/actions/meetings";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface IMeeting extends Meeting {
  invites: (Invite & { user: User })[]
}

interface clientProps {
  todaysMeetings: IMeeting[]
  scheduledMeetings: IMeeting[]
}

export const DashboarClient: FC<clientProps> = ({ todaysMeetings, scheduledMeetings }) => {
  const [cancelling, setCancelling] = useState(false)
  const [meetingToCancel, setMeetingToCancel] = useState<Meeting | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const isOpen = useAlertModal(state => state.isOpen)
  const onClose = useAlertModal(state => state.onClose)
  const onOpen = useAlertModal(state => state.onOpen)


  const handleCanelMeeting = async () => {
    const result = await cancelMeeting(meetingToCancel!.id)

    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      })
    } else {
      toast({
        title: "Error!",
        description: result.message,
      })
    }
    onCancel()
    router.push('/')
  }


  const prepareDeleting = (meeting: Meeting) => {
    setMeetingToCancel(meeting)
    onOpen()
  }

  const onConfirm = () => {
    setCancelling(true)
    handleCanelMeeting()
  }

  const onCancel = () => {
    setCancelling(false)
    setMeetingToCancel(null)
    onClose()
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={onCancel}
        onConfirm={onConfirm}
        loading={cancelling}
        title="Are you sure?"
        description="You are about to cancel this meeting. This action cannot be undone."
      />
      <div className="">
        <CardHeader className="px-0 pb-0">
          <div className="flex space-x-2 items-center">
            <div className="">
              <h2 className="text-xl font-bold tracking-tight">Upcoming meetings</h2>
              <p className="text-muted-foreground">
                Your meetings scheduled for today.
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
            {
              todaysMeetings.map((meeting) => (
                <ActiveMeetingCard key={meeting.id} meeting={meeting} />
              ))
            }
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="">
        <CardHeader className="px-0">
          <div className="flex space-x-2 items-center">
            <div className="">
              <h2 className="text-xl font-bold tracking-tight">Scheduled Meetings</h2>
              <p className="text-muted-foreground">
                All meetings scheduled for the next 7 days.
              </p>
            </div>
            <Button variant="outline" asChild className="rounded-full">
              <Link href='/meetings/new'>
                <Plus size={24} />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <div className="flex flex-col  space-y-2">
          {
            scheduledMeetings.map((meeting) => (
              <UpcomingMeetingCard key={meeting.id} meeting={meeting} handleCancelMeeting={prepareDeleting} />
            ))
          }
        </div>
      </div>
    </>
  )
}
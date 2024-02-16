import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prismadb from '@/lib/prismadb'
import { User } from '@prisma/client'
import React, { FC } from 'react'
import MeetingForm from '../../_components/meeting-form'
import { Info } from 'lucide-react'

interface pageProps {
  params: { meetingId: string }
}

const page: FC<pageProps> = async ({ params }) => {

  const session = await auth();
  const currentUserId = session?.user?.id!

  let users: User[] = []

  if (currentUserId) {
    users = await prismadb.user.findMany({
      where: {
        NOT: {
          id: currentUserId
        }
      }
    })
  }

  const meeting = await prismadb.meeting.findFirst({
    where: {
      id: params.meetingId
    }
  })

  const invites = await prismadb.invite.findMany({
    where: {
      meetingId: params.meetingId
    },
    include: {
      user: true
    }
  })

  const participants = invites.map(invite => invite.user)

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <Card className='w-screen-md'>
        <CardHeader>
          <CardTitle>
            Update meeting
          </CardTitle>
          <CardDescription className='flex space-x-1'>
            <Info size={24} className="text-gray-400" />
            <span className="text-gray-400">When you update the start date and time, or invites, email notifications will be sent to the respective invites</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MeetingForm usersOptions={users} participants={participants} meeting={meeting} />
        </CardContent>
      </Card>
    </div>
  )
}

export default page;
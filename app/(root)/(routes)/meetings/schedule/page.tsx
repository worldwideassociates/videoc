import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { FC } from 'react'
import MeetingForm from '../_components/meeting-form';
import prismadb from '@/lib/prismadb';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { User } from '@prisma/client';

interface pageProps {

}

const page: FC<pageProps> = async ({ }) => {
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

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <Card className='max-w-xl w-full'>
        <CardHeader>
          <CardTitle>
            Schedule a meeting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MeetingForm usersOptions={users} />
        </CardContent>
      </Card>
    </div>
  )
}

export default page;
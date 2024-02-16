import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { FC } from 'react'
import MeetingForm from '../_components/meeting-form';
import prismadb from '@/lib/prismadb';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { User } from '@prisma/client';
import { Info } from 'lucide-react';

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
          <CardDescription className="flex space-x-1">
            <Info size={16} />
            <p>Creator of the meeting will automatically be the host</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MeetingForm usersOptions={users} />
        </CardContent>
      </Card>
    </div>
  )
}

export default page;
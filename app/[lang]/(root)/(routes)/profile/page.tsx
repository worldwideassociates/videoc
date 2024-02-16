import React, { FC } from 'react'
import prismadb from '@/lib/prismadb';
import { normalize } from '@/lib/utils';
import { User } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Userform } from '@/components/user-form';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

interface pageProps {

}

const Page: FC<pageProps> = async ({ }) => {

  const session = await auth()

  const user = await prismadb.user.findFirst({
    where: {
      id: session?.user?.id
    }
  })

  const normalizedUser = normalize(user) as User


  const taxOffices = await prismadb.taxOffice.findMany()

  const options = taxOffices.map((taxOffice) => ({
    value: taxOffice.name,
    label: taxOffice.name
  }))



  return (
    <div className="hidden space-y-6 p-10 py-5 md:block max-w-4xl">
      <Card className='pt-5'>
        <CardHeader>
          <CardTitle className="mx-5">My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Userform
            localTaxOfficesOptions={options}
            user={normalizedUser}
            role={normalizedUser.role!}
          />
        </CardContent>
      </Card>
    </div>
  )
}


export default Page

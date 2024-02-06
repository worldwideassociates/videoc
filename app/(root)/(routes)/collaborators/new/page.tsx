import React, { FC } from 'react'
import { CollaboratorForm } from '../_components/collaborator-form';
import prismadb from '@/lib/prismadb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface pageProps {

}

const Page: FC<pageProps> = async ({ }) => {

  const taxOffices = await prismadb.taxOffice.findMany()

  const options = taxOffices.map((taxOffice) => ({
    value: taxOffice.name,
    label: taxOffice.name
  }))


  return (
    <div className="hidden space-y-6 p-10 py-5 md:block">
      <Card className='pt-5'>
        <CardHeader>
          <CardTitle className="mx-5">New Collaborator</CardTitle>
        </CardHeader>
        <CardContent>
          <CollaboratorForm localTaxOfficesOptions={options} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page;
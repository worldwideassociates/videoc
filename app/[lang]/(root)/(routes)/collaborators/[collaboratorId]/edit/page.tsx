import React, { FC } from 'react'
import prismadb from '@/lib/prismadb';
import { CollaboratorForm } from '../../_components/collaborator-form';
import { normalize } from '@/lib/utils';
import { User } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

interface pageProps {
  params: { customerId: string, lang: Locale }
}

const Page: FC<pageProps> = async ({ params }) => {

  const { collaborators: t } = await getDictionary(params.lang) as any;

  const collaborator = await prismadb.user.findFirst({
    where: {
      id: params.customerId
    }
  })

  const normalizedCollaborator = normalize(collaborator) as User


  const taxOffices = await prismadb.taxOffice.findMany()

  const options = taxOffices.map((taxOffice) => ({
    value: taxOffice.name,
    label: taxOffice.name
  }))



  return (
    <div className="hidden space-y-6 p-10 py-5 md:block">
      <Card className='pt-5'>
        <CardHeader>
          <CardTitle className="mx-5">Edit collaborator</CardTitle>
        </CardHeader>
        <CardContent>
          <CollaboratorForm t={t} localTaxOfficesOptions={options} collaborator={normalizedCollaborator} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Page;
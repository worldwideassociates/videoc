import React, { FC } from 'react'
import prismadb from '@/lib/prismadb';
import { CollaboratorForm } from '../_components/collaborator-form';
import { Heading } from '@/components/heading';
import { normalize } from '@/lib/utils';
import { User } from '@prisma/client';

interface pageProps {
  params: { collaboratorId: string }
}

const Page: FC<pageProps> = async ({ params }) => {
  const collaborator = await prismadb.user.findFirst({
    where: {
      id: params.collaboratorId
    }
  })

  const taxOffices = await prismadb.taxOffice.findMany()

  const options = taxOffices.map((taxOffice) => ({
    value: taxOffice.name,
    label: taxOffice.name
  }))



  const normalizedCollaborator = normalize(collaborator) as User

  return (
    <div className="max-w-xl">
      <Heading title="Customers" />
      <CollaboratorForm localTaxOfficesOptions={options} collaborator={normalizedCollaborator} readonly={true} />
    </div>
  )
}

export default Page;
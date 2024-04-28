import React, { FC } from 'react'
import prismadb from '@/lib/prismadb';
import { CollaboratorForm } from '../../_components/collaborator-form';
import { Heading } from '@/components/heading';
import { normalize } from '@/lib/utils';
import { User } from '@prisma/client';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

interface pageProps {
  params: { collaboratorId: string, lang: Locale }
}

const Page: FC<pageProps> = async ({ params }) => {

  const { collaborators: t } = await getDictionary(params.lang) as any;

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
      <Heading title={t.details.title} />
      <CollaboratorForm t={t} localTaxOfficesOptions={options} collaborator={normalizedCollaborator} readonly={true} />
    </div>
  )
}

export default Page;
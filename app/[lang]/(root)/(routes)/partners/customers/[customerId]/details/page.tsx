import React, { FC } from 'react'
import prismadb from '@/lib/prismadb';
import { CustomerForm } from '../../_components/customer-form';
import { Heading } from '@/components/heading';
import { normalize } from '@/lib/utils';
import { User } from '@prisma/client';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';

interface pageProps {
  params: { customerId: string, lang: Locale }
}

const Page: FC<pageProps> = async ({ params }) => {


  const { customers: t } = await getDictionary(params.lang) as any;

  const customer = await prismadb.user.findFirst({
    where: {
      id: params.customerId
    }
  })

  const taxOffices = await prismadb.taxOffice.findMany()

  const options = taxOffices.map((taxOffice) => ({
    value: taxOffice.name,
    label: taxOffice.name
  }))



  const normalizedCustomer = normalize(customer) as User

  return (
    <div className="max-w-xl">
      <Heading title={t.details.title} />
      <CustomerForm
        localTaxOfficesOptions={options}
        customer={normalizedCustomer}
        readonly={true}
        t={t} />
    </div>
  )
}

export default Page;
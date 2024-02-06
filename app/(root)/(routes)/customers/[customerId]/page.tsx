import React, { FC } from 'react'
import prismadb from '@/lib/prismadb';
import { CustomerForm } from '../_components/customer-form';
import { Heading } from '@/components/heading';
import { normalize } from '@/lib/utils';
import { User } from '@prisma/client';

interface pageProps {
  params: { customerId: string }
}

const Page: FC<pageProps> = async ({ params }) => {
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
      <Heading title="Customers" />
      <CustomerForm localTaxOfficesOptions={options} customer={normalizedCustomer} readonly={true} />
    </div>
  )
}

export default Page;
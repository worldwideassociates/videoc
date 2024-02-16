import React, { FC } from 'react'
import prismadb from '@/lib/prismadb';
import { EmployeeForm } from '../_components/employee-form';
import { Heading } from '@/components/heading';
import { normalize } from '@/lib/utils';
import { User } from '@prisma/client';

interface pageProps {
  params: { employeeId: string }
}

const Page: FC<pageProps> = async ({ params }) => {
  const departments = await prismadb.department.findMany()

  const departmentOptions = departments.map((department) => ({
    label: department.name,
    // TODO: Fix types
    value: department.id,
  }))

  const employee = await prismadb.user.findFirst({
    where: {
      id: params.employeeId
    }
  })

  const normalizedEmployee = normalize(employee) as User

  return (
    <div className="max-w-xl">
      <Heading title="Employee Information" />
      <EmployeeForm departmentsOptions={departmentOptions} employee={normalizedEmployee} readonly={true} />
    </div>
  )
}

export default Page;
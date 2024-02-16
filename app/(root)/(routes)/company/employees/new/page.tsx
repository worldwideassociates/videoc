import React, { FC } from 'react'
import { EmployeeForm } from '../_components/employee-form';
import prismadb from '@/lib/prismadb';

interface pageProps {

}

const Page: FC<pageProps> = async ({ }) => {
  const departments = await prismadb.department.findMany()

  const departmentOptions = departments.map((department) => ({
    label: department.name,
    // TODO: Fix types
    value: department.id,
  }))

  return (
    <div className="max-w-xl">
      <EmployeeForm departmentsOptions={departmentOptions} />
    </div>
  )
}

export default Page;
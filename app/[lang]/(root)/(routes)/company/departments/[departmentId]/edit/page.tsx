import { getUsersWithoutDepartment } from '@/actions/users';
import prismadb from '@/lib/prismadb';
import React, { FC } from 'react'
import { DepartmentForm } from '../../_components/department-form';

interface pageProps {
  params: { departmentId: string }
}

const page: FC<pageProps> = async ({ params }) => {
  const users = await getUsersWithoutDepartment()
  const department = await prismadb.department.findFirst({
    where: {
      id: params.departmentId
    },
    include: {
      members: true,
    }
  })

  const manager = department?.managerId ? await prismadb.user.findFirst({
    where: {
      id: department?.managerId!
    }
  }) : null
  return (
    <div className="max-w-2xl mt--5">
      <DepartmentForm usersOptions={users} department={department} manager={manager} />
    </div>
  )
}

export default page;
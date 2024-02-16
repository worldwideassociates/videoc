import { getUsersWithoutDepartment } from '@/actions/users';
import React, { FC } from 'react'
import { DepartmentForm } from '../_components/department-form';

interface pageProps {

}

const page: FC<pageProps> = async ({ }) => {
    const users = await getUsersWithoutDepartment()
    return (
        <div className="max-w-2xl mt--5">
            <DepartmentForm usersOptions={users} />
        </div>
    )
}

export default page;
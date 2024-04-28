import { getUsersWithoutDepartment } from "@/actions/users";
import prismadb from "@/lib/prismadb";
import React, { FC } from "react";
import { DepartmentForm } from "../../_components/department-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Heading } from "@/components/heading";

interface pageProps {
  params: { departmentId: string; lang: Locale };
}

const page: FC<pageProps> = async ({ params }) => {
  const { departments: t } = (await getDictionary(params.lang)) as any;

  const users = await getUsersWithoutDepartment();
  const department = await prismadb.department.findFirst({
    where: {
      id: params.departmentId,
    },
    include: {
      members: true,
    },
  });

  return (
    <div className="max-w-2xl mt--5">
      <Heading title={t.form.create.title} />
      <DepartmentForm usersOptions={users} department={department!} t={t} />
    </div>
  );
};

export default page;

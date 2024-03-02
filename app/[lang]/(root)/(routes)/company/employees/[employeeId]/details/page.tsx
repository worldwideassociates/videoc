import React, { FC } from "react";
import prismadb from "@/lib/prismadb";
import { EmployeeForm } from "../../_components/employee-form";
import { Heading } from "@/components/heading";
import { normalize } from "@/lib/utils";
import { User } from "@prisma/client";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

interface pageProps {
  params: { employeeId: string; locale: Locale };
}

const Page: FC<pageProps> = async ({ params }) => {
  const { employees: t } = (await getDictionary(params.locale)) as any;

  const departments = await prismadb.department.findMany();

  const departmentOptions = departments.map((department) => ({
    label: department.name,
    value: department.id,
  }));

  const employee = await prismadb.user.findFirst({
    where: {
      id: params.employeeId,
    },
  });

  const normalizedEmployee = normalize(employee) as User;

  return (
    <div className="max-w-xl">
      <Heading title="Employee Information" />
      <EmployeeForm
        departmentsOptions={departmentOptions}
        employee={normalizedEmployee}
        readonly={true}
        t={t}
      />
    </div>
  );
};

export default Page;

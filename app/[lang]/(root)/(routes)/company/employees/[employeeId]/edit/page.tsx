import React, { FC } from "react";
import prismadb from "@/lib/prismadb";
import { EmployeeForm } from "../../_components/employee-form";
import { Heading } from "@/components/heading";
import { normalize } from "@/lib/utils";
import { User } from "@prisma/client";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

interface pageProps {
  params: { employeeId: string; lang: Locale };
}

const Page: FC<pageProps> = async ({ params }) => {
  const { employees: t } = (await getDictionary(params.lang)) as any;

  const departments = await prismadb.department.findMany();

  const departmentOptions = departments.map((department) => ({
    label: department.name,
    // TODO: Fix types
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
      <Heading title={t.form.update.title} />
      <EmployeeForm
        departmentsOptions={departmentOptions}
        employee={normalizedEmployee}
        t={t}
      />
    </div>
  );
};

export default Page;

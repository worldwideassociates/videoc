import React, { FC } from "react";
import { EmployeeForm } from "../_components/employee-form";
import prismadb from "@/lib/prismadb";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Heading } from "@/components/heading";

interface pageProps {
  params: { lang: Locale };
}

const Page: FC<pageProps> = async ({ params }) => {
  const { employees: t } = (await getDictionary(params.lang)) as any;

  const departments = await prismadb.department.findMany();

  const departmentOptions = departments.map((department) => ({
    label: department.name,
    // TODO: Fix types
    value: department.id,
  }));

  return (
    <div className="max-w-xl">
      <Heading title={t.form.create.title} />
      <EmployeeForm departmentsOptions={departmentOptions} t={t} />
    </div>
  );
};

export default Page;

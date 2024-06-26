import { getUsersWithoutDepartment } from "@/actions/users";
import React, { FC } from "react";
import { DepartmentForm } from "../_components/department-form";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

interface pageProps {
  params: { lang: Locale };
}

const page: FC<pageProps> = async ({ params }) => {
  const { departments: t } = (await getDictionary(params.lang)) as any;

  const users = await getUsersWithoutDepartment();

  return (
    <div className="max-w-2xl mt--5">
      <DepartmentForm usersOptions={users} t={t} />
    </div>
  );
};

export default page;

import React from "react";
import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { EmployeeColumn } from "./components/columns";
import { Role } from "@prisma/client";
import { EmployeeClient } from "./components/employees-client";

const EmployeesPage = async ({ params }: { params: { storeId: string } }) => {
  const employees = await prismadb.account.findMany({
    where: {
      role: Role.EMPLOYEE,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedEmployees: EmployeeColumn[] = employees.map((item) => ({
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    createdAt: format(item.createdAt, "MMM do yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmployeeClient data={formattedEmployees} />
      </div>
    </div>
  );
};

export default EmployeesPage;

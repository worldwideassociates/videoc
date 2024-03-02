import { Role } from "@prisma/client";
import { EmployeeClient } from "./_components/client";
import prismadb from "@/lib/prismadb";
import { EmployeeColumn } from "./_components/columns";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

interface Props {
  params: { lang: Locale };
}

const EmployeePage: React.FC<Props> = async ({ params }) => {
  const { employees: t } = (await getDictionary(params.lang)) as any;

  const employees = await prismadb.user.findMany({
    where: {
      role: Role.EMPLOYEE,
    },
    include: {
      department: true,
    },
  });

  const formattedEmployees: EmployeeColumn[] = employees.map((employee) => ({
    id: employee.id,
    name: employee.name,
    email: employee.email,
    phone: employee.phone || "-",
    position: employee.position || "-",
    department: employee.department?.name || "-",
    createdAt: employee.createdAt,
  }));

  return (
    <div className="flex-col">
      <EmployeeClient data={formattedEmployees} t={t} />
    </div>
  );
};

export default EmployeePage;

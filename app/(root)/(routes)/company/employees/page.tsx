import { Role } from "@prisma/client"
import { EmployeeClient } from "./_components/client"
import prismadb from "@/lib/prismadb"
import { EmployeeColumn } from "./_components/columns"




interface Props {

}


const EmployeePage: React.FC<Props> = async () => {

  const employees = await prismadb.user.findMany({
    where: {
      role: Role.EMPLOYEE
    },
    include: {
      department: true
    }
  })

  const formattedEmployees: EmployeeColumn[] = employees.map((employee) => ({
    id: employee.id,
    name: employee.name,
    email: employee.email,
    phone: employee.phone || "-",
    position: employee.position || "-",
    department: employee.department?.name || "-",
    createdAt: employee.createdAt
  }))

  return (
    <div className="flex-col">
      <EmployeeClient data={formattedEmployees} />
    </div>
  )
}

export default EmployeePage

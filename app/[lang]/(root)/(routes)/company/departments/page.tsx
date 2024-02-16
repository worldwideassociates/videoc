import { Department } from "@prisma/client"
import { DepartmentClient } from "./client"
import prismadb from "@/lib/prismadb"




interface Props {

}


const DepartmentsPage: React.FC<Props> = async () => {

  const departments = await prismadb.department.findMany({
    include: {
      members: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return (
    <div className="flex-col">
      <DepartmentClient data={departments} />
    </div>
  )
}

export default DepartmentsPage

import { Department } from "@prisma/client"
import { DepartmentClient } from "./client"




interface Props {

}


const DepartmentsPage: React.FC<Props> = () => {

  const departments = [] satisfies Department[]
  return (
    <div className="flex-col">
      <DepartmentClient data={departments} />
    </div>
  )
}

export default DepartmentsPage

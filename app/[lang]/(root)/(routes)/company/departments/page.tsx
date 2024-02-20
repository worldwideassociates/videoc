import { Department } from "@prisma/client"
import { DepartmentClient } from "./client"
import prismadb from "@/lib/prismadb"
import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionary"




interface Props {
  params: { lang: Locale }
}


const DepartmentsPage: React.FC<Props> = async ({ params }) => {

  const { departments: t } = await getDictionary(params.lang) as any

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
      <DepartmentClient data={departments} t={t} />
    </div>
  )
}

export default DepartmentsPage

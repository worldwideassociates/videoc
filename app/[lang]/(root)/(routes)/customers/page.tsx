import { Role } from "@prisma/client"
import { CustomerClient } from "./_components/client"
import prismadb from "@/lib/prismadb"
import { CustomerColumn } from "./_components/columns"
import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionary"




interface Props {
  params: { lang: Locale }
}


const CustomersPage: React.FC<Props> = async ({ params }) => {

  const { customers: t } = await getDictionary(params.lang) as any;

  const customers = await prismadb.user.findMany({
    where: {
      role: Role.CUSTOMER
    }
  })

  const formattedCustomers: CustomerColumn[] = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    profession: customer.profession || "-",
    vatNumber: customer.vatNumber || "-",
    localTaxOffice: customer.localTaxOffice || "-",
    address: customer.address || "-",
  }))

  return (
    <CustomerClient t={t} data={formattedCustomers} />
  )
}

export default CustomersPage

import { Role } from "@prisma/client"
import { CustomerClient } from "./_components/client"
import prismadb from "@/lib/prismadb"
import { CustomerColumn } from "./_components/columns"




interface Props {

}


const CustomersPage: React.FC<Props> = async () => {

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
    <CustomerClient data={formattedCustomers} />
  )
}

export default CustomersPage

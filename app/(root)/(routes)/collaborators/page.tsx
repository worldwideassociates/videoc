import { Role } from "@prisma/client"
import { CollaboratorClient } from "./_components/client"
import prismadb from "@/lib/prismadb"
import { CollaboratorColumn } from "./_components/columns"




interface Props {

}


const CollaboratorPage: React.FC<Props> = async () => {

  const collaborators = await prismadb.user.findMany({
    where: {
      role: Role.COLLABORATOR
    }
  })

  const formattedCollaborators: CollaboratorColumn[] = collaborators.map((collaborator) => ({
    id: collaborator.id,
    name: collaborator.name,
    profession: collaborator.profession || "-",
    vatNumber: collaborator.vatNumber || "-",
    localTaxOffice: collaborator.localTaxOffice || "-",
    address: collaborator.address || "-",
  }))

  return (
    <CollaboratorClient data={formattedCollaborators} />
  )
}

export default CollaboratorPage

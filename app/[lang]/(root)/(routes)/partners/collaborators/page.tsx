import { Role } from "@prisma/client";
import { CollaboratorClient } from "./_components/client";
import prismadb from "@/lib/prismadb";
import { CollaboratorColumn } from "./_components/columns";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

interface Props {
  params: { lang: Locale };
}

const CollaboratorPage: React.FC<Props> = async ({ params }) => {
  const { collaborators: t } = (await getDictionary(params.lang)) as any;

  const collaborators = await prismadb.user.findMany({
    where: {
      role: Role.COLLABORATOR,
    },
  });

  const formattedCollaborators: CollaboratorColumn[] = collaborators.map(
    (collaborator) => ({
      id: collaborator.id,
      name: collaborator.name,
      profession: collaborator.profession || "-",
      vatNumber: collaborator.vatNumber || "-",
      localTaxOffice: collaborator.localTaxOffice || "-",
      address: collaborator.address || "-",
    })
  );

  return (
    <CollaboratorClient
      locale={params.lang}
      data={formattedCollaborators}
      t={t}
    />
  );
};

export default CollaboratorPage;

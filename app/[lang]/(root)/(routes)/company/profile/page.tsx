import prismadb from "@/lib/prismadb";
import { ProfileForm } from "./_components/profile-form";
import { Card, CardContent } from "@/components/ui/card";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import keygen from "keygen";
import { Company } from "@prisma/client";

interface Props {
  params: { lang: Locale };
}

export default async function CompanyProfilePage({ params }: Props) {
  const { companyProfile: t } = (await getDictionary(params.lang)) as any;

  const _company = (await prismadb.company.findFirst({})) as Company;
  const serialNumber = _company?.serialNumber ?? `SERIAL-${keygen.url(8)}`;

  const company = await prismadb.company.upsert({
    where: { singleton: "singleton" },
    create: {
      singleton: "singleton",
      serialNumber,
      // Add any default values for other fields if necessary
    },
    update: {},
  });
  return (
    <Card>
      <CardContent className="mt-10">
        <ProfileForm company={company} t={t} />
      </CardContent>
    </Card>
  );
}

import prismadb from "@/lib/prismadb";
import { ProfileForm } from "./_components/profile-form";
import { Card, CardContent } from "@/components/ui/card";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

interface Props {
  params: { lang: Locale };
}

export default async function CompanyProfilePage({ params }: Props) {
  const { companyProfile: t } = (await getDictionary(params.lang)) as any;

  const company = await prismadb.company.upsert({
    where: { singleton: "singleton" },
    create: {
      singleton: "singleton",
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

import prismadb from "@/lib/prismadb";
import { ProfileForm } from "./_components/profile-form";
import { Card, CardContent } from "@/components/ui/card";



export default async function CompanyProfilePage() {
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
        <ProfileForm company={company} />
      </CardContent>
    </Card>
  )
}
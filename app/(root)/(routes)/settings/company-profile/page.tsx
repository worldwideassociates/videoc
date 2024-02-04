import prismadb from "@/lib/prismadb";
import { CompanyProfileForm } from "./_components/company-profile-form";



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
    <div className="lg:max-w-2xl">
    <CompanyProfileForm company={company} />
    </div>
  )
}
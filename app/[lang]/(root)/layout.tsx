import { Navbar } from "@/components/navbar";
import { redirect } from "next/navigation";
import { auth } from "../../api/auth/[...nextauth]/auth";
import { CheckAccountDetails } from "@/components/check-account-details";
import { User } from "@prisma/client";
import { CardHeader } from "@/components/ui/card";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const session = await auth();

  if (!session) return redirect("/sign-in");

  const user = session.user as User;

  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <>
      {/* <CheckAccountDetails user={user} /> */}
      <Navbar t={dictionary} />
      <div className="container mb-5">{children}</div>
    </>
  );
}

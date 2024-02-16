import { Navbar } from "@/components/navbar"
import { redirect } from 'next/navigation'
import { auth } from '../../api/auth/[...nextauth]/auth';
import { CheckAccountDetails } from "@/components/check-account-details";
import { User } from "@prisma/client";
import { CardHeader } from "@/components/ui/card";



export default async function DashboardLayout({ children }: {
  children: React.ReactNode,
}) {
  const session = await auth();

  if (!session) return redirect('/sign-in');

  const user = session.user as User;

  return (
    <>
      <CheckAccountDetails user={user} />
      <Navbar />
      <div className="container mb-5">
        {children}
      </div>
    </>
  )



}
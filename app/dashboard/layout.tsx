import { Navbar } from "@/components/navbar"
import { redirect } from 'next/navigation'
import { auth } from '../api/auth/[...nextauth]/auth';



export default async function DashboardLayout({ children }: {
  children: React.ReactNode,
}) {
  const session = await auth();

  if (!session) return redirect('/sign-in');

  return (
    <>
      <Navbar />
      {children}
    </>
  )



}
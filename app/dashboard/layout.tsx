import { Navbar } from "@/components/navbar"
import prismadb from "@/lib/prismadb"
import { redirect } from 'next/navigation'
import { auth } from '../api/auth/[...nextauth]/auth';



export default async function DashboardLayout({ children }: {
  children: React.ReactNode,
}) {
  const session = await auth();

  if (!session) return redirect('/');

  return (
    <>
      <Navbar />
      {children}
    </>
  )



}
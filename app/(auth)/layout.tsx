
import { redirect } from 'next/navigation'
import { auth } from '../api/auth/[...nextauth]/auth';


interface RootLayoutProps {
  children: React.ReactNode
}


export default async function AuthLayout({ children }: RootLayoutProps) {

  // const session = await auth();

  // if (session) return redirect('/dashboard');

  return <div className="">{children}</div>;
}
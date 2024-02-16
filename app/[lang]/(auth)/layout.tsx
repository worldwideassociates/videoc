
import { redirect } from 'next/navigation'
import { auth } from '../api/auth/[...nextauth]/auth';


interface Props {
  children: React.ReactNode
}


export default async function AuthLayout({ children }: Props) {

  const session = await auth();

  if (session) return redirect('/');

  return <div className="">{children}</div>;
}
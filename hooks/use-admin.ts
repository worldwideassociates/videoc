import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";



export const useAdmin = () => {

  const { data: session }: any = useSession();

  const currentUser = session?.user;
  const isAdmin =
    currentUser?.role === Role.ADMIN || currentUser?.role === Role.SUPER_ADMIN;

  const isEmployee = currentUser?.role === Role.EMPLOYEE || isAdmin
  return { isAdmin, isEmployee }
}
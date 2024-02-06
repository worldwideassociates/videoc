'use client'

import { MainNav } from "@/components/main-nav";
import { NavItem } from "@/components/nav-item";
import { LogOutIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import CustomAvatar from './custom-avatar/custom-avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";


type Route = {
  label: string,
  Icon: React.ComponentType<any>,
  href: string

}


const routes = [
  {
    label: 'Log Out',
    Icon: LogOutIcon,
    href: '/sign-out'
  }
]



export const Navbar = () => {
  const { data: session } = useSession()

  const initials = session?.user?.name?.split(' ').map((n: string) => n[0]).join('') || ''


  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='link' className="px-0 mr-2">
                <CustomAvatar className='w-[35px] h-[35px]' image={session?.user?.image || ''} isOnline={true} initials={initials} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-10">
              <DropdownMenuGroup>
                {routes.map((route, idx) => (
                  <Link href={route.href} key={`nav-item-${idx}`}>
                    <DropdownMenuItem >
                      <route.Icon className="mr-2 h-4 w-4" />
                      <span>{route.label}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
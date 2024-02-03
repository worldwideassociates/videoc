'use client'

import { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { NavItem } from "@/components/nav-item";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import CustomAvatar from './custom-avatar/custom-avatar';


export const Navbar = () => {
  const { data: session } = useSession()

  const initials = session?.user?.name?.split(' ').map((n: string) => n[0]).join('') || ''


  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* <MainNav /> */}
        <div className="ml-auto flex items-center space-x-4">
          <NavItem label="My Account" routes={[
            {
              label: 'Settings',
              Icon: SettingsIcon,
              href: '/settings/company-profile'
            },
            {
              label: 'Log Out',
              Icon: LogOutIcon,
              href: '/sign-out'
            }
          ]} />
          <CustomAvatar className='w-[35px] h-[35px]' image={session?.user?.image || ''} isOnline={true} initials={initials} />
        </div>
      </div>
    </div>
  );
};
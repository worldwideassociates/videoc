"use client";

import { MainNav } from "@/components/main-nav";
import { NavItem } from "@/components/nav-item";
import { LogOutIcon, User } from "lucide-react";
import { useSession } from "next-auth/react";
import CustomAvatar from "./custom-avatar/custom-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { LocaleSwitcher } from "./locale-switcher";
import { LocaleProvider } from "@/providers/locale-provider";

type Route = {
  label: string;
  Icon: React.ComponentType<any>;
  href: string;
};

const routes = [
  {
    label: "Profile",
    Icon: User,
    href: "/profile",
  },
  {
    label: "Log Out",
    Icon: LogOutIcon,
    href: "/sign-out",
  },
];

export const Navbar = ({ t }: { t: any }) => {
  const { data: session } = useSession();

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("") || "";

  return (
    <LocaleProvider dictionary={t}>
      <div className="border-b pl-16">
        <div className="flex h-16 items-center px-4">
          <MainNav />
          <div className="ml-auto flex space-x-3">
            <LocaleSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="px-0 mr-2">
                  <CustomAvatar
                    className="w-[50px] h-[50px]"
                    image={session?.user?.image || ""}
                    isOnline={true}
                    initials={initials}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-10">
                <DropdownMenuGroup>
                  {routes.map((route, idx) => (
                    <Link href={route.href} key={`nav-item-${idx}`}>
                      <DropdownMenuItem>
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
    </LocaleProvider>
  );
};

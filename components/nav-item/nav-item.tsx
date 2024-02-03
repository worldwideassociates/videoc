'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"


type Route = {
  label: string,
  Icon: React.ComponentType<any>,
  href: string

}

interface NavItemProps {
  label: string,
  routes: Route[]
}

const NavItem: React.FC<NavItemProps> = ({ label, routes }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-56" >{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
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
  )
}


export default NavItem

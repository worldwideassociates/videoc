'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"


const routes = [
  {
    label: 'Customers Listing',
    href: '/customers',
  }
]



const CustomerNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <aside className="-mx-4 lg:w-1/5">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">

        {routes.map((route, idx) => (
          <Link
            key={`nav-item-${idx}`}
            href={route.href}
            className={cn(
              "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 justify-start",
              isActive(route.href) ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline'
            )}>
            {route.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}


export default CustomerNav






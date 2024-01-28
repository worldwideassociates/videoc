"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MainNav: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const pathname = usePathname();

  const routes = [
    {
      href: `/dashboard/employees`,
      label: "Employees",
      active: pathname === `/dashboard/employees`,
    },
    {
      href: `/dashboard/customers`,
      label: "Customers",
      active: pathname === `/dashboard/customers`,
    }
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
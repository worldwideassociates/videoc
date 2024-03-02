"use client";

import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import { LocaleContext } from "@/providers/locale-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

const routes = [
  {
    label: (t: Record<string, any>) => t.nav.companyProfile,
    href: (locale: Locale) => `/${locale}/company/profile`,
  },
  {
    label: (t: Record<string, any>) => t.nav.departments,
    href: (locale: Locale) => `/${locale}/company/departments`,
  },
  {
    label: (t: Record<string, any>) => t.nav.employees,
    href: (locale: Locale) => `/${locale}/company/employees`,
  },
  {
    label: (t: Record<string, any>) => t.nav.license,
    href: (locale: Locale) => `/${locale}/company/license`,
  },
];

const companyNav = ({ t }: { t: any }) => {
  const pathname = usePathname();

  const { locale } = use(LocaleContext);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="flex">
      {routes.map((route, idx) => (
        <Link
          key={`nav-item-${idx}`}
          href={route.href(locale)}
          className={cn(
            "items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 justify-start",
            isActive(route.href(locale))
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline"
          )}
        >
          {route.label(t)}
        </Link>
      ))}
    </div>
  );
};

export default companyNav;

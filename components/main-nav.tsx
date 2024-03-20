"use client";

import { useAdmin } from "@/hooks/use-admin";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import { LocaleContext } from "@/providers/locale-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

export const MainNav: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const pathname = usePathname();
  const { isEmployee } = useAdmin();

  const routes = [
    {
      active: pathname === `/`,
      label: (t: Record<string, any>) => t.mainNav.dashboard,
      href: (locale: Locale) => `/${locale}`,
    },
    {
      label: (t: Record<string, any>) => t.mainNav.history,
      href: (locale: Locale) => `/${locale}/meetings/history`,
      active: pathname === `/history`,
    },
  ];

  const adminRoutes = [
    {
      label: (t: Record<string, any>) => t.mainNav.customers,
      href: (locale: Locale) => `/${locale}/customers`,
      active: pathname.includes(`/customers`),
    },
    {
      label: (t: Record<string, any>) => t.mainNav.collaborators,
      href: (locale: Locale) => `/${locale}/collaborators`,
      active: pathname.includes(`/collaborators`),
    },
    {
      label: (t: Record<string, any>) => t.mainNav.companyProfile,
      href: (locale: Locale) => `/${locale}/company/profile`,
      active: pathname.includes(`/company`),
    },
  ];

  const { locale, dictionary: t } = use(LocaleContext);

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href(locale)}
          href={route.href(locale)}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label(t)}
        </Link>
      ))}
      {adminRoutes.map((route) =>
        isEmployee ? (
          <Link
            key={route.href(locale)}
            href={route.href(locale)}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label(t)}
          </Link>
        ) : null
      )}
    </nav>
  );
};

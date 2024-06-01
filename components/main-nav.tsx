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
      href: (locale: Locale) => `/${locale}/dashboard`,
    },
  ];

  const adminRoutes = [
    {
      label: (t: Record<string, any>) => t.mainNav.companyProfile,
      href: (locale: Locale) => `/${locale}/company/profile`,
      active: pathname.includes(`/company`),
    },
    {
      label: (t: Record<string, any>) => t.mainNav.partners,
      href: (locale: Locale) => `/${locale}/partners/collaborators`,
      active: pathname.includes(`/partners`),
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
            "text-lg font-medium transition-colors hover:text-primary",
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
              "text-lg font-medium transition-colors hover:text-primary",
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

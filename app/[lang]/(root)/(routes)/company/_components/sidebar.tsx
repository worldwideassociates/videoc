"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Locale } from "@/i18n.config";

interface Props {
  t: Record<string, any>;
  locale: Locale;
}

const Sidebar: React.FC<Props> = ({ locale, t }) => {
  const pathname = usePathname();

  const routes = [
    {
      imgURL: "/icons/upcoming.svg",
      lightImgURL: "/icons/upcomingLight.svg",
      route: `/${locale}/company/profile`,
      label: t.nav.companyProfile,
    },
    {
      imgURL: "/icons/previous.svg",
      lightImgURL: "/icons/previousLight.svg",
      route: `/${locale}/company/departments`,
      label: t.nav.departments,
    },
    {
      imgURL: "/icons/previous.svg",
      lightImgURL: "/icons/previousLight.svg",
      route: `/${locale}/company/employees`,
      label: t.nav.employees,
    },
    {
      imgURL: "/icons/previous.svg",
      lightImgURL: "/icons/previousLight.svg",
      route: `/${locale}/company/license`,
      label: t.nav.license,
    },
  ];

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  p-6 pt-16 max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {routes.map((item) => {
          const isActive = pathname === item.route;

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                {
                  "bg-dark-1 text-white": isActive,
                }
              )}
            >
              <Image
                src={isActive ? item.lightImgURL : item.imgURL}
                alt={item.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;

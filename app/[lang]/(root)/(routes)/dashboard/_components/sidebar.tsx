"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Locale } from "@/i18n.config";
import { useAdmin } from "@/hooks/use-admin";

interface Props {
  t: Record<string, any>;
  locale: Locale;
}

const Sidebar: React.FC<Props> = ({ locale, t }) => {
  const pathname = usePathname();
  const { isEmployee } = useAdmin();

  const routes = [
    {
      imgURL: "/icons/upcoming.svg",
      lightImgURL: "/icons/upcomingLight.svg",
      route: `/${locale}/dashboard/upcoming`,
      label: t.sidenav.upcoming,
    },
    {
      imgURL: "/icons/previous.svg",
      lightImgURL: "/icons/previousLight.svg",
      route: `/${locale}/dashboard/previous`,
      label: t.sidenav.previous,
    },
  ];

  const adminRoutes = [
    {
      imgURL: "/icons/Home.svg",
      lightImgURL: "/icons/HomeLight.svg",
      route: `/${locale}/dashboard`,
      label: "Home",
    },
    {
      imgURL: "/icons/Video.svg",
      lightImgURL: "/icons/recordingsLight.svg",
      route: `/${locale}/dashboard/recordings`,
      label: "Recordings",
    },
  ];

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  p-6 pt-16 max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {isEmployee
          ? adminRoutes.map((item) => {
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
            })
          : null}
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

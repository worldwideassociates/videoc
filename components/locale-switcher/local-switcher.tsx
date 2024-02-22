"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Locale, i18n } from "@/i18n.config";
import { Button } from "../ui/button";

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const currentLocale = () => {
    const segments = pathName.split("/");
    return segments[1] as Locale;
  };

  const redirectedPathName = () => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] =
      currentLocale() === i18n.locales[0] ? i18n.locales[1] : i18n.locales[0];
    return segments.join("/");
  };

  return (
    <Button asChild size="sm">
      <Link href={redirectedPathName()}>{currentLocale().toUpperCase()}</Link>
    </Button>
  );
}

import { Locale, i18n } from "@/i18n.config";
import React, { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Create the LocaleContext
export const LocaleContext = createContext<{
  locale: Locale;
  updateLocale: (newLocale: Locale) => void;
  dictionary: Record<string, any>;
}>({
  locale: i18n.defaultLocale,
  updateLocale: () => {},
  dictionary: {},
});

// Create the LocaleProvider component
export const LocaleProvider: React.FC<{
  children: React.ReactNode;
  dictionary: Record<string, any>;
}> = ({ children, dictionary }) => {
  const [locale, setLocale] = useState<Locale>(i18n.defaultLocale);

  const pathName = usePathname();

  const currentLocale = () => {
    const segments = pathName.split("/");
    return segments[1] as Locale;
  };

  // Function to update the locale
  const updateLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  useEffect(() => {
    const locale = currentLocale();
    if (locale) {
      setLocale(locale);
    }
  }, [pathName]);

  return (
    <LocaleContext.Provider
      value={{ locale, updateLocale, dictionary: dictionary }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

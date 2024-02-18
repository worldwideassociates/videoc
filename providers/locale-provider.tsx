import { Locale, i18n } from '@/i18n.config';
import React, { createContext, useState } from 'react';

// Create the LocaleContext
export const LocaleContext = createContext<{
  locale: Locale;
  updateLocale: (newLocale: Locale) => void,
  dictionary: Record<string, any>
}>({
  locale: i18n.defaultLocale,
  updateLocale: () => { },
  dictionary: {}
});

// Create the LocaleProvider component
export const LocaleProvider: React.FC<{
  children: React.ReactNode,
  dictionary: Record<string, any>
}> = ({ children, dictionary }) => {
  const [locale, setLocale] = useState<Locale>(i18n.defaultLocale)

  // Function to update the locale
  const updateLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, updateLocale, dictionary: dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
};
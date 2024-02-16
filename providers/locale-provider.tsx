import { Locale, i18n } from '@/i18n.config';
import React, { createContext, useState } from 'react';

// Create the LocaleContext
export const LocaleContext = createContext<{ locale: Locale; updateLocale: (newLocale: Locale) => void }>({
  locale: i18n.defaultLocale,
  updateLocale: () => { },
});

// Create the LocaleProvider component
export const LocaleProvider: React.FC<{ children: React.ReactNode, defaultLocale: Locale }> = ({ children, defaultLocale }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  // Function to update the locale
  const updateLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, updateLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
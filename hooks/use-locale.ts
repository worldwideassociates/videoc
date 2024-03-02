import { LocaleContext } from '@/providers/locale-provider';
import { useContext } from 'react';

const useLocale = () => {
  const context = useContext(LocaleContext);

  return context;
};

export default useLocale;
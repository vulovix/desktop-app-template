import { JSX, useState } from 'react';

import { IntlProvider } from 'react-intl';
import LanguageProviderContext from './context';
import { LanguageProviderProps } from './types';

export const LanguageProvider = (props: LanguageProviderProps): JSX.Element => {
  const { children, defaultLocale, messages, locale: _locale, ...restIntlProps } = props;
  const [locale, setLocale] = useState(defaultLocale);
  return (
    <LanguageProviderContext.Provider
      value={{
        locale,
        setLocale,
      }}
    >
      <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={defaultLocale} {...restIntlProps}>
        {children}
      </IntlProvider>
    </LanguageProviderContext.Provider>
  );
};

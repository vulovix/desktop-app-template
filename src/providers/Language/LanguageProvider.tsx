import { createContext, JSX, useState } from "react";

import { IntlProvider } from "react-intl";

import { ILanguageProviderContext, LanguageProviderProps } from "./types";

export const LanguageProviderContext = createContext<ILanguageProviderContext | null>(null);

export const LanguageProvider = (props: LanguageProviderProps): JSX.Element => {
  const { children, defaultLocale, messages, locale: _locale, ...restIntlProps } = props;
  const [locale, setLocale] = useState(defaultLocale);
  return (
    <LanguageProviderContext
      value={{
        locale,
        setLocale,
      }}
    >
      <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={defaultLocale} {...restIntlProps}>
        {children}
      </IntlProvider>
    </LanguageProviderContext>
  );
};

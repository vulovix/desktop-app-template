import { PropsWithChildren } from 'react';
import { IntlProvider as IntlProviderOriginal, MessageFormatElement } from 'react-intl';

type ILanguageProviderProps = Omit<React.ComponentProps<typeof IntlProviderOriginal>, 'messages'>;

export interface LanguageProviderProps extends PropsWithChildren<ILanguageProviderProps> {
  defaultLocale: string;
  messages: Record<string, Record<string, string>> | Record<string, Record<string, MessageFormatElement[]>>;
}

export interface ILanguageProviderContext {
  locale: string;
  setLocale(locale: string): void;
}

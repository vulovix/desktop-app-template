import { useContext } from 'react';

import { IntlShape, useIntl } from 'react-intl';
import LanguageProviderContext from './context';
import { ILanguageProviderContext } from './types';

export function useLanguageProvider(): ILanguageProviderContext & IntlShape {
  const context = useContext(LanguageProviderContext);

  if (!context) {
    throw new Error('You are using useLanguageProvider outside of LanguageProvider scope.');
  }

  const intl = useIntl();

  return { ...context, ...intl };
}

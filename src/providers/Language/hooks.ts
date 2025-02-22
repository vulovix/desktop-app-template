import { useContext } from "react";

import { IntlShape, useIntl } from "react-intl";
import { ILanguageProviderContext } from "./types";
import { LanguageProviderContext } from "./LanguageProvider";

export function useLanguageProvider(): ILanguageProviderContext & IntlShape {
  const context = useContext(LanguageProviderContext);

  if (!context) {
    throw new Error("You are using useLanguageProvider outside of LanguageProvider scope.");
  }

  const intl = useIntl();

  return { ...context, ...intl };
}

export function useTranslate() {
  const { $t } = useLanguageProvider();

  return (translationId: string) => $t({ id: translationId });
}

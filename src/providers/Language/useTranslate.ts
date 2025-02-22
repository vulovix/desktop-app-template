import { useLanguageProvider } from './useLanguageProvider';

export function useTranslate() {
  const { $t } = useLanguageProvider();

  return (translationId: string) => $t({ id: translationId });
}

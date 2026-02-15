import { defaultLocale, type Locale, type Translations } from './constants';
import en from './locales/en.json';
import es from './locales/es.json';

const translations: Record<Locale, Translations> = { en, es };

export function useTranslations(locale: Locale): Translations {
  return translations[locale];
}

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return defaultLocale;
}

export function getLocalizedUrl(locale: Locale, path: string = ''): string {
  return locale === defaultLocale ? `/${path}` : `/${locale}/${path}`;
}

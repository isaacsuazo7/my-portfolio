import en from './locales/en.json';

export type Translations = typeof en;
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

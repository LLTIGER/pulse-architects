import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'fr'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

// Get locale from various sources with fallback
export function getLocale(): Locale {
  // Try to get from localStorage (client-side)
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('preferred-locale') as Locale;
    if (stored && locales.includes(stored)) {
      return stored;
    }
  }

  // Try to get from browser language
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0] as Locale;
    if (locales.includes(browserLang)) {
      return browserLang;
    }
  }

  return defaultLocale;
}

export default getRequestConfig(async () => {
  // Get the current locale
  const locale = getLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'Europe/Paris'
  };
});
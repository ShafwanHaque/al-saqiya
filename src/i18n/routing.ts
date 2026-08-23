import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'bn'],
  defaultLocale: 'en',
  localePrefix: 'always', // every URL gets /en or /bn
});

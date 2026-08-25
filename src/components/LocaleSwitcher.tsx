'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale = routing.locales.find((l) => l !== locale);

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: otherLocale })}
      className="shrink-0 whitespace-nowrap text-xs sm:text-sm font-medium tracking-wide border border-neutral-300 rounded-full px-2.5 py-1 sm:px-3 hover:border-neutral-500 transition-colors bg-white"
    >
      {locale === 'en' ? 'বাংলা' : 'English'}
    </button>
  );
}
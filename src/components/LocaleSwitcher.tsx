'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (targetLocale: string) => {
    if (targetLocale === locale) return;
    router.replace(pathname, { locale: targetLocale });
  };

  const isEn = locale === 'en';

  return (
    <div
      role="group"
      aria-label="Language Switcher"
      className="relative shrink-0 inline-flex items-center bg-neutral-100 p-1 rounded-full border border-neutral-200 shadow-inner select-none"
    >
      {/* Animated Sliding Pill */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#004D40] shadow-sm transition-transform duration-300 ease-out ${
          isEn ? 'translate-x-0' : 'translate-x-full'
        }`}
      />

      {/* English Option */}
      <button
        type="button"
        onClick={() => handleSwitch('en')}
        className={`relative z-10 px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 min-w-[42px] text-center ${
          isEn ? 'text-[#D4AF37]' : 'text-neutral-600 hover:text-neutral-900'
        }`}
      >
        EN
      </button>

      {/* Bangla Option */}
      <button
        type="button"
        onClick={() => handleSwitch('bn')}
        className={`relative z-10 px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 min-w-[42px] text-center ${
          !isEn ? 'text-[#D4AF37]' : 'text-neutral-600 hover:text-neutral-900'
        }`}
      >
        বাং
      </button>
    </div>
  );
}
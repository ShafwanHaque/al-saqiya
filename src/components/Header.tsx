import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const t = useTranslations('nav');

  return (
    <header className="w-full border-b border-neutral-200 bg-[#004D40]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-serif tracking-wide text-[#D4AF37]">
          Al-Saqiya
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/packages"
            className="nav-button"
          >
            {t('packages')}
          </Link>
          <span className='nav-divider'>|</span>
          <Link
            href="/hajj-umrah"
            className="nav-button"
          >
            {t('hajjUmrah')}
          </Link>
          <span className='nav-divider'>|</span>
          <Link
            href="/contact-us"
            className="nav-button"
          >
            {t('contact')}
          </Link>
        </nav>

        {/* Right side: CTA + language toggle */}
        <div className="flex items-center gap-4">
          <LocaleSwitcher />

          <Link
            href="/contact-us"
            className="hidden sm:inline-block text-sm font-semibold bg-neutral-900 text-white px-5 py-2 rounded-full hover:bg-neutral-700 transition-colors"
          >
            {t('planTrip')}
          </Link>
        </div>
      </div>
    </header>
  );
}
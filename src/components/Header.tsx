import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-[#004D40]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center" // Ensure good alignment
        >
          <Image
            src="/logo.png"
            alt="Al-Saqiya"
            width={189}
            height={50}
            priority
            className="h-[50px] w-auto object-contain"
          />
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/packages" className="nav-button">
            {t("packages")}
          </Link>
          <span className="nav-divider">|</span>
          <Link href="/hajj-umrah" className="nav-button">
            {t("hajjUmrah")}
          </Link>
          <span className="nav-divider">|</span>
          <Link href="/contact-us" className="nav-button">
            {t("contact")}
          </Link>
        </nav>

        {/* Right side: CTA + language toggle */}
        <div className="flex items-center gap-4">
          <LocaleSwitcher />

          <Link href="/contact-us" className="primary-button">
            {t("planTrip")}
          </Link>
        </div>
      </div>
    </header>
  );
}

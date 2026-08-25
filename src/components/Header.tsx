'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/packages", label: t("packages") },
    { href: "/hajj-umrah", label: t("hajjUmrah") },
    { href: "/contact-us", label: t("contact") },
  ];

  return (

    <header className="w-full border-b border-neutral-200 bg-[#004D40]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 shrink items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Al-Saqiya"
            width={189}
            height={50}
            priority
            className="h-8 w-auto object-contain sm:h-10 md:h-[50px]"
          />
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map(({ href, label }, i) => (
            <span key={href} className="flex items-center gap-6 lg:gap-8">
              <Link href={href} className="nav-button">
                {label}
              </Link>
              {i < links.length - 1 && <span className="nav-divider">|</span>}
            </span>
          ))}
        </nav>

        {/* Right side: CTA + language toggle */}
        <div className="hidden md:flex items-center gap-4">
          <LocaleSwitcher />

          <Link href="/contact-us" className="primary-button">
            {t("planTrip")}
          </Link>
        </div>

        {/* Mobile: locale toggle + hamburger */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#D4AF37] transition-colors hover:bg-white/10 sm:h-9 sm:w-9"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-200 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-5 bg-current transition-transform duration-200 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col items-stretch gap-1 border-t border-white/10 px-4 py-4 sm:px-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="nav-button py-2 text-base"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact-us"
            onClick={() => setOpen(false)}
            className="primary-button !inline-block mt-2 text-center"
          >
            {t("planTrip")}
          </Link>
        </nav>
      </div>
    </header>
  );
}

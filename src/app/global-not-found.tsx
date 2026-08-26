// Handles genuinely unmatched URLs for the whole app. Because our root
// layout lives at the [locale] dynamic segment (src/app/[locale]/layout.tsx)
// rather than a single app/layout.tsx, Next.js can't compose a route-level
// not-found page for those requests — this file bypasses normal rendering
// entirely, so it brings its own <html>/<body>, styles, and fonts.
// See: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { bangla } from "@/fonts/bangla";
import { english } from "@/fonts/english";
import enMessages from "../../messages/en.json";
import bnMessages from "../../messages/bn.json";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al Saqiya",
  description:
    "Best Air Ticket and Visa Agency in Chittagong. Specialized in Hajj & Umrah and Hotel Booking.",
};

export default async function GlobalNotFound() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value === "bn" ? "bn" : "en";
  const t = (locale === "bn" ? bnMessages : enMessages).notFound;
  const font = locale === "bn" ? bangla : english;

  return (
    <html lang={locale}>
      <body className={font.className}>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4 py-16 text-center">
          <Image
            src="/logo.png"
            alt="Al-Saqiya"
            width={189}
            height={50}
            className="mb-8 h-10 w-auto object-contain"
          />
          <h1 className="text-2xl font-semibold text-[#004D40] sm:text-3xl">{t.title}</h1>
          <p className="mt-3 max-w-md text-sm text-neutral-600 sm:text-base">{t.description}</p>
          <Link
            href={`/${locale}`}
            className="mt-6 inline-block rounded-full px-5 py-2 text-sm font-semibold text-[#004D40] transition-all duration-300"
            style={{ background: "linear-gradient(to right, #d4af37, #f4e7b3, #d4af37)" }}
          >
            {t.backHome}
          </Link>
        </div>
      </body>
    </html>
  );
}

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { bangla } from "@/fonts/bangla";
import { english } from "@/fonts/english";

export const metadata: Metadata = {
  title: 'Al Saqiya',
  description: 'Best Air Ticket and Visa Agency in Chittagong. Specialized in Hajj & Umrah and Hotel Booking.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body  className={locale === 'bn' ? bangla.className : english.className}>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

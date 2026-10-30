import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, MessageCircle, MoonStar, Sparkles } from "lucide-react";
import { PACKAGES_EN } from "@/assets/assets_en";
import { PACKAGES_BN } from "@/assets/assets_bn";
import { whatsappUrl } from "@/config/contact";

type Package = (typeof PACKAGES_EN)[number] | (typeof PACKAGES_BN)[number];

type FeaturedPackagesProps = {
  /** Hide the "view all" CTA, e.g. when this is already rendered on the packages page itself. */
  showViewAll?: boolean;
};

export default function FeaturedPackages({ showViewAll = true }: FeaturedPackagesProps) {
  const t = useTranslations("home");
  const locale = useLocale();

  // Dynamically select data array based on active locale
  const packages: Package[] = locale === "bn" ? PACKAGES_BN : PACKAGES_EN;
  const featured = packages.filter((pkg) => pkg.featured);
  const others = packages.filter((pkg) => !pkg.featured);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif text-[#004D40] mb-3">
          {t("packagesTitle")}
        </h2>
        <p className="text-neutral-500 max-w-xl mx-auto">
          {t("packagesSubtitle")}
        </p>
      </div>

      {/* Hajj & Umrah are the main focus, so they lead in a larger two-up row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {featured.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} isFeatured />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {others.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      {showViewAll && (
        <div className="text-center mt-12">
          <Link href="/packages" className="primary-button">
            {t("viewAll")}
          </Link>
        </div>
      )}

      {/* Custom-trip prompt: most clients don't fit a fixed package */}
      <div className="mt-14 flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br from-[#004D40] to-[#00110d] px-6 py-10 text-center sm:px-10 lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-xl">
          <h3 className="text-2xl font-serif text-[#F4E7B3] mb-2">
            {t("customTitle")}
          </h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {t("customDescription")}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:shrink-0">
          <Link href="/#contact" className="carousel-cta-button justify-center">
            <span>{t("customCta")}</span>
          </Link>
          <a
            href={whatsappUrl(t("customMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/50 px-6 py-3.5 text-sm font-bold text-[#F4E7B3] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] sm:text-base"
          >
            <MessageCircle size={16} aria-hidden="true" />
            {t("customWhatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg, isFeatured = false }: { pkg: Package; isFeatured?: boolean }) {
  const t = useTranslations("home");

  return (
    <article
      className={`group flex flex-col rounded-2xl overflow-hidden border bg-white transition-shadow hover:shadow-xl hover:shadow-[#004D40]/10 ${
        isFeatured ? "border-[#D4AF37]/40" : "border-neutral-200"
      }`}
    >
      <Link
        href={`/packages/${pkg.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative block w-full overflow-hidden bg-[#004D40] ${
          isFeatured ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={pkg.image}
          alt=""
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
        {/* Same dark-teal wash as the hero so photos read as one brand set */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00110d]/60 via-transparent to-transparent" />
        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${
            isFeatured
              ? "border-[#D4AF37] bg-[#D4AF37]/90 text-[#004D40]"
              : "border-[#D4AF37]/40 bg-[#004D40]/70 text-[#F4E7B3]"
          }`}
        >
          {isFeatured ? <MoonStar size={12} aria-hidden="true" /> : <Sparkles size={12} aria-hidden="true" />}
          {isFeatured ? t("sacredJourney") : t("tailorMade")}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className={`font-serif font-semibold text-[#004D40] mb-2 ${isFeatured ? "text-2xl" : "text-xl"}`}>
          <Link
            href={`/packages/${pkg.id}`}
            className="rounded-sm hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            {pkg.title}
          </Link>
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-5">
          {pkg.summary}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-dashed border-neutral-200 pt-4 mb-5">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
            {t("price")}
          </span>
          <span className="rounded-full bg-[#D4AF37]/15 px-3 py-1 text-sm font-semibold text-[#004D40]">
            {t("negotiable")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href={`/packages/${pkg.id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#004D40]/20 px-4 py-2.5 text-sm font-semibold text-[#004D40] transition-colors hover:border-[#004D40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            {t("viewDetails")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <a
            href={whatsappUrl(t("quoteMessage", { title: pkg.title }))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#004D40] px-4 py-2.5 text-sm font-semibold text-[#F4E7B3] transition-colors hover:bg-[#00695C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
          >
            <MessageCircle size={14} aria-hidden="true" />
            {t("getQuote")}
          </a>
        </div>
      </div>
    </article>
  );
}

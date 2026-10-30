// src/app/[locale]/packages/[id]/page.tsx
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { PACKAGES_EN } from "@/assets/assets_en";
import { PACKAGES_BN } from "@/assets/assets_bn";
import { whatsappUrl } from "@/config/contact";

type PackageDetailsProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function PackageDetails({ params }: PackageDetailsProps) {
  // Await params for Next.js 15+
  const { id, locale } = await params;
  const t = await getTranslations("packageDetails");
  const tHome = await getTranslations("home");

  // Select language dynamically based on locale
  const packages = locale === "bn" ? PACKAGES_BN : PACKAGES_EN;
  const pkg = packages.find((item) => String(item.id) === id);

  if (!pkg) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/packages"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#004D40] hover:text-[#D4AF37] transition-colors mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
      >
        <ArrowLeft size={16} />
        {t("back")}
      </Link>

      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-neutral-100 mb-8">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          preload
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <h1 className="text-4xl font-serif text-[#004D40] mb-2">{pkg.title}</h1>
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#D4AF37]/30 bg-[#F8F6F0] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-500">
            {tHome("price")}:{" "}
            <span className="text-lg font-semibold text-[#004D40]">{tHome("negotiable")}</span>
          </p>
          <p className="mt-1 text-sm text-neutral-500">{t("negotiableNote")}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl(tHome("quoteMessage", { title: pkg.title }))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#004D40] px-5 py-2.5 text-sm font-semibold text-[#F4E7B3] transition-colors hover:bg-[#00695C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
          >
            <MessageCircle size={14} aria-hidden="true" />
            {tHome("getQuote")}
          </a>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full border border-[#004D40]/20 px-5 py-2.5 text-sm font-semibold text-[#004D40] transition-colors hover:border-[#004D40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            {t("planCustom")}
          </Link>
        </div>
      </div>

      {/* Render the HTML description */}
      <div
        className="prose max-w-none text-neutral-700"
        dangerouslySetInnerHTML={{ __html: pkg.description }}
      />
    </article>
  );
}

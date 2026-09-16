// src/app/[locale]/packages/[id]/page.tsx
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { PACKAGES_EN } from "@/assets/assets_en";
import { PACKAGES_BN } from "@/assets/assets_bn";

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

  // Select language dynamically based on locale
  const packages = locale === "bn" ? PACKAGES_BN : PACKAGES_EN;
  const pkg = packages.find((item) => item.id === Number(id));

  if (!pkg) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-serif text-[#004D40] sm:text-3xl">{t("notFoundTitle")}</h1>
        <p className="mt-3 text-sm text-neutral-600 sm:text-base">{t("notFoundDescription")}</p>
        <Link
          href="/packages"
          className="mt-6 inline-block text-sm font-semibold text-[#004D40] px-5 py-2 rounded-full transition-all duration-300"
          style={{ background: "linear-gradient(to right, #d4af37, #f4e7b3, #d4af37)" }}
        >
          {t("browsePackages")}
        </Link>
      </div>
    );
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
          priority
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <h1 className="text-4xl font-serif text-[#004D40] mb-2">{pkg.title}</h1>
      <p className="text-xl text-[#D4AF37] font-semibold mb-6">{pkg.price}</p>

      {/* Render the HTML description */}
      <div
        className="prose max-w-none text-neutral-700"
        dangerouslySetInnerHTML={{ __html: pkg.description }}
      />
    </article>
  );
}

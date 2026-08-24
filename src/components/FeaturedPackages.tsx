import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { PACKAGES } from "@/assets/assets";

export default function FeaturedPackages() {
  const t = useTranslations("home");

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="group rounded-lg overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow bg-white"
          >
            <Link href="/packages">
              <div className="relative w-full aspect-4/3 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                  {pkg.title}
                </h3>
                <p className="text-sm text-neutral-500 mb-4">
                  {t("startingFrom")}{" "}
                  <span className="font-semibold text-[#004D40]">
                    {pkg.price}
                  </span>
                </p>
                <span className="inline-block text-sm font-semibold text-[#D4AF37] hover:text-[#004D40] transition-colors">
                  {t("viewDetails")} →
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/packages" className="primary-button">
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}

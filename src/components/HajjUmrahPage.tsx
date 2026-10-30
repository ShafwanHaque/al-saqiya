import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

type PackageCard = {
  key: "hajj" | "umrah";
  image: string;
};

const CARDS: PackageCard[] = [
  { key: "hajj", image: "/carousel/hajj-umrah-hero.png" },
  { key: "umrah", image: "/carousel/hajj_umrah.jpeg" },
];

export default function HajjUmrahPage() {
  const t = useTranslations("hajjUmrah");
  const tHome = useTranslations("home");

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
          {t("eyebrow")}
        </span>
        <h1 className="mt-3 text-3xl font-serif text-[#004D40] mb-3">
          {t("title")}
        </h1>
        <p className="text-neutral-500 max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CARDS.map((card) => {
          const features = t.raw(`${card.key}.features`) as string[];

          return (
            <div
              key={card.key}
              className="group rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow bg-white flex flex-col"
            >
              <div className="relative w-full aspect-4/3 overflow-hidden bg-neutral-100">
                <Image
                  src={card.image}
                  alt={t(`${card.key}.title`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-7 flex flex-col flex-1">
                <h2 className="text-2xl font-serif text-[#004D40] mb-2">
                  {t(`${card.key}.title`)}
                </h2>
                <p className="text-sm text-neutral-500 mb-5">
                  {t(`${card.key}.description`)}
                </p>

                <ul className="space-y-3 mb-7">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-neutral-700">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    href={`/packages/${card.key}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#004D40]/20 px-5 py-2 text-sm font-semibold text-[#004D40] transition-colors hover:border-[#004D40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    {tHome("viewDetails")}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link href="/#contact" className="primary-button !inline-block text-center">
                    {t(`${card.key}.cta`)}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

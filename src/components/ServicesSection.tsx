import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check, Compass, MoonStar, Plane, type LucideIcon } from "lucide-react";
import { whatsappUrl } from "@/config/contact";

type Service = {
  key: "air" | "hajj" | "tours";
  icon: LucideIcon;
  /** Internal route, or null to open WhatsApp with the service's pre-filled message. */
  href: string | null;
  featured?: boolean;
};

const SERVICES: Service[] = [
  { key: "air", icon: Plane, href: null, featured: true },
  { key: "hajj", icon: MoonStar, href: "/hajj-umrah" },
  { key: "tours", icon: Compass, href: "/packages" },
];

export default function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section id="services" className="scroll-mt-20 bg-[#F8F6F0] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-serif text-[#004D40] mb-3">
            {t("title")}
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map(({ key, icon: Icon, href, featured }) => {
            const features = t.raw(`${key}.features`) as string[];
            const ctaClass = `mt-auto inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 ${
              featured
                ? "bg-gradient-to-r from-[#D4AF37] via-[#F4E7B3] to-[#D4AF37] text-[#004D40] focus-visible:ring-offset-[#004D40]"
                : "border border-[#004D40]/20 text-[#004D40] hover:border-[#004D40]"
            }`;

            return (
              <article
                key={key}
                className={`relative flex flex-col rounded-2xl p-7 transition-shadow hover:shadow-xl ${
                  featured
                    ? "bg-gradient-to-br from-[#004D40] to-[#00110d] text-white shadow-lg shadow-[#004D40]/20 hover:shadow-[#004D40]/30"
                    : "border border-neutral-200 bg-white hover:shadow-[#004D40]/10"
                }`}
              >
                {featured && (
                  <span className="absolute right-5 top-5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-3 py-1 text-xs font-semibold text-[#F4E7B3]">
                    {t("specialty")}
                  </span>
                )}

                <span
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full border ${
                    featured
                      ? "border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#D4AF37]"
                      : "border-[#D4AF37]/40 bg-[#004D40] text-[#D4AF37]"
                  }`}
                >
                  <Icon size={22} aria-hidden="true" />
                </span>

                <h3 className={`text-2xl font-serif mb-2 ${featured ? "text-[#F4E7B3]" : "text-[#004D40]"}`}>
                  {t(`${key}.title`)}
                </h3>
                <p className={`text-sm leading-relaxed mb-5 ${featured ? "text-neutral-300" : "text-neutral-500"}`}>
                  {t(`${key}.description`)}
                </p>

                <ul className="space-y-2.5 mb-7">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2.5 text-sm ${featured ? "text-neutral-200" : "text-neutral-700"}`}
                    >
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {href ? (
                  <Link href={href} className={ctaClass}>
                    {t(`${key}.cta`)}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ) : (
                  <a
                    href={whatsappUrl(t(`${key}.message`))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaClass}
                  >
                    {t(`${key}.cta`)}
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

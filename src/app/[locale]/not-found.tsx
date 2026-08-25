import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24">
      <h1 className="text-2xl font-semibold text-[#004D40] sm:text-3xl">{t("title")}</h1>
      <p className="mt-3 text-sm text-neutral-600 sm:text-base">{t("description")}</p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-semibold text-[#004D40] px-5 py-2 rounded-full transition-all duration-300"
        style={{ background: 'linear-gradient(to right, #d4af37, #f4e7b3, #d4af37)' }}
      >
        {t("backHome")}
      </Link>
    </div>
  );
}

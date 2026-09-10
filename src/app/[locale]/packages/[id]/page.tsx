// src/app/[locale]/packages/[id]/page.tsx
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

  // Select language dynamically based on locale
  const packages = locale === "bn" ? PACKAGES_BN : PACKAGES_EN;
  const pkg = packages.find((item) => item.id === Number(id));

  if (!pkg) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        Package not found
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
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
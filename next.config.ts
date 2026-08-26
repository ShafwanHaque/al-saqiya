import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Our root layout lives at the [locale] segment (no single app/layout.tsx),
  // so Next.js can't compose a route-level not-found page for genuinely
  // unmatched URLs — see node_modules/next/dist/docs/.../not-found.md.
  // global-not-found.tsx (app root) handles that case instead.
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
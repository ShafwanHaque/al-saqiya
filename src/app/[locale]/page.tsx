import ContactSection from '@/components/ContactSection';
import FeaturedPackages from '@/components/FeaturedPackages';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <FeaturedPackages />
      <ContactSection />
    </>
  );
}
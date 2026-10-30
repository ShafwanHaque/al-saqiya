import ContactSection from '@/components/ContactSection';
import FeaturedPackages from '@/components/FeaturedPackages';
import HeroCarousel from '@/components/HeroCarousel';
import ReviewsSection from '@/components/ReviewsSection';
import ServicesSection from '@/components/ServicesSection';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <ServicesSection />
      <FeaturedPackages />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
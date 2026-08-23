'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

const SLIDES = [
  { id: 1, src: 'https://picsum.photos/1600/900?random=1', alt: 'Destination 1' },
  { id: 2, src: 'https://picsum.photos/1600/900?random=2', alt: 'Destination 2' },
  { id: 3, src: 'https://picsum.photos/1600/900?random=3', alt: 'Destination 3' },
  { id: 4, src: 'https://picsum.photos/1600/900?random=4', alt: 'Destination 4' },
  { id: 5, src: 'https://picsum.photos/1600/900?random=5', alt: 'Destination 5' },
];

const AUTO_ADVANCE_MS = 5000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = () => {
    setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-[70vh] min-h-[420px] overflow-hidden bg-[#004D40]">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === active ? 'bg-[#D4AF37] w-6' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
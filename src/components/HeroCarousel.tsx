"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  {
    id: 1,
    src: "https://picsum.photos/1600/900?random=1",
    alt: "Destination 1",
  },
  {
    id: 2,
    src: "https://picsum.photos/1600/900?random=2",
    alt: "Destination 2",
  },
  {
    id: 3,
    src: "https://picsum.photos/1600/900?random=3",
    alt: "Destination 3",
  },
  {
    id: 4,
    src: "https://picsum.photos/1600/900?random=4",
    alt: "Destination 4",
  },
  {
    id: 5,
    src: "https://picsum.photos/1600/900?random=5",
    alt: "Destination 5",
  },
];

const AUTO_ADVANCE_MS = 5000;

// Shortest circular distance from `active`, e.g. for 5 slides: -2, -1, 0, 1, 2
function getOffset(index: number, active: number, total: number) {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const total = SLIDES.length;

  const next = useCallback(() => {
    setActive((i) => (i + 1) % total);
  }, [total]);

  const prev = () => {
    setActive((i) => (i - 1 + total) % total);
  };

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-[70vh] min-h-105 overflow-hidden flex items-center justify-center">
      {SLIDES.map((slide, i) => {
        const offset = getOffset(i, active, total);
        const isCenter = offset === 0;
        const isVisible = Math.abs(offset) <= 1; // only show center + immediate neighbors

        return (
          <div
            key={slide.id}
            aria-hidden={!isCenter}
            className={`absolute top-1/2 left-1/2 w-[80%] sm:w-[65%] lg:w-[55%] h-full transition-all duration-700 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              transform: `translate(-50%, -50%) translateX(${offset * 58}%)`,
              zIndex: isCenter ? 20 : 10,
            }}
          >
            <div
              className={`relative w-full h-full overflow-hidden shadow-2xl transition-all duration-700 ${
                isCenter ? "" : "blur-[3px]"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 65vw, 55vw"
              />
              {!isCenter && (
                <div className="absolute inset-0 bg-[#004D40]/45" />
              )}
            </div>
          </div>
        );
      })}

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-50 top-1/2 -translate-y-1/2 z-30 w-10 h-20 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-50 top-1/2 -translate-y-1/2 z-30 w-10 h-20 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === active
                ? "bg-[#D4AF37] w-6"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

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

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = SLIDES.length;

  const next = useCallback(() => {
    setActive((i) => (i + 1) % total);
  }, [total]);

  const prev = () => {
    setActive((i) => (i - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <div
      className="group relative w-full h-[62vh] min-h-[320px] overflow-hidden bg-[#004D40] sm:h-[75vh] sm:min-h-[460px] lg:h-[88vh] lg:min-h-[560px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {SLIDES.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <div
              key={isActive ? `zoom-active-${active}` : `zoom-idle-${i}`}
              className="absolute inset-0 [animation-fill-mode:forwards] [animation-name:hero-kenburns] [animation-timing-function:ease-out]"
              style={{
                animationDuration: `${AUTO_ADVANCE_MS + 1500}ms`,
                animationPlayState: isActive && isPaused ? "paused" : "running",
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
            {/* Brand-tinted gradient for legible controls + a richer, less flat look */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00110d]/75 via-[#00110d]/10 to-[#00110d]/40" />
          </div>
        );
      })}

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:scale-105 active:scale-95 sm:left-5 sm:h-11 sm:w-11 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:scale-105 active:scale-95 sm:right-5 sm:h-11 sm:w-11 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Bottom bar: progress-style slide indicators */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-2 sm:bottom-7 sm:gap-2.5">
        {SLIDES.map((slide, i) => {
          const isActive = i === active;
          const isPassed = i < active;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-1.5 w-7 overflow-hidden rounded-full bg-white/25 transition-colors hover:bg-white/40 sm:w-9"
            >
              <span
                key={isActive ? `fill-active-${active}` : `fill-idle-${i}`}
                className={
                  isActive
                    ? "absolute inset-y-0 left-0 rounded-full bg-[#D4AF37] [animation-fill-mode:forwards] [animation-name:hero-fill] [animation-timing-function:linear]"
                    : "absolute inset-y-0 left-0 rounded-full bg-[#D4AF37]"
                }
                style={
                  isActive
                    ? {
                        animationDuration: `${AUTO_ADVANCE_MS}ms`,
                        animationPlayState: isPaused ? "paused" : "running",
                      }
                    : { width: isPassed ? "100%" : "0%" }
                }
              />
            </button>
          );
        })}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-5 right-4 z-20 hidden text-xs font-semibold tracking-[0.2em] text-white/80 sm:block sm:right-6 sm:bottom-7">
        <span className="text-[#D4AF37]">{String(active + 1).padStart(2, "0")}</span>
        <span className="mx-1 text-white/50">/</span>
        <span>{String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

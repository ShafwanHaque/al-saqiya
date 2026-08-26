"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CAROUSEL_EN } from "@/assets/assets_en";
import { CAROUSEL_BN } from "@/assets/assets_bn";

const AUTO_ADVANCE_MS = 5000;

export default function HeroCarousel() {
  const locale = useLocale();
  const slides = locale === "bn" ? CAROUSEL_BN : CAROUSEL_EN;

  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = slides.length;

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
      className="group relative w-full h-[62vh] min-h-[420px] overflow-hidden bg-[#004D40] sm:h-[75vh] sm:min-h-[500px] lg:h-[88vh] lg:min-h-[600px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"
            }`}
          >
            {/* Background Zooming Image */}
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

            {/* Dark contrast gradient for readable text and controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00110d]/90 via-[#00110d]/40 to-[#00110d]/30" />

            {/* Slide Text Content & Dynamic Interactive CTA */}
            <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-6">
              <div
                className={`max-w-3xl transition-all duration-700 ease-out transform ${
                  isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                {slide.tagline && (
                  <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-2 bg-[#004D40]/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
                    {slide.tagline}
                  </span>
                )}
                
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight mb-3 sm:mb-4 drop-shadow-md">
                  {slide.title}
                </h1>
                
                {slide.description && (
                  <p className="text-sm sm:text-base lg:text-lg text-neutral-200 max-w-xl mx-auto mb-6 sm:mb-8 font-light leading-relaxed">
                    {slide.description}
                  </p>
                )}

                {slide.ctaText && (
                  <div>
                    <Link href={slide.ctaLink || "/packages"} className="carousel-cta-button">
                      <span>{slide.ctaText}</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev / Next Arrows */}
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

      {/* Bottom Progress Bars */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-2 sm:bottom-7 sm:gap-2.5">
        {slides.map((slide, i) => {
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

      {/* Counter */}
      <div className="absolute bottom-5 right-4 z-20 hidden text-xs font-semibold tracking-[0.2em] text-white/80 sm:block sm:right-6 sm:bottom-7">
        <span className="text-[#D4AF37]">{String(active + 1).padStart(2, "0")}</span>
        <span className="mx-1 text-white/50">/</span>
        <span>{String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
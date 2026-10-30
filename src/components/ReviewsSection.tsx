"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, MapPin, MessageCircle, Quote, Star, X } from "lucide-react";
import { REVIEWS_EN } from "@/assets/assets_en";
import { REVIEWS_BN } from "@/assets/assets_bn";
import { whatsappUrl } from "@/config/contact";

type Review = (typeof REVIEWS_EN)[number] | (typeof REVIEWS_BN)[number];

// Sample reviews exist only to preview the design; real sites must never show invented feedback.
const SHOW_SAMPLES = process.env.NODE_ENV !== "production";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => Array.from(word)[0])
    .join("");
}

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="flex items-center gap-1" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          aria-hidden="true"
          className={i < rating ? "text-[#D4AF37]" : "text-white/20"}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

export default function ReviewsSection() {
  const t = useTranslations("reviews");
  const locale = useLocale();

  const reviews: Review[] = (locale === "bn" ? REVIEWS_BN : REVIEWS_EN).filter(
    (review) => SHOW_SAMPLES || !review.sample
  );

  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Review | null>(null);

  // The card closest to the centre of the track is the one "in focus".
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let best = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const card = child as HTMLElement;
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (distance < best) {
          best = distance;
          closest = i;
        }
      });
      setActive(closest);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (selected) dialogRef.current?.showModal();
  }, [selected]);

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  if (reviews.length === 0) return null;

  return (
    <section
      id="reviews"
      className="scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#004D40] via-[#003d33] to-[#00110d] py-20"
    >
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
          {t("eyebrow")}
        </span>
        <h2 className="mt-3 text-3xl font-serif text-[#F4E7B3] mb-3">
          {t("title")}
        </h2>
        <p className="text-neutral-300 max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Edge-to-edge track; side padding lets the first and last cards reach the centre */}
      <ul
        ref={trackRef}
        aria-label={t("reviewsLabel")}
        className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto py-4 px-[calc(50%-var(--card)/2)] [--card:80vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:[--card:24rem] sm:gap-6 lg:[--card:26rem] lg:gap-8"
      >
        {reviews.map((review, i) => {
          const isActive = i === active;
          return (
            <li key={review.id} className="w-[var(--card)] shrink-0 snap-center">
              <figure
                className={`relative flex h-full flex-col rounded-2xl border bg-white/[0.06] p-7 backdrop-blur-sm transition-all duration-500 ${
                  isActive
                    ? "scale-100 border-[#D4AF37]/50 opacity-100 shadow-2xl shadow-black/30"
                    : "scale-95 border-[#D4AF37]/20 opacity-50"
                }`}
              >
                <Quote
                  size={36}
                  aria-hidden="true"
                  className="absolute right-6 top-6 text-[#D4AF37]/25"
                  fill="currentColor"
                  strokeWidth={0}
                />

                <div className="mb-4 flex items-center gap-2">
                  <Stars rating={review.rating} label={t("rating", { rating: review.rating })} />
                  {review.sample && (
                    <span className="rounded-full border border-dashed border-white/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                      {t("sample")}
                    </span>
                  )}
                </div>

                <blockquote className="mb-4 line-clamp-5 text-sm leading-relaxed text-neutral-200 sm:text-base">
                  “{review.quote}”
                </blockquote>

                {/* The pseudo-element stretches this button over the whole card */}
                <button
                  type="button"
                  onClick={() => setSelected(review)}
                  onFocus={() => scrollToCard(i)}
                  className="mb-6 mt-auto inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#D4AF37] transition-colors hover:text-[#F4E7B3] after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#D4AF37]"
                >
                  {t("readMore")}
                  <ArrowRight size={14} aria-hidden="true" />
                </button>

                <figcaption className="flex items-center gap-3 border-t border-white/10 pt-5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#004D40] font-serif text-sm font-bold text-[#F4E7B3]"
                  >
                    {initials(review.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="flex flex-wrap items-center gap-x-2 text-xs text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} aria-hidden="true" />
                        {review.location}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#D4AF37]">{review.service}</span>
                    </p>
                  </div>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      {/* Dots: show which review is in focus and jump to any of them */}
      <div className="mt-6 flex items-center justify-center gap-1">
        {reviews.map((review, i) => (
          <button
            key={review.id}
            type="button"
            onClick={() => scrollToCard(i)}
            aria-label={t("showReview", { number: i + 1 })}
            aria-current={i === active}
            className="group/dot p-1.5 focus-visible:outline-none"
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-[#D4AF37] group-focus-visible/dot:ring-offset-2 group-focus-visible/dot:ring-offset-[#003d33] ${
                i === active ? "w-8 bg-[#D4AF37]" : "w-2.5 bg-white/30 group-hover/dot:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 flex flex-col items-center gap-4 text-center">
        <div>
          <h3 className="text-xl font-serif text-[#F4E7B3] mb-1">
            {t("shareTitle")}
          </h3>
          <p className="text-sm text-neutral-300 max-w-lg">
            {t("shareDescription")}
          </p>
        </div>
        <a
          href={whatsappUrl(t("shareMessage"))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/50 px-6 py-3 text-sm font-bold text-[#F4E7B3] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <MessageCircle size={16} aria-hidden="true" />
          {t("shareCta")}
        </a>
      </div>

      {/* Full review; the native dialog handles focus trapping and Esc */}
      <dialog
        ref={dialogRef}
        aria-labelledby="review-dialog-title"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          // A click on the dialog element itself (not its content) is a backdrop click.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-[min(92vw,40rem)] max-h-[85vh] rounded-2xl bg-transparent p-0 backdrop:bg-[#00110d]/75 backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div className="relative max-h-[85vh] overflow-y-auto rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#004D40] to-[#00110d] p-7 text-white sm:p-9">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={t("close")}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="mb-6 flex items-center gap-4 pr-10">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#004D40] font-serif text-base font-bold text-[#F4E7B3]"
              >
                {initials(selected.name)}
              </span>
              <div className="min-w-0">
                <h3 id="review-dialog-title" className="text-xl font-serif font-semibold text-[#F4E7B3]">
                  {selected.name}
                </h3>
                <p className="flex flex-wrap items-center gap-x-2 text-sm text-neutral-400">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} aria-hidden="true" />
                    {selected.location}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#D4AF37]">{selected.service}</span>
                </p>
              </div>
            </div>

            <div className="mb-5 flex items-center gap-2">
              <Stars rating={selected.rating} label={t("rating", { rating: selected.rating })} />
              {selected.sample && (
                <span className="rounded-full border border-dashed border-white/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  {t("sample")}
                </span>
              )}
            </div>

            <blockquote className="mb-7 border-l-2 border-[#D4AF37] pl-4 font-serif text-lg leading-relaxed text-[#F4E7B3]">
              “{selected.quote}”
            </blockquote>

            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              {t("storyHeading")}
            </h4>
            <div className="space-y-4 text-sm leading-relaxed text-neutral-200 sm:text-base">
              {selected.details.split(/\n\s*\n/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

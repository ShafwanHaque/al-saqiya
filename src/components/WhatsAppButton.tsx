import { CONTACT_WHATSAPP_E164 } from "@/config/contact";

const WHATSAPP_URL = `https://wa.me/${CONTACT_WHATSAPP_E164.replace("+", "")}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        right: "max(1rem, env(safe-area-inset-right))",
      }}
      className="fixed z-[60] flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#004D40] text-[#D4AF37] shadow-lg shadow-[#00110d]/25 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 sm:h-14 sm:w-14"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true">
        <path d="M20.25 11.5a8.25 8.25 0 0 1-12.2 7.25L3.75 20l1.25-4.05A8.25 8.25 0 1 1 20.25 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.5" cy="11.5" r=".9" fill="currentColor" />
        <circle cx="12" cy="11.5" r=".9" fill="currentColor" />
        <circle cx="15.5" cy="11.5" r=".9" fill="currentColor" />
      </svg>
    </a>
  );
}

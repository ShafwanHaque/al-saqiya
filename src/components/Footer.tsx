import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const FACEBOOK_URL = "https://facebook.com/yourpage"; // replace with real page URL
const WHATSAPP_URL = "https://wa.me/8801XXXXXXXXX"; // replace with real number, no + or leading 0s after country code

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8.06h2.7l.4-3.14h-3.1V7.86c0-.91.25-1.53 1.56-1.53h1.66V3.51C15.98 3.35 15.03 3.25 13.9 3.25c-2.4 0-4.04 1.47-4.04 4.16v2.5H7.15v3.14h2.71V21h3.64Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.72.9-.89 1.08-.16.19-.33.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.63-1.52-.87-2.08-.23-.55-.46-.47-.63-.48-.16-.01-.35-.01-.54-.01s-.5.07-.76.35c-.26.28-1 .98-1 2.39s1.02 2.77 1.16 2.96c.14.19 2 3.05 4.84 4.28.68.29 1.2.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33Z" />
      <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.96 9.96 0 0 0 12.02 22c5.52 0 10-4.48 10-10S17.54 2 12.02 2Zm0 18.18a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.02.79.8-2.94-.19-.3a8.14 8.14 0 0 1-1.25-4.33c0-4.5 3.66-8.16 8.14-8.16 4.48 0 8.13 3.66 8.13 8.16 0 4.5-3.65 8.1-8.15 8.1Z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="w-full bg-[#004D40] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-4 text-center">
        <Link
          href="/"
          className="text-lg font-serif tracking-wide "
        >
          <Image
                      src="/logo.png"
                      alt="Al-Saqiya"
                      width={189}
                      height={100}
                      priority
                      className="h-[50px] w-auto object-contain"
                    />
        </Link>

        <p className="text-sm text-white/70 max-w-md">{t("tagline")}</p>

        <div className="flex items-center gap-5 mt-2">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#D4AF37] hover:text-white transition-colors"
          >
            <FacebookIcon />
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-[#D4AF37] hover:text-white transition-colors"
          >
            <WhatsAppIcon />
          </a>
        </div>

        <div className="w-full border-t border-white/10 mt-6 pt-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} SKIDOO.{" "}
            {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

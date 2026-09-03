"use client";

import { FormEvent, useState, useRef } from "react";
import { Mail, MapPin, Phone, Clock, ArrowUpRight, ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  const turnstileRef = useRef<TurnstileInstance>(null);
  const t = useTranslations("contact");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // If Turnstile was requested but user hasn't solved it yet
    if (showCaptcha && !turnstileToken) {
      setStatus("Please complete the verification check before submitting.");
      return;
    }

    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      website: formData.get("website"), // Honeypot field
      turnstileToken: turnstileToken ?? undefined,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // Fallback triggered: Server requests Turnstile completion
      if (result.requireCaptcha) {
        setShowCaptcha(true);
        setStatus(result.error);
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        return;
      }

      if (!response.ok) {
        throw new Error(result.error || t("form.error"));
      }

      // Success
      setStatus(t("form.success"));
      setShowCaptcha(false);
      setTurnstileToken(null);
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : t("form.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-[#F8F6F0] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          {/* Left Info Column */}
          <div className="space-y-6">
            <div className="bg-[#004D40] text-white rounded-2xl p-8">
              <h3 className="text-2xl font-serif mb-7">{t("information.title")}</h3>
              <div className="space-y-6">
                <ContactItem icon={<MapPin size={20} />} title={t("information.office")} text={t("information.address")} />
                <ContactItem icon={<Phone size={20} />} title={t("information.phone")} text={t("information.phoneNumber")} href={`tel:${t("information.phoneNumber")}`} />
                <ContactItem icon={<Mail size={20} />} title={t("information.email")} text={t("information.emailAddress")} href={`mailto:${t("information.emailAddress")}`} />
                <ContactItem icon={<Clock size={20} />} title={t("information.hours")} text={t("information.hoursValue")} />
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-7 md:p-9">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot Input (Invisible to real users) */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                  {t("form.name")}
                </label>
                <input id="name" name="name" type="text" required placeholder={t("form.namePlaceholder")} className="contact-input" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                    {t("form.email")}
                  </label>
                  <input id="email" name="email" type="email" required placeholder={t("form.emailPlaceholder")} className="contact-input" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                    {t("form.phone")}
                  </label>
                  <input id="phone" name="phone" type="tel" required placeholder={t("form.phonePlaceholder")} className="contact-input" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
                  {t("form.subject")}
                </label>
                <select id="subject" name="subject" required defaultValue="" className="contact-input">
                  <option value="" disabled>{t("form.subjectPlaceholder")}</option>
                  <option value="Umrah Package">{t("form.subjects.umrah")}</option>
                  <option value="Hajj Package">{t("form.subjects.hajj")}</option>
                  <option value="General Enquiry">{t("form.subjects.general")}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                  {t("form.message")}
                </label>
                <textarea id="message" name="message" required rows={5} placeholder={t("form.messagePlaceholder")} className="contact-input resize-none" />
              </div>

              {/* Dynamic Turnstile Widget */}
              {showCaptcha && (
                <div className="p-4 rounded-xl border border-yellow-200 bg-yellow-50/50 space-y-3">
                  <div className="flex items-center gap-2 text-yellow-800 text-sm font-medium">
                    <ShieldAlert size={18} />
                    <span>Security verification required</span>
                  </div>
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setStatus("Verification widget failed to load.")}
                  />
                </div>
              )}

              {status && (
                <div role="status" className="rounded-lg bg-[#004D40]/5 border border-[#004D40]/10 px-4 py-3 text-sm text-[#004D40]">
                  {status}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#004D40] text-white font-medium hover:bg-[#00382E] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? t("form.sending") : t("form.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, title, text, href }: { icon: React.ReactNode; title: string; text: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-white/10 rounded-xl text-[#D4AF37] shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-semibold tracking-wider uppercase text-white/60">{title}</p>
        <p className="mt-0.5 text-sm font-medium text-white">{text}</p>
      </div>
    </div>
  );

  return href ? <a href={href} className="block hover:opacity-80 transition-opacity">{content}</a> : content;
}
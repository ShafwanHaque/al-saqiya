"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const t = useTranslations("contact");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t("form.error"));
      }

      setStatus(t("form.success"));
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : t("form.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-[#F8F6F0] py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4AF37]">
            {t("eyebrow")}
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-serif text-[#004D40]">
            {t("title")}
          </h2>

          <p className="mt-4 text-neutral-500 leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          {/* =====================================================
              LEFT SIDE
          ====================================================== */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-[#004D40] text-white rounded-2xl p-8">
              <h3 className="text-2xl font-serif mb-7">
                {t("information.title")}
              </h3>

              <div className="space-y-6">
                {/* Office */}
                <ContactItem
                  icon={<MapPin size={20} />}
                  title={t("information.office")}
                  text={t("information.address")}
                />

                {/* Phone */}
                <ContactItem
                  icon={<Phone size={20} />}
                  title={t("information.phone")}
                  text={t("information.phoneNumber")}
                  href={`tel:${t("information.phoneNumber")}`}
                />

                {/* Email */}
                <ContactItem
                  icon={<Mail size={20} />}
                  title={t("information.email")}
                  text={t("information.emailAddress")}
                  href={`mailto:${t("information.emailAddress")}`}
                />

                {/* Opening Hours */}
                <ContactItem
                  icon={<Clock size={20} />}
                  title={t("information.hours")}
                  text={t("information.hoursValue")}
                />
              </div>

              {/* Gold Divider */}
              <div className="h-px bg-[#D4AF37]/40 my-7" />

              <p className="text-sm text-white/70 leading-relaxed">
                {t("information.description")}
              </p>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
              <div className="relative h-72">
                <iframe
                  title={t("map.title")}
                  src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#004D40]">
                    {t("map.title")}
                  </p>

                  <p className="text-sm text-neutral-500">
                    {t("map.description")}
                  </p>
                </div>

                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#004D40] hover:text-[#D4AF37] transition-colors"
                >
                  {t("map.directions")}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE — CONTACT FORM
          ====================================================== */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-7 md:p-9">
            {/* Form Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-serif text-[#004D40]">
                {t("form.title")}
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                {t("form.description")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* =================================================
                  FULL NAME
              ================================================== */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                >
                  {t("form.name")}
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t("form.namePlaceholder")}
                  className="contact-input"
                />
              </div>

              {/* =================================================
                  EMAIL + PHONE
              ================================================== */}
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-neutral-700 mb-2"
                  >
                    {t("form.email")}
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={t("form.emailPlaceholder")}
                    className="contact-input"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-neutral-700 mb-2"
                  >
                    {t("form.phone")}
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder={t("form.phonePlaceholder")}
                    className="contact-input"
                  />
                </div>
              </div>

              {/* =================================================
                  SUBJECT
              ================================================== */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                >
                  {t("form.subject")}
                </label>

                <select
                  id="subject"
                  name="subject"
                  required
                  defaultValue=""
                  className="contact-input"
                >
                  <option value="" disabled>
                    {t("form.subjectPlaceholder")}
                  </option>

                  <option value="Umrah Package">
                    {t("form.subjects.umrah")}
                  </option>

                  <option value="Hajj Package">
                    {t("form.subjects.hajj")}
                  </option>

                  <option value="Holiday Package">
                    {t("form.subjects.holiday")}
                  </option>

                  <option value="Visa Assistance">
                    {t("form.subjects.visa")}
                  </option>

                  <option value="General Enquiry">
                    {t("form.subjects.general")}
                  </option>
                </select>
              </div>

              {/* =================================================
                  MESSAGE
              ================================================== */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                >
                  {t("form.message")}
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder={t("form.messagePlaceholder")}
                  className="contact-input resize-none"
                />
              </div>

              {/* =================================================
                  STATUS MESSAGE
              ================================================== */}
              {status && (
                <div
                  role="status"
                  className="rounded-lg bg-[#004D40]/5 border border-[#004D40]/10 px-4 py-3 text-sm text-[#004D40]"
                >
                  {status}
                </div>
              )}

              {/* =================================================
                  SUBMIT BUTTON
              ================================================== */}
              <button
                type="submit"
                disabled={loading}
                className="primary-button !inline-flex w-full justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? t("form.sending") : t("form.send")}
              </button>

              {/* Privacy */}
              <p className="text-xs text-center text-neutral-400">
                {t("form.privacy")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===============================================================
   CONTACT ITEM
================================================================ */

function ContactItem({
  icon,
  title,
  text,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex gap-4">
      {/* Icon */}
      <div className="shrink-0 w-10 h-10 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
        {icon}
      </div>

      {/* Text */}
      <div>
        <p className="text-sm text-white/50 mb-1">{title}</p>

        <p className="text-sm font-medium text-white">{text}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }

  return content;
}

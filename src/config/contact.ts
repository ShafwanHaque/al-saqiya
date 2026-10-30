/** Public contact details used by direct links and the contact form. */
export const CONTACT_PHONE_E164 = "+8801677829301";
export const CONTACT_WHATSAPP_E164 = "+8801883138711";
export const CONTACT_EMAIL = "alsaqiya18@gmail.com";

/** WhatsApp chat link, optionally with a pre-filled message. */
export function whatsappUrl(message?: string) {
  const url = `https://wa.me/${CONTACT_WHATSAPP_E164.replace("+", "")}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}

// Centraliza URLs de WhatsApp para que FAB + checkout generen el mismo formato.
export const WHATSAPP_PHONE_E164 = "5354066204";

export function buildWhatsAppHref(message: string, phoneE164: string = WHATSAPP_PHONE_E164) {
  const text = encodeURIComponent(message.trim().slice(0, 2000));
  return `https://wa.me/${phoneE164}?text=${text}`;
}

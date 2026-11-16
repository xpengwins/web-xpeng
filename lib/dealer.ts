import raw from "@/data/dealer.json";

export const DEALER = raw as typeof raw & Record<string, string>;
export const hasIdentity = !!(DEALER.legalName && DEALER.addressLine && DEALER.city);

/** Nomor WhatsApp: dealer.json lebih dulu, lalu env. Kosong → tombol diarahkan ke form /test-drive. */
const WA = (DEALER.whatsapp || process.env.NEXT_PUBLIC_WA_NUMBER || "").replace(/\D/g, "");
export const hasWhatsApp = WA.length >= 10;
export const waDisplay = DEALER.whatsapp ? "+" + WA : "";

/** Link kontak aman: ke WhatsApp bila nomor ada, kalau belum → form test drive (tidak pernah ke nomor palsu). */
export function contactHref(text: string): string {
  return hasWhatsApp ? `https://wa.me/${WA}?text=${encodeURIComponent(text)}` : "/test-drive";
}
export const contactExternal = hasWhatsApp;

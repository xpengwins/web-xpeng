import { abs, SITE_NAME, OFFICIAL_SITE } from "./site";
import { DEALER, hasIdentity, hasWhatsApp, waDisplay } from "./dealer";
import type { Faq, Variant } from "@/data/variants";

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

/** AutoDealer hanya dibuat bila identitas nyata sudah diisi di data/dealer.json — tidak pernah memakai data karangan. */
export function dealerSchema() {
  if (!hasIdentity) return null;
  const sameAs = [DEALER.instagram, DEALER.tiktok, DEALER.youtube, DEALER.facebook, DEALER.googleBusinessProfileUrl].filter(Boolean);
  return {
    "@context": "https://schema.org", "@type": "AutoDealer",
    "@id": abs("/#dealer"), name: DEALER.displayName || SITE_NAME, legalName: DEALER.legalName, url: abs("/"),
    ...(hasWhatsApp ? { telephone: DEALER.phone || waDisplay } : DEALER.phone ? { telephone: DEALER.phone } : {}),
    ...(DEALER.email ? { email: DEALER.email } : {}),
    ...(DEALER.openingHours ? { openingHours: DEALER.openingHours } : {}),
    address: { "@type": "PostalAddress", streetAddress: DEALER.addressLine, addressLocality: DEALER.city,
      ...(DEALER.province ? { addressRegion: DEALER.province } : {}), ...(DEALER.postalCode ? { postalCode: DEALER.postalCode } : {}), addressCountry: "ID" },
    brand: { "@type": "Brand", name: "XPENG" },
    ...(sameAs.length ? { sameAs } : {}),
    parentOrganization: { "@type": "Organization", name: DEALER.apmName, url: OFFICIAL_SITE },
  };
}

export function websiteSchema() {
  return { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: abs("/"), inLanguage: "id-ID" };
}

/** FAQPage — hanya dipakai di halaman yang menampilkan FAQ yang sama persis. */
export function faqSchema(faq: Faq[]) {
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function carSchema(v: Variant, path: string) {
  return {
    "@context": "https://schema.org", "@type": "Car", name: `XPENG ${v.name}`, brand: { "@type": "Brand", name: "XPENG" },
    url: abs(path), vehicleSeatingCapacity: v.model === "X9" ? 7 : v.model === "G9L" ? 6 : undefined, fuelType: "Electric",
    offers: { "@type": "Offer", priceCurrency: "IDR", price: String(v.priceJt * 1_000_000), url: abs(path),
      description: "Harga on the road Jakarta, dapat berubah sewaktu-waktu." },
  };
}

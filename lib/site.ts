/** Konfigurasi situs. Domain diisi lewat NEXT_PUBLIC_SITE_URL (belum dibeli → biarkan kosong). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/$/, "");

/** Live = domain produksi sungguhan. Selama kosong / *.vercel.app / *.pages.dev, situs di-noindex otomatis. */
export const IS_LIVE = !!SITE_URL && !/localhost|127\.0\.0\.1|vercel\.app|pages\.dev|netlify\.app/.test(SITE_URL);
export const BASE = SITE_URL || "http://localhost:3000";
export const abs = (path: string) => BASE + (path.startsWith("/") ? path : "/" + path);

export const SITE_NAME = "XPENG Wins";
export const PUBLISHED_ISO = "2026-11-16";
export const UPDATED_ISO = "2026-11-16";
export const UPDATED_LABEL = "16 November 2026";
/** Periode harga yang tampil di title/H1. Ubah manual setiap harga berganti. */
export const PRICE_MONTH = "November 2026";
export const OFFICIAL_SITE = "https://www.xpeng.co.id";

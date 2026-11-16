import type { MetadataRoute } from "next";
import { abs, UPDATED_ISO } from "@/lib/site";
import { MODELS } from "@/data/variants";
import { COMPARES } from "@/data/compare";
import { GUIDES } from "@/data/guides";

/** Hanya URL kanonik berstatus 200. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(UPDATED_ISO);
  const pages = ["/", "/harga-xpeng", "/simulasi-kredit", "/test-drive", "/dealer", "/tentang", "/kebijakan-privasi", "/panduan", ...MODELS.map((m) => `/model/${m.slug}`), ...COMPARES.map((c) => `/bandingkan/${c.slug}`), ...GUIDES.map((g) => `/panduan/${g.slug}`)];
  return pages.map((p) => ({ url: abs(p), lastModified }));
}

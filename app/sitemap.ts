import type { MetadataRoute } from "next";
import { abs, UPDATED_ISO } from "@/lib/site";
import { MODELS } from "@/data/variants";

/** Hanya URL kanonik berstatus 200. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(UPDATED_ISO);
  const pages = ["/", "/harga-xpeng", "/simulasi-kredit", "/test-drive", "/dealer", "/tentang", "/kebijakan-privasi", ...MODELS.map((m) => `/model/${m.slug}`)];
  return pages.map((p) => ({ url: abs(p), lastModified }));
}

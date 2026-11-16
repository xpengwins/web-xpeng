// Dijalankan otomatis sebelum build (prebuild): bila domain live tapi identitas dealer kosong, build gagal.
import { readFileSync } from "node:fs";
const url = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
const live = !!url && !/localhost|127\.0\.0\.1|vercel\.app|pages\.dev|netlify\.app/.test(url);
if (live) {
  const d = JSON.parse(readFileSync(new URL("../data/dealer.json", import.meta.url), "utf8"));
  const miss = ["legalName", "addressLine", "city"].filter((k) => !d[k]);
  if (/xpengwins\.com/.test(url)) { console.error("NEXT_PUBLIC_SITE_URL tidak boleh xpengwins.com (domain lama diblokir)."); process.exit(1); }
  if (miss.length) { console.error("Domain live tetapi data/dealer.json belum lengkap: " + miss.join(", ")); process.exit(1); }
}

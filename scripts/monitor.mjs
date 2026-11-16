#!/usr/bin/env node
/**
 * Monitor anti-blokir (jalankan dari cron / n8n / GitHub Actions).
 *   SITE_URL=https://domainbaru.com node scripts/monitor.mjs
 * Opsional: ALERT_WEBHOOK (n8n/Telegram/Slack webhook, menerima JSON {text}), GSB_API_KEY (Google Safe Browsing API v4).
 * Exit code 1 bila ada masalah. Hash HTML disimpan di .monitor-hashes.json (commit/simpan di tempat aman).
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SITE = (process.env.SITE_URL || "").replace(/\/$/, "");
if (!SITE) { console.error("SITE_URL wajib diisi"); process.exit(2); }
const PATHS = ["/", "/harga-xpeng", "/simulasi-kredit", "/test-drive", "/dealer", "/tentang", "/model/g6", "/model/x9", "/model/g9l", "/model/l03", "/bandingkan/g6-vs-x9", "/bandingkan/x9-vs-g9l", "/bandingkan/g6-vs-g9l", "/panduan", "/panduan/garansi-baterai-xpeng", "/panduan/waktu-charge-xpeng-di-rumah"];
const REQUIRED = ["XPENG"];
const SPAM = /(slot gacor|judi online|togel|viagra|casino|pharmacy|poker online|situs slot)/i;
const FILE = ".monitor-hashes.json";
const prev = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf8")) : {};
const next = {}; const problems = [];

for (const p of PATHS) {
  try {
    const res = await fetch(SITE + p, { redirect: "manual", headers: { "user-agent": "xpeng-monitor/1.0" } });
    if (res.status !== 200) { problems.push(`${p}: status ${res.status}`); continue; }
    const html = await res.text();
    if (!REQUIRED.every((w) => html.includes(w))) problems.push(`${p}: kata wajib hilang`);
    if (SPAM.test(html)) problems.push(`${p}: kata spam terdeteksi`);
    const scripts = [...html.matchAll(/<(?:script|iframe)[^>]+src="([^"]+)"/g)].map((m) => m[1]).filter((s) => /^https?:\/\//.test(s) && !s.startsWith(SITE));
    if (scripts.length) problems.push(`${p}: skrip/iframe eksternal: ${[...new Set(scripts)].join(", ")}`);
    // Hash tanpa nonce/chunk-hash build agar tidak alarm palsu tiap deploy: hanya teks yang terlihat.
    const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    next[p] = createHash("sha256").update(text).digest("hex");
    if (prev[p] && prev[p] !== next[p]) problems.push(`${p}: isi berubah sejak cek terakhir (abaikan bila baru deploy)`);
  } catch (e) { problems.push(`${p}: gagal diakses (${e.message})`); }
}
try {
  const r = await fetch(SITE + "/robots.txt"); const t = await r.text();
  if (/Disallow:\s*\/\s*$/m.test(t)) problems.push("robots.txt memblokir seluruh situs");
} catch { problems.push("robots.txt tidak bisa diakses"); }

if (process.env.GSB_API_KEY) {
  const r = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GSB_API_KEY}`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ client: { clientId: "xpeng-monitor", clientVersion: "1.0" },
      threatInfo: { threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"], platformTypes: ["ANY_PLATFORM"], threatEntryTypes: ["URL"], threatEntries: [{ url: SITE + "/" }] } }),
  });
  const j = await r.json();
  if (j.matches?.length) problems.push("SAFE BROWSING: " + j.matches.map((m) => m.threatType).join(", "));
} else console.log("(GSB_API_KEY kosong: cek manual di transparencyreport.google.com/safe-browsing/search)");

writeFileSync(FILE, JSON.stringify({ ...prev, ...next }, null, 2));
if (problems.length) {
  const text = `⚠️ Monitor ${SITE}\n- ` + problems.join("\n- ");
  console.error(text);
  if (process.env.ALERT_WEBHOOK) await fetch(process.env.ALERT_WEBHOOK, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text }) });
  process.exit(1);
}
console.log("OK: semua cek lolos");

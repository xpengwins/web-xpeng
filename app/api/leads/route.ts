import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = { type?: string; name?: string; phone?: string; variant?: string; note?: string; website?: string };
const clean = (s: unknown, max: number) => (typeof s === "string" ? s.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "");

// Pembatas sederhana per IP (best-effort; di serverless tiap instance punya memori sendiri). Untuk produksi, tambah WAF/Turnstile.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(), win = 10 * 60_000, arr = (hits.get(ip) ?? []).filter((t) => now - t < win);
  arr.push(now); hits.set(ip, arr);
  return arr.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let b: Body;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 }); }
  if (clean(b.website, 50)) return NextResponse.json({ ok: true, stored: false }); // honeypot terisi → bot, diam-diam abaikan

  const lead = {
    type: b.type === "booking" ? "booking" : "test_drive",
    name: clean(b.name, 80), phone: clean(b.phone, 20), variant: clean(b.variant, 60), note: clean(b.note, 300) || null,
  };
  if (lead.name.length < 2 || !/^[0-9+ ()-]{8,20}$/.test(lead.phone) || !lead.variant) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.log("[lead]", { ...lead, phone: lead.phone.replace(/\d(?=\d{3})/g, "•") }); // jangan log nomor penuh
    return NextResponse.json({ ok: true, stored: false });
  }
  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) { console.error("[lead] supabase", res.status); return NextResponse.json({ ok: false, error: "storage" }, { status: 502 }); }
  return NextResponse.json({ ok: true, stored: true });
}

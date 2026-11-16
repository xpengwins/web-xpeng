import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = { type?: string; name?: string; phone?: string; variant?: string; color?: string; note?: string };
const clean = (s: unknown, max: number) => (typeof s === "string" ? s.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let b: Body;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 }); }

  const lead = {
    type: b.type === "booking" ? "booking" : "test_drive",
    name: clean(b.name, 80), phone: clean(b.phone, 20), variant: clean(b.variant, 60),
    color: clean(b.color, 40) || null, note: clean(b.note, 300) || null,
  };
  if (lead.name.length < 2 || !/^[0-9+ ()-]{8,20}$/.test(lead.phone) || !lead.variant) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    // Supabase belum dikonfigurasi: lead hanya tercatat di log server.
    console.log("[lead]", lead);
    return NextResponse.json({ ok: true, stored: false });
  }
  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    console.error("[lead] supabase error", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "storage" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, stored: true });
}

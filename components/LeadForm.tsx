"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { VARIANTS } from "@/data/variants";
import { contactHref, contactExternal } from "@/lib/dealer";

type Status = "idle" | "sending" | "done" | "error";

/** Form minimal: nama, WhatsApp, varian. Tanpa data berlebih (master plan: jangan memancing data). */
export default function LeadForm({ defaultVariant = 0 }: { defaultVariant?: number }) {
  const [status, setStatus] = useState<Status>("idle");
  const [vi, setVi] = useState(defaultVariant);
  const [form, setForm] = useState({ type: "test_drive", name: "", phone: "", note: "", website: "" });
  const v = VARIANTS[vi];
  const set = (k: keyof typeof form, val: string) => setForm((f) => ({ ...f, [k]: val }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, variant: v.name }) });
      setStatus(res.ok ? "done" : "error");
    } catch { setStatus("error"); }
  }

  const field = "w-full border-[1.5px] border-[#0d0d0d] bg-white px-3 py-2.5 text-sm font-bold";
  const msg = `Halo, saya ${form.name || "…"} ingin ${form.type === "booking" ? "booking" : "test drive"} XPENG ${v.name}.`;

  return (
    <form onSubmit={submit} className="grid gap-4 border-2 border-[#0d0d0d] bg-white p-6 md:p-8" aria-label="Formulir test drive atau booking">
      <div className="flex gap-2" role="group" aria-label="Jenis permintaan">
        {[["test_drive", "Test drive"], ["booking", "Booking"]].map(([k, l]) => (
          <button key={k} type="button" aria-pressed={form.type === k} onClick={() => set("type", k)}
            className={"flex-1 border-[1.5px] border-[#0d0d0d] px-3 py-2.5 text-sm font-extrabold " + (form.type === k ? "bg-[#0d0d0d] text-[#f5e91a]" : "bg-white")}>{l}</button>
        ))}
      </div>
      <label className="grid gap-1.5"><span className="sec-lab">Nama</span>
        <input required minLength={2} maxLength={80} className={field} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></label>
      <label className="grid gap-1.5"><span className="sec-lab">No. WhatsApp</span>
        <input required inputMode="tel" pattern="[0-9+ ()\-]{8,20}" className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="08xx xxxx xxxx" /></label>
      <label className="grid gap-1.5"><span className="sec-lab">Varian</span>
        <select className={field} value={vi} onChange={(e) => setVi(+e.target.value)}>{VARIANTS.map((x, i) => <option key={x.slug} value={i}>{x.name}</option>)}</select></label>
      <label className="grid gap-1.5"><span className="sec-lab">Catatan (opsional)</span>
        <textarea rows={2} maxLength={300} className={field} value={form.note} onChange={(e) => set("note", e.target.value)} /></label>
      {/* honeypot anti-spam: disembunyikan dari pengguna */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} /></label></div>
      <p className="mono text-[9px] leading-relaxed text-[#555]">Data hanya dipakai untuk menghubungi Anda terkait permintaan ini. Selengkapnya di <Link href="/kebijakan-privasi" className="underline">Kebijakan Privasi</Link>.</p>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={status === "sending" || status === "done"} className="tk !h-11 !text-xs disabled:opacity-60">
          {status === "sending" ? "Mengirim…" : status === "done" ? "Terkirim ✓" : "Kirim data →"}</button>
        {contactExternal && <a className="tk blk !h-11 !text-xs" target="_blank" rel="noopener" href={contactHref(msg)}>Lanjut WhatsApp <b>→</b></a>}
      </div>
      {status === "done" && <p role="status" className="mono text-[10px] text-green-700">Terima kasih! Tim kami akan menghubungi Anda.</p>}
      {status === "error" && <p role="alert" className="mono text-[10px] text-red-700">Gagal mengirim. Silakan coba lagi{contactExternal ? " atau lanjut lewat WhatsApp" : ""}.</p>}
    </form>
  );
}

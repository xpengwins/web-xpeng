"use client";
import { useState, type FormEvent } from "react";
import { COLORS, VARIANTS, waLink } from "@/data/variants";

type Status = "idle" | "sending" | "done" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [vi, setVi] = useState(0);
  const [form, setForm] = useState({ type: "test_drive", name: "", phone: "", color: "", note: "" });
  const v = VARIANTS[vi];
  const set = (k: keyof typeof form, val: string) => setForm((f) => ({ ...f, [k]: val }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, variant: v.name }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch { setStatus("error"); }
  }

  const field = "w-full border-[1.5px] border-[#0d0d0d] bg-white px-3 py-2.5 text-sm font-bold";
  const msg = `Halo, saya ${form.name || "…"} ingin ${form.type === "booking" ? "booking" : "test drive"} XPENG ${v.name}${form.color ? " warna " + form.color : ""}. No. HP: ${form.phone || "…"}`;

  return (
    <section id="daftar" className="grid border-t-2 border-[#0d0d0d] bg-[#ecebe7] md:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col justify-center gap-3 p-8 md:p-12">
        <div className="sec-lab">Daftar</div>
        <h2 className="sec-h">Test drive<br />atau booking</h2>
        <p className="mono max-w-sm text-[10px] leading-relaxed text-[#444]">Isi data singkat, tim kami menghubungi kamu. Atau langsung lanjut lewat WhatsApp.</p>
      </div>
      <form onSubmit={submit} className="grid gap-4 border-[#0d0d0d] bg-white p-8 md:border-l-2 md:p-12">
        <div className="flex gap-2">
          {[["test_drive", "Test drive"], ["booking", "Booking"]].map(([k, l]) => (
            <button key={k} type="button" onClick={() => set("type", k)}
              className={"flex-1 border-[1.5px] border-[#0d0d0d] px-3 py-2.5 text-sm font-extrabold " + (form.type === k ? "bg-[#0d0d0d] text-[#f5e91a]" : "bg-white")}>{l}</button>
          ))}
        </div>
        <label className="grid gap-1.5"><span className="sec-lab">Nama</span>
          <input required minLength={2} maxLength={80} className={field} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></label>
        <label className="grid gap-1.5"><span className="sec-lab">No. WhatsApp</span>
          <input required inputMode="tel" pattern="[0-9+ ()-]{8,20}" className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="08xx xxxx xxxx" /></label>
        <div className="grid grid-cols-2 gap-4">
          <label className="grid gap-1.5"><span className="sec-lab">Varian</span>
            <select className={field} value={vi} onChange={(e) => { setVi(+e.target.value); set("color", ""); }}>
              {VARIANTS.map((x, i) => <option key={x.slug} value={i}>{x.name}</option>)}</select></label>
          <label className="grid gap-1.5"><span className="sec-lab">Warna (opsional)</span>
            <select className={field} value={form.color} onChange={(e) => set("color", e.target.value)}>
              <option value="">Belum menentukan</option>
              {v.colors.map((k) => <option key={k} value={COLORS[k].name}>{COLORS[k].name}</option>)}</select></label>
        </div>
        <label className="grid gap-1.5"><span className="sec-lab">Catatan (opsional)</span>
          <textarea rows={2} maxLength={300} className={field} value={form.note} onChange={(e) => set("note", e.target.value)} /></label>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={status === "sending" || status === "done"} className="tk !h-11 !text-xs disabled:opacity-60">
            {status === "sending" ? "Mengirim…" : status === "done" ? "Terkirim ✓" : "Kirim data →"}</button>
          <a className="tk blk !h-11 !text-xs" target="_blank" rel="noopener" href={waLink(msg)}>Lanjut WhatsApp <b>→</b></a>
        </div>
        {status === "done" && <p className="mono text-[10px] text-green-700">Terima kasih! Data kamu sudah kami terima.</p>}
        {status === "error" && <p className="mono text-[10px] text-red-700">Gagal mengirim. Silakan lanjut lewat WhatsApp.</p>}
      </form>
    </section>
  );
}

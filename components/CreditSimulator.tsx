"use client";
import { useState } from "react";
import { PACKAGES, CREDIT_PERIOD, CREDIT_AREA } from "@/data/credit";
import { VARIANTS, idr, idrFull } from "@/data/variants";

export default function CreditSimulator() {
  const available = VARIANTS.filter((v) => PACKAGES.some((p) => p.byVariant[v.slug]));
  const [slug, setSlug] = useState(available[0].slug);
  const v = VARIANTS.find((x) => x.slug === slug)!;
  const pkgs = PACKAGES.filter((p) => p.byVariant[slug]);
  const field = "w-full border-[1.5px] border-[#0d0d0d] bg-white px-3 py-2.5 text-sm font-bold";

  return (
    <div className="grid gap-6">
      <label className="grid max-w-md gap-1.5"><span className="sec-lab">Pilih varian</span>
        <select className={field} value={slug} onChange={(e) => setSlug(e.target.value)}>
          {available.map((x) => <option key={x.slug} value={x.slug}>{x.name} — {idrFull(x.priceJt)}</option>)}</select></label>
      <p className="mono text-[10px] text-[#444]">Harga OTR {CREDIT_AREA}: <b>{idrFull(v.priceJt)}</b> · Periode paket: {CREDIT_PERIOD}</p>
      {pkgs.map((p) => (
        <section key={p.id} className="overflow-x-auto border-2 border-[#0d0d0d] bg-white">
          <div className="border-b-2 border-[#0d0d0d] bg-[#f5e91a] p-3"><h3 className="text-lg font-black tracking-tight">{p.name}</h3><p className="mono text-[9px]">{p.desc}</p></div>
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead><tr className="mono text-[9px] uppercase tracking-wider"><th className="p-3">Tenor</th><th className="p-3">TDP</th><th className="p-3">Angsuran / bulan</th></tr></thead>
            <tbody>{p.byVariant[slug].map((r) => (
              <tr key={r.tenor} className="border-t border-[#0d0d0d]/30"><td className="p-3 font-bold">{r.tenor} bulan</td><td className="p-3">{idr(r.tdp)}</td><td className="p-3 font-black">{idr(r.angsuran)}</td></tr>))}</tbody>
          </table>
        </section>
      ))}
    </div>
  );
}

"use client";
import { useMemo, useState } from "react";
import { VARIANTS, idr, rp } from "@/data/variants";

/** Simulasi indikatif (bunga flat). Bukan penawaran resmi leasing. */
export default function CreditCalc() {
  const [vi, setVi] = useState(0);
  const [dpPct, setDpPct] = useState(30);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(4.5);
  const v = VARIANTS[vi];

  const r = useMemo(() => {
    const price = v.priceJt * 1_000_000;
    const dp = (price * dpPct) / 100;
    const pokok = price - dp;
    const total = pokok * (1 + (rate / 100) * years);
    return { price, dp, pokok, bulanan: total / (years * 12), total: total + dp };
  }, [v, dpPct, years, rate]);

  const field = "w-full border-[1.5px] border-[#0d0d0d] bg-white px-3 py-2.5 text-sm font-bold";
  return (
    <section id="simulasi" className="grid gap-0 border-t-2 border-[#0d0d0d] md:grid-cols-2">
      <div className="flex flex-col gap-5 p-8 md:p-12">
        <div><div className="sec-lab">Simulasi kredit</div><h2 className="sec-h mt-2">Hitung cicilan<br />per bulan</h2></div>
        <label className="grid gap-1.5"><span className="sec-lab">Varian</span>
          <select className={field} value={vi} onChange={(e) => setVi(+e.target.value)}>
            {VARIANTS.map((x, i) => <option key={x.slug} value={i}>{x.name} — {rp(x.priceJt)}</option>)}
          </select></label>
        <label className="grid gap-1.5"><span className="sec-lab">Uang muka (DP): {dpPct}% = {idr(r.dp)}</span>
          <input type="range" min={20} max={70} step={5} value={dpPct} onChange={(e) => setDpPct(+e.target.value)} className="accent-[#0d0d0d]" /></label>
        <div className="grid grid-cols-2 gap-4">
          <label className="grid gap-1.5"><span className="sec-lab">Tenor</span>
            <select className={field} value={years} onChange={(e) => setYears(+e.target.value)}>
              {[1, 2, 3, 4, 5, 6, 7].map((y) => <option key={y} value={y}>{y} tahun</option>)}
            </select></label>
          <label className="grid gap-1.5"><span className="sec-lab">Bunga flat / tahun (%)</span>
            <input className={field} type="number" min={0} max={20} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value || 0)} /></label>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 bg-[#0d0d0d] p-8 text-white md:p-12">
        <div className="sec-lab !text-[#f5e91a]">Estimasi cicilan</div>
        <div className="text-5xl font-black tracking-tighter md:text-6xl">{idr(r.bulanan)}<span className="mono ml-2 text-xs font-normal">/ bulan</span></div>
        <div className="mono grid gap-2 text-[10px] uppercase tracking-wider">
          {[["Harga OTR", idr(r.price)], ["Uang muka", idr(r.dp)], ["Pokok pinjaman", idr(r.pokok)], ["Total bayar", idr(r.total)]].map(([a, b]) => (
            <div key={a} className="flex justify-between border-t border-dotted border-white/40 py-2"><span>{a}</span><b>{b}</b></div>
          ))}
        </div>
        <p className="mono text-[8px] leading-relaxed text-white/60">Perhitungan indikatif dengan bunga flat. Angka resmi (bunga, provisi, asuransi) mengikuti perusahaan pembiayaan — tanyakan ke sales.</p>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { DEALER, hasIdentity } from "@/lib/dealer";
import { OFFICIAL_SITE, PUBLISHED_ISO, UPDATED_ISO } from "@/lib/site";
import { VARIANTS, rp, type Faq, type Variant } from "@/data/variants";

const fmt = (iso: string) => new Date(iso + "T00:00:00+07:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="sec-lab flex flex-wrap gap-2">
      {items.map((it, i) => (
        <span key={it.name} className="flex gap-2">
          {it.href ? <Link href={it.href} className="underline underline-offset-4">{it.name}</Link> : <span>{it.name}</span>}
          {i < items.length - 1 && <span aria-hidden>/</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageHead({ crumbs, h1, lead }: { crumbs: { name: string; href?: string }[]; h1: string; lead?: ReactNode }) {
  return (
    <header className="border-b-2 border-[#0d0d0d] bg-[#ecebe7] px-6 py-12 md:px-12">
      <Crumbs items={crumbs} />
      <h1 className="sec-h mt-4 max-w-4xl">{h1}</h1>
      {lead && <p className="mono mt-4 max-w-2xl text-[11px] leading-relaxed text-[#333]">{lead}</p>}
    </header>
  );
}

export function Meta() {
  return (
    <p className="mono text-[9px] uppercase tracking-wider text-[#555]">
      Terbit {fmt(PUBLISHED_ISO)} · Diperbarui <time dateTime={UPDATED_ISO}>{fmt(UPDATED_ISO)}</time>
      {DEALER.consultantName ? <> · Ditinjau oleh {DEALER.consultantName}, {DEALER.consultantRole}</> : null}
    </p>
  );
}

/** Direct answer 40–60 kata di bawah heading berbentuk pertanyaan (AEO). */
export function Answer({ q, children }: { q: string; children: ReactNode }) {
  return (
    <section className="border-l-4 border-[#f5e91a] bg-white p-5">
      <h2 className="text-xl font-black tracking-tight">{q}</h2>
      <p className="mt-2 text-[15px] leading-relaxed">{children}</p>
    </section>
  );
}

export function Faqs({ faq, title = "Pertanyaan yang sering ditanyakan" }: { faq: Faq[]; title?: string }) {
  return (
    <section>
      <h2 className="sec-h !text-3xl">{title}</h2>
      <div className="mt-4 divide-y-2 divide-[#0d0d0d] border-y-2 border-[#0d0d0d]">
        {faq.map((f) => (
          <details key={f.q} className="group py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold">{f.q}<span className="mono text-lg group-open:rotate-45">+</span></summary>
            <p className="mt-2 text-[15px] leading-relaxed text-[#222]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function PriceTable({ variants = VARIANTS, link = true }: { variants?: Variant[]; link?: boolean }) {
  return (
    <div className="overflow-x-auto border-2 border-[#0d0d0d] bg-white">
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
        <caption className="sr-only">Harga XPENG on the road Jakarta</caption>
        <thead className="bg-[#0d0d0d] text-[#f5e91a]"><tr className="mono text-[9px] uppercase tracking-wider">
          <th className="p-3">Varian</th><th className="p-3">Harga OTR Jakarta</th><th className="p-3">Jarak tempuh</th><th className="p-3">Penggerak</th></tr></thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v.slug} className="border-t border-[#0d0d0d]/30">
              <th scope="row" className="p-3 font-extrabold">{link ? <Link href={`/model/${v.model.toLowerCase()}`} className="underline underline-offset-4">XPENG {v.name}</Link> : `XPENG ${v.name}`}</th>
              <td className="p-3 font-black">{rp(v.priceJt)}</td><td className="p-3">{v.range} {v.rangeUnit}</td><td className="p-3">{v.t.drive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SpecTable({ variants }: { variants: Variant[] }) {
  const rows: [string, (v: Variant) => string][] = [
    ["Harga OTR Jakarta", (v) => rp(v.priceJt)], ["Penggerak", (v) => v.t.drive], ["Daya", (v) => v.t.power], ["Torsi", (v) => v.t.torque],
    ["0–100 km/jam", (v) => v.t.accel], ["Baterai", (v) => v.t.battery], ["Jarak tempuh", (v) => v.t.range], ["Pengisian DC", (v) => v.t.charge],
  ];
  return (
    <div className="overflow-x-auto border-2 border-[#0d0d0d] bg-white">
      <table className="w-full border-collapse text-left text-sm" style={{ minWidth: 220 + variants.length * 170 }}>
        <caption className="sr-only">Perbandingan varian</caption>
        <thead className="bg-[#0d0d0d] text-[#f5e91a]"><tr><th className="mono p-3 text-[9px] uppercase">Spesifikasi</th>
          {variants.map((v) => <th key={v.slug} className="p-3 font-extrabold">{v.name}</th>)}</tr></thead>
        <tbody>
          {rows.map(([label, get]) => (
            <tr key={label} className="border-t border-[#0d0d0d]/30"><th scope="row" className="mono p-3 text-[10px] font-bold uppercase">{label}</th>
              {variants.map((v) => <td key={v.slug} className="p-3">{get(v)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Penegasan dealer — wajib tampil (master plan: jangan meniru situs resmi). */
export function DealerNote() {
  return (
    <aside className="mono border-2 border-dashed border-[#0d0d0d] bg-white p-4 text-[10px] leading-relaxed">
      <b>Situs dealer, bukan situs resmi XPENG Indonesia.</b>{" "}
      {DEALER.displayName} adalah dealer XPENG{hasIdentity ? <> ({DEALER.legalName}, {DEALER.addressLine}, {DEALER.city})</> : null}.
      XPENG adalah merek milik XPENG; distribusi di Indonesia oleh {DEALER.apmName} selaku Agen Pemegang Merek.
      Informasi resmi: <a className="underline" href={OFFICIAL_SITE} rel="noopener nofollow" target="_blank">{OFFICIAL_SITE.replace("https://", "")}</a>.
    </aside>
  );
}

export function Section({ children, id }: { children: ReactNode; id?: string }) {
  return <section id={id} className="mx-auto grid max-w-5xl gap-8 px-6 py-10 md:px-12">{children}</section>;
}

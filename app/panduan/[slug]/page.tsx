import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, guideBySlug } from "@/data/guides";
import { Answer, DealerNote, Meta, PageHead, Section } from "@/components/Ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumb } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = guideBySlug((await params).slug);
  return g ? { title: g.title, description: g.desc, alternates: { canonical: `/panduan/${g.slug}` } } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();
  const path = `/panduan/${g.slug}`;
  return (
    <main>
      <PageHead crumbs={[{ name: "Beranda", href: "/" }, { name: "Panduan", href: "/panduan" }, { name: "Artikel" }]} h1={g.q} />
      <Section>
        <Answer q="Jawaban singkat">{g.answer}</Answer>
        <Meta />
        {g.blocks.map((b) => (
          <section key={b.h}><h2 className="sec-h !text-3xl">{b.h}</h2>
            {b.p && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed">{b.p}</p>}
            {b.ul && <ul className="mt-3 grid max-w-2xl list-disc gap-2 pl-5 text-[15px] leading-relaxed">{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>}
            {b.table && (
              <div className="mt-3 overflow-x-auto border-2 border-[#0d0d0d] bg-white"><table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead className="bg-[#0d0d0d] text-[#f5e91a]"><tr>{b.table.head.map((h) => <th key={h} className="mono p-3 text-[9px] uppercase">{h}</th>)}</tr></thead>
                <tbody>{b.table.rows.map((r) => <tr key={r[0]} className="border-t border-[#0d0d0d]/30">{r.map((c, i) => (i === 0 ? <th key={i} scope="row" className="p-3 font-extrabold">{c}</th> : <td key={i} className="p-3">{c}</td>))}</tr>)}</tbody></table></div>)}
          </section>
        ))}
        {g.verify && <p className="mono border-2 border-dashed border-[#0d0d0d] bg-white p-3 text-[10px] leading-relaxed">Catatan: {g.verify}</p>}
        <section><h2 className="sec-h !text-3xl">Sumber</h2>
          <ul className="mono mt-3 grid gap-1 text-[10px]">{g.sources.map((s) => <li key={s.t}>{s.u ? <a className="underline" href={s.u} target="_blank" rel="noopener nofollow">{s.t}</a> : s.t}</li>)}</ul></section>
        <section><h2 className="sec-h !text-3xl">Baca juga</h2><ul className="mt-3 flex flex-wrap gap-3">
          {g.related.map((r) => { const x = guideBySlug(r)!; return <li key={r}><Link className="underline underline-offset-4" href={`/panduan/${r}`}>{x.q}</Link></li>; })}
          <li><Link className="underline underline-offset-4" href="/harga-xpeng">Daftar harga XPENG</Link></li><li><Link className="underline underline-offset-4" href="/test-drive">Booking test drive</Link></li></ul></section>
        <DealerNote />
      </Section>
      <JsonLd data={breadcrumb([{ name: "Beranda", path: "/" }, { name: "Panduan", path: "/panduan" }, { name: g.q, path }])} />
    </main>
  );
}

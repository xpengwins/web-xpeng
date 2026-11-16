import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARES } from "@/data/compare";
import { VARIANTS, variantsOf } from "@/data/variants";
import { Answer, DealerNote, Faqs, Meta, PageHead, Section, SpecTable } from "@/components/Ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, faqSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => COMPARES.map((c) => ({ slug: c.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = COMPARES.find((x) => x.slug === slug);
  return c ? { title: c.title, description: c.desc, alternates: { canonical: `/bandingkan/${c.slug}` } } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COMPARES.find((x) => x.slug === slug);
  if (!c) notFound();
  const vs = [...variantsOf(c.a), ...variantsOf(c.b)];
  const path = `/bandingkan/${c.slug}`;
  return (
    <main>
      <PageHead crumbs={[{ name: "Beranda", href: "/" }, { name: "Bandingkan" }, { name: c.h1 }]} h1={c.h1} />
      <Section>
        <Answer q={`Apa beda XPENG ${c.a} dan ${c.b}?`}>{c.answer}</Answer>
        <Meta />
        <section><h2 className="sec-h !text-3xl">Perbedaan utama</h2>
          <dl className="mt-3 grid gap-2">{c.points.map(([k, v]) => <div key={k} className="grid gap-1 border-t border-[#0d0d0d]/30 py-2 md:grid-cols-[200px_1fr]"><dt className="font-extrabold">{k}</dt><dd className="text-[15px]">{v}</dd></div>)}</dl></section>
        <section><h2 className="sec-h !text-3xl">Tabel varian</h2><div className="mt-3"><SpecTable variants={vs} /></div>
          <p className="mono mt-2 text-[9px] text-[#555]">Data brosur & materi APM XPENG Indonesia, Nov 2026. Jarak tempuh WLTP dan NEDC memakai standar berbeda; jangan dibandingkan langsung. Harga OTR Jakarta, dapat berubah.</p></section>
        <Faqs faq={c.faq} />
        <section><h2 className="sec-h !text-3xl">Lihat juga</h2><ul className="mt-3 flex flex-wrap gap-3">
          {[c.a, c.b].map((m) => <li key={m}><Link className="underline underline-offset-4" href={`/model/${m.toLowerCase()}`}>XPENG {m}</Link></li>)}
          <li><Link className="underline underline-offset-4" href="/simulasi-kredit">Simulasi kredit</Link></li><li><Link className="underline underline-offset-4" href="/test-drive">Test drive</Link></li></ul></section>
        <DealerNote />
      </Section>
      <JsonLd data={[breadcrumb([{ name: "Beranda", path: "/" }, { name: c.h1, path }]), faqSchema(c.faq)]} />
    </main>
  );
}

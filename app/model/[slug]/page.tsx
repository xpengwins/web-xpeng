import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MODELS, VARIANTS, variantsOf, rp } from "@/data/variants";
import { Answer, DealerNote, Faqs, Meta, PageHead, Section, SpecTable } from "@/components/Ui";
import CarView from "@/components/CarView";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, carSchema, faqSchema } from "@/lib/schema";
import { COMPARES } from "@/data/compare";
import { PACKAGES } from "@/data/credit";
import { contactHref, contactExternal } from "@/lib/dealer";

export const dynamicParams = false;
export function generateStaticParams() { return MODELS.map((m) => ({ slug: m.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = MODELS.find((x) => x.slug === slug);
  if (!m) return {};
  return { title: m.title, description: m.desc, alternates: { canonical: `/model/${m.slug}` }, openGraph: { title: m.title, description: m.desc } };
}

const COMPARE: Record<string, { href: string; label: string }[]> = {
  g6: [{ href: "/model/x9", label: "Bandingkan dengan XPENG X9" }, { href: "/model/g9l", label: "Lihat XPENG G9L" }],
  x9: [{ href: "/model/g9l", label: "Bandingkan dengan XPENG G9L" }, { href: "/model/g6", label: "Lihat XPENG G6" }],
  g9l: [{ href: "/model/x9", label: "Bandingkan dengan XPENG X9" }, { href: "/model/g6", label: "Lihat XPENG G6" }],
  l03: [{ href: "/model/g6", label: "Lihat XPENG G6" }, { href: "/model/x9", label: "Lihat XPENG X9" }],
};

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = MODELS.find((x) => x.slug === slug);
  if (!m) notFound();
  const vs = m.slug === "l03" ? [] : variantsOf(m.name as "G6" | "X9" | "G9L");
  const path = `/model/${m.slug}`;
  const credit = vs.filter((v) => PACKAGES.some((p) => p.byVariant[v.slug]));

  return (
    <main>
      <PageHead crumbs={[{ name: "Beranda", href: "/" }, { name: "Model" }, { name: `XPENG ${m.name}` }]} h1={m.h1} lead={m.headline} />
      <Section>
        <Answer q={m.slug === "l03" ? "Berapa harga XPENG L03?" : `Berapa harga XPENG ${m.name}?`}>{m.answer}</Answer>
        <Meta />
        {vs.length > 0 && (
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="border-2 border-[#0d0d0d] bg-[#ecebe7] p-4"><CarView variant={vs[0]} color={vs[0].defaultColor} /><p className="mono mt-2 text-[9px] text-[#555]">Ilustrasi, bukan foto unit. Foto unit asli: lihat showroom.</p></div>
            <div><h2 className="sec-h !text-3xl">Varian & harga</h2><p className="mt-2 text-sm">{m.diff}</p></div>
          </div>
        )}
        {vs.length > 0 && <SpecTable variants={vs} />}
        {vs.length > 0 && <p className="mono text-[9px] text-[#555]">Harga OTR Jakarta per November 2026, dapat berubah. Jarak tempuh mengikuti standar uji yang tertulis (NEDC/WLTP); angka nyata bergantung kondisi berkendara. Sumber: brosur & materi APM XPENG Indonesia.</p>}
        <section><h2 className="sec-h !text-3xl">Siapa yang cocok</h2><ul className="mt-3 grid list-disc gap-2 pl-5 text-[15px]">{m.whoFor.map((w) => <li key={w}>{w}</li>)}</ul></section>
        {vs.length > 0 && (
          <section><h2 className="sec-h !text-3xl">Warna & fitur utama</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">{vs.map((v) => (
              <div key={v.slug} className="border-2 border-[#0d0d0d] bg-white p-4"><h3 className="font-black">{v.name}</h3><p className="mt-1 text-sm">{v.sub}</p>
                <dl className="mt-3 grid gap-1 text-[13px]">{v.spec.map(([k, val]) => <div key={k} className="flex justify-between gap-4 border-t border-[#0d0d0d]/20 pt-1"><dt className="font-bold">{k}</dt><dd className="text-right">{val}</dd></div>)}</dl></div>))}</div>
          </section>
        )}
        <section><h2 className="sec-h !text-3xl">Biaya & kredit</h2>
          {credit.length ? <><p className="mt-2 text-[15px]">Paket leasing tersedia untuk {credit.map((v) => v.name).join(", ")}. Tenor 11–60 bulan; TDP dan angsuran per varian ada di simulasi kredit.</p><Link href="/simulasi-kredit" className="tk mt-3 !h-10 w-fit">Buka simulasi kredit →</Link></>
            : <p className="mt-2 text-[15px]">Paket kredit untuk model ini belum tersedia di materi kami. Hubungi sales untuk informasi terbaru.</p>}</section>
        <section><h2 className="sec-h !text-3xl">Test drive</h2>
          <p className="mt-2 text-[15px]">{m.slug === "l03" ? "Daftar untuk mendapat kabar pre-order dan ketersediaan unit." : `Coba langsung XPENG ${m.name} di dealer. Isi formulir, kami jadwalkan unit yang tersedia.`}</p>
          <div className="mt-3 flex flex-wrap gap-3"><Link href="/test-drive" className="tk !h-10">Booking test drive →</Link>
            <a className="tk blk !h-10" href={contactHref(`Halo, saya tertarik XPENG ${m.name}`)} {...(contactExternal ? { target: "_blank", rel: "noopener" } : {})}>Tanya sales <b>→</b></a></div></section>
        <Faqs faq={m.faq} />
        <section><h2 className="sec-h !text-3xl">Lihat juga</h2><ul className="mt-3 flex flex-wrap gap-3">
          {[...COMPARE[m.slug], ...COMPARES.filter((c) => c.a === m.name || c.b === m.name).map((c) => ({ href: `/bandingkan/${c.slug}`, label: c.h1 })), { href: "/harga-xpeng", label: "Daftar harga semua model" }, { href: "/panduan/garansi-baterai-xpeng", label: "Garansi baterai & servis" }, { href: "/panduan/biaya-charge-xpeng-rumah-vs-spklu", label: "Biaya charge rumah vs SPKLU" }, { href: "/dealer", label: "Dealer & kontak" }].map((l) => <li key={l.href}><Link href={l.href} className="underline underline-offset-4">{l.label}</Link></li>)}</ul></section>
        <DealerNote />
      </Section>
      <JsonLd data={[breadcrumb([{ name: "Beranda", path: "/" }, { name: `XPENG ${m.name}`, path }]), faqSchema(m.faq), ...vs.map((v) => carSchema(v, path))]} />
    </main>
  );
}

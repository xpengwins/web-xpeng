import type { Metadata } from "next";
import Link from "next/link";
import { PriceTable, Answer, Meta, PageHead, Section, DealerNote, Faqs } from "@/components/Ui";
import { VARIANTS, MODELS, rp } from "@/data/variants";
import { PRICE_MONTH } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Daftar Harga XPENG ${PRICE_MONTH} OTR Jakarta | G6, X9, G9L`,
  description: "Daftar lengkap harga XPENG G6, X9, G9L on the road Jakarta, plus status L03. Diperbarui November 2026.",
  alternates: { canonical: "/harga-xpeng" },
};
const FAQ = [
  { q: "Apa yang dimaksud harga OTR Jakarta?", a: "On the road: harga sudah termasuk biaya pengurusan kendaraan untuk wilayah Jakarta. Biaya di luar Jakarta dapat berbeda." },
  { q: "Apakah harga bisa berubah?", a: "Bisa. Harga mengikuti kebijakan APM dan promo yang berjalan; konfirmasi ke sales sebelum memesan." },
  { q: "Mobil XPENG termurah apa?", a: `Berdasarkan daftar ini, XPENG G6 Pro dengan harga ${rp(679)} OTR Jakarta.` },
];
export default function Page() {
  return (
    <main>
      <PageHead crumbs={[{ name: "Beranda", href: "/" }, { name: "Harga XPENG" }]} h1={`Daftar Harga XPENG ${PRICE_MONTH}`} lead="Harga on the road (OTR) Jakarta menurut materi APM XPENG Indonesia." />
      <Section>
        <Answer q="Berapa harga mobil XPENG?">Harga XPENG mulai {rp(679)} (G6 Pro) hingga {rp(1339)} (X9 Long Range Pro+ AWD), on the road Jakarta, per {PRICE_MONTH}. G9L Ultra AWD {rp(1289)}. XPENG L03 belum memiliki harga resmi per 29 Oktober 2026.</Answer>
        <Meta />
        <PriceTable variants={VARIANTS} />
        <p className="mono text-[9px] text-[#555]">Harga per {PRICE_MONTH}, OTR Jakarta, dapat berubah. Sumber: materi APM XPENG Indonesia; peluncuran G9L & X9 Long Range AWD 11 November 2026.</p>
        <section><h2 className="sec-h !text-3xl">Per model</h2><ul className="mt-3 grid gap-2">{MODELS.map((m) => <li key={m.slug}><Link className="font-extrabold underline underline-offset-4" href={`/model/${m.slug}`}>XPENG {m.name}</Link> — {m.headline}</li>)}</ul></section>
        <p><Link href="/simulasi-kredit" className="tk w-fit !h-10">Hitung cicilan →</Link></p>
        <Faqs faq={FAQ} />
        <DealerNote />
      </Section>
      <JsonLd data={[breadcrumb([{ name: "Beranda", path: "/" }, { name: "Harga XPENG", path: "/harga-xpeng" }]), faqSchema(FAQ)]} />
    </main>
  );
}

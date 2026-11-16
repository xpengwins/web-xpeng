import type { Metadata } from "next";
import { PageHead, Section, Answer, Meta, DealerNote, Faqs } from "@/components/Ui";
import CreditSimulator from "@/components/CreditSimulator";
import { CREDIT_TERMS, CREDIT_PERIOD } from "@/data/credit";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Simulasi Kredit XPENG ${CREDIT_PERIOD}: TDP & Cicilan | Dealer XPENG`,
  description: "Tabel TDP dan angsuran kredit XPENG G6, X9, G9L tenor 11–60 bulan: Bunga 0%, reguler, dan IMFI. Periode November 2026.",
  alternates: { canonical: "/simulasi-kredit" },
};
const FAQ = [
  { q: "Apakah ada bunga 0% untuk XPENG?", a: "Per November 2026 program Bunga 0% Jakarta tersedia untuk G6 Pro, tenor 11, 23, dan 35 bulan. Syarat mengikuti perusahaan pembiayaan." },
  { q: "Apa itu TDP?", a: "Total Down Payment: total dana awal yang dibayar sesuai tabel paket, sebelum angsuran pertama berjalan." },
  { q: "Dokumen apa yang dibutuhkan?", a: CREDIT_TERMS[0] },
];
export default function Page() {
  return (
    <main>
      <PageHead crumbs={[{ name: "Beranda", href: "/" }, { name: "Simulasi kredit" }]} h1="Simulasi Kredit XPENG" lead={`Paket leasing ${CREDIT_PERIOD}. Angka mengikuti tabel resmi paket dan dapat berubah.`} />
      <Section>
        <Answer q="Berapa cicilan mobil XPENG?">Contoh XPENG G6 Pro (OTR Rp679 juta) pada program Bunga 0%: angsuran Rp13.203.000 per bulan untuk tenor 35 bulan dengan TDP Rp249.400.000. Pilih varian di bawah untuk melihat paket lain, termasuk tenor hingga 60 bulan.</Answer>
        <Meta />
        <CreditSimulator />
        <section><h2 className="sec-h !text-3xl">Syarat & dokumen</h2><ul className="mt-3 grid list-disc gap-2 pl-5 text-[15px]">{CREDIT_TERMS.map((t) => <li key={t}>{t}</li>)}</ul>
          <p className="mono mt-3 text-[9px] text-[#555]">Persetujuan kredit sepenuhnya wewenang perusahaan pembiayaan. Asuransi: kombinasi (comprehensive + banjir + TJH) pada paket IMFI. Sumber: tabel paket leasing {CREDIT_PERIOD}.</p></section>
        <Faqs faq={FAQ} />
        <DealerNote />
      </Section>
      <JsonLd data={[breadcrumb([{ name: "Beranda", path: "/" }, { name: "Simulasi kredit", path: "/simulasi-kredit" }]), faqSchema(FAQ)]} />
    </main>
  );
}

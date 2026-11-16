import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { PageHead, Section, DealerNote, Meta } from "@/components/Ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Panduan Beli Mobil Listrik XPENG: Garansi, Charge, Servis | Dealer XPENG",
  description: "Jawaban atas pertanyaan calon pembeli XPENG: garansi baterai, biaya charge, waktu charge di rumah, servis, suku cadang, dan lainnya.",
  alternates: { canonical: "/panduan" },
};
export default function Page() {
  return (
    <main>
      <PageHead crumbs={[{ name: "Beranda", href: "/" }, { name: "Panduan" }]} h1="Panduan Calon Pemilik XPENG" lead="Jawaban atas pertanyaan yang paling sering kami terima dari calon pembeli, lengkap dengan sumber dan tanggal." />
      <Section>
        <ul className="grid gap-3">{GUIDES.map((g) => (
          <li key={g.slug} className="border-2 border-[#0d0d0d] bg-white p-4"><Link href={`/panduan/${g.slug}`} className="text-lg font-black tracking-tight underline underline-offset-4">{g.q}</Link>
            <p className="mt-1 text-sm text-[#333]">{g.desc}</p></li>))}</ul>
        <Meta /><DealerNote />
      </Section>
      <JsonLd data={breadcrumb([{ name: "Beranda", path: "/" }, { name: "Panduan", path: "/panduan" }])} />
    </main>
  );
}

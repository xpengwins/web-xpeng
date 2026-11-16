import type { Metadata } from "next";
import { PageHead, Section, DealerNote, Meta } from "@/components/Ui";
import { DEALER } from "@/lib/dealer";
import JsonLd from "@/components/JsonLd";
import { breadcrumb } from "@/lib/schema";

export const metadata: Metadata = { title: "Tentang XPENG Wins | Dealer XPENG", description: "Tentang dealer XPENG kami dan hubungan dengan XPENG Indonesia.", alternates: { canonical: "/tentang" } };
export default function Page() {
  return (
    <main>
      <PageHead crumbs={[{ name: "Beranda", href: "/" }, { name: "Tentang" }]} h1="Tentang Kami" />
      <Section>
        <p className="max-w-2xl text-[15px] leading-relaxed">{DEALER.displayName} adalah dealer XPENG yang membantu calon pembeli membandingkan varian, menghitung kredit, dan menjadwalkan test drive. Situs ini dikelola dealer; informasi resmi merek ada di situs XPENG Indonesia.</p>
        <p className="max-w-2xl text-[15px] leading-relaxed">XPENG didistribusikan di Indonesia oleh {DEALER.apmName} selaku Agen Pemegang Merek. Harga dan spesifikasi di situs ini bersumber dari materi APM dan brosur resmi, dengan tanggal pembaruan di setiap halaman.</p>
        <Meta /><DealerNote />
      </Section>
      <JsonLd data={breadcrumb([{ name: "Beranda", path: "/" }, { name: "Tentang", path: "/tentang" }])} />
    </main>
  );
}

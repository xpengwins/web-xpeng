import type { Metadata } from "next";
import { PageHead, Section, Answer, DealerNote } from "@/components/Ui";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Booking Test Drive XPENG G6, X9, G9L | Dealer XPENG Jakarta",
  description: "Booking test drive XPENG G6, X9, atau G9L. Isi nama, nomor WhatsApp, dan varian; tim kami menjadwalkan unit.",
  alternates: { canonical: "/test-drive" },
};
export default function Page() {
  return (
    <main>
      <PageHead crumbs={[{ name: "Beranda", href: "/" }, { name: "Test drive" }]} h1="Booking Test Drive XPENG" />
      <Section>
        <Answer q="Bagaimana cara test drive XPENG?">Isi formulir di bawah dengan nama, nomor WhatsApp, dan varian yang ingin dicoba. Tim kami menghubungi Anda untuk menjadwalkan unit yang tersedia. Gratis dan tanpa kewajiban membeli.</Answer>
        <LeadForm />
        <DealerNote />
      </Section>
      <JsonLd data={breadcrumb([{ name: "Beranda", path: "/" }, { name: "Test drive", path: "/test-drive" }])} />
    </main>
  );
}

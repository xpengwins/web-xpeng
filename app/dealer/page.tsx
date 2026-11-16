import type { Metadata } from "next";
import { PageHead, Section, Meta, DealerNote } from "@/components/Ui";
import { DEALER, hasIdentity, hasWhatsApp, waDisplay, contactHref, contactExternal } from "@/lib/dealer";
import JsonLd from "@/components/JsonLd";
import { breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Dealer XPENG & Kontak | XPENG Wins",
  description: "Alamat, jam operasional, dan kontak dealer XPENG.",
  alternates: { canonical: "/dealer" },
};
export default function Page() {
  const rows: [string, string][] = ([
    ["Nama dealer", DEALER.displayName], ["Badan usaha", DEALER.legalName],
    ["Alamat", [DEALER.addressLine, DEALER.district, DEALER.city, DEALER.province, DEALER.postalCode].filter(Boolean).join(", ")],
    ["Jam operasional", DEALER.openingHours], ["Jam layanan sales", DEALER.salesHours], ["Telepon", DEALER.phone], ["WhatsApp", hasWhatsApp ? waDisplay : ""], ["Email", DEALER.email],
    ["Sales consultant", DEALER.consultantName ? `${DEALER.consultantName} (${DEALER.consultantRole})` : ""],
  ] as [string, string][]).filter(([, v]) => v);
  return (
    <main>
      <PageHead crumbs={[{ name: "Beranda", href: "/" }, { name: "Dealer & kontak" }]} h1="Dealer XPENG & Kontak" />
      <Section>
        {!hasIdentity && <p className="mono border-2 border-dashed border-red-600 bg-white p-3 text-[10px]">Identitas dealer (nama PT, alamat) belum diisi di data/dealer.json.</p>}
        <dl className="grid gap-2 border-2 border-[#0d0d0d] bg-white p-5">{rows.map(([k, v]) => <div key={k} className="grid gap-1 border-b border-[#0d0d0d]/20 py-2 md:grid-cols-[180px_1fr]"><dt className="sec-lab">{k}</dt><dd className="font-bold">{v}</dd></div>)}</dl>
        <div className="flex flex-wrap gap-3">
          <a className="tk !h-10" href={contactHref("Halo, saya mau tanya XPENG")} {...(contactExternal ? { target: "_blank", rel: "noopener" } : {})}>{contactExternal ? "Chat WhatsApp →" : "Hubungi lewat formulir →"}</a>
          {DEALER.mapsUrl && <a className="tk blk !h-10" href={DEALER.mapsUrl} target="_blank" rel="noopener">Buka di Maps <b>→</b></a>}
        </div>
        {DEALER.mapsEmbedUrl && (
          <iframe title="Lokasi dealer di Google Maps" src={DEALER.mapsEmbedUrl} width="600" height="450" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="h-[340px] w-full border-2 border-[#0d0d0d]" />
        )}
        <Meta /><DealerNote />
      </Section>
      <JsonLd data={breadcrumb([{ name: "Beranda", path: "/" }, { name: "Dealer & kontak", path: "/dealer" }])} />
    </main>
  );
}

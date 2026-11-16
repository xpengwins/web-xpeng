import type { Metadata } from "next";
import { PageHead, Section, Meta } from "@/components/Ui";
import { DEALER } from "@/lib/dealer";

export const metadata: Metadata = { title: "Kebijakan Privasi | XPENG Wins", description: "Cara kami memakai data yang Anda kirim lewat formulir.", alternates: { canonical: "/kebijakan-privasi" } };
export default function Page() {
  return (
    <main>
      <PageHead crumbs={[{ name: "Beranda", href: "/" }, { name: "Kebijakan privasi" }]} h1="Kebijakan Privasi" />
      <Section>
        <div className="grid max-w-2xl gap-4 text-[15px] leading-relaxed">
          <p><b>Data yang dikumpulkan.</b> Nama, nomor WhatsApp, varian yang diminati, dan catatan opsional yang Anda isi di formulir.</p>
          <p><b>Tujuan.</b> Menghubungi Anda terkait test drive, booking, atau informasi harga dan kredit. Kami tidak meminta data identitas atau keuangan lewat formulir.</p>
          <p><b>Berbagi data.</b> Data dapat diteruskan ke tim sales {DEALER.displayName}{DEALER.legalName ? ` (${DEALER.legalName})` : ""} dan, bila Anda mengajukan kredit, ke perusahaan pembiayaan atas persetujuan Anda. Kami tidak menjual data.</p>
          <p><b>Penyimpanan.</b> Data disimpan secukupnya untuk tujuan di atas. Untuk meminta penghapusan atau koreksi, hubungi kami lewat halaman Dealer & kontak{DEALER.email ? ` atau ${DEALER.email}` : ""}.</p>
          <p><b>Cookie & analitik.</b> Situs ini tidak memasang pelacak iklan pihak ketiga secara bawaan. Bila analitik ditambahkan kelak, kebijakan ini akan diperbarui.</p>
        </div>
        <Meta />
      </Section>
    </main>
  );
}

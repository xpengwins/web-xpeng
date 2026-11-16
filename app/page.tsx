import type { Metadata } from "next";
import Link from "next/link";
import Showroom from "@/components/Showroom";
import { PriceTable, Meta, DealerNote, Faqs } from "@/components/Ui";
import { MODELS, VARIANTS, rp } from "@/data/variants";
import { PRICE_MONTH } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Harga XPENG ${PRICE_MONTH}: G6, X9, G9L | Dealer XPENG Jakarta`,
  description: "Daftar harga XPENG OTR Jakarta: G6 mulai Rp679 juta, X9 mulai Rp1,14 miliar, G9L Rp1,289 miliar. Kredit & test drive.",
  alternates: { canonical: "/" },
};

const FAQ = [
  { q: "Berapa harga mobil XPENG terbaru?", a: `G6 Pro ${rp(679)}, X9 mulai ${rp(1140)}, dan G9L Ultra AWD ${rp(1289)}, on the road Jakarta menurut materi APM ${PRICE_MONTH}. Harga dapat berubah.` },
  { q: "Apakah bisa kredit mobil XPENG?", a: "Bisa. Tersedia paket Bunga 0% untuk G6 Pro dan paket reguler/IMFI untuk model lain. Lihat halaman Simulasi Kredit." },
  { q: "Bagaimana cara test drive XPENG?", a: "Isi formulir di halaman Test Drive; tim kami akan menghubungi untuk menjadwalkan unit yang tersedia." },
];

export default function Home() {
  return (
    <main>
      <Showroom />
      <section className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:px-12">
        <div>
          <h2 className="sec-h">Harga XPENG {PRICE_MONTH}</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed">{VARIANTS.length} varian XPENG dijual mulai {rp(679)} (G6 Pro) hingga {rp(1339)} (X9 Long Range Pro+ AWD), harga on the road Jakarta. Klik varian untuk spesifikasi lengkap.</p>
          <div className="mt-4"><PriceTable /></div>
          <p className="mono mt-2 text-[9px] text-[#555]">Harga per {PRICE_MONTH}, OTR Jakarta, dapat berubah. Sumber: materi APM XPENG Indonesia.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {MODELS.map((m) => <Link key={m.slug} href={`/model/${m.slug}`} className="border-[1.5px] border-[#0d0d0d] bg-white px-4 py-2 text-sm font-extrabold hover:bg-[#0d0d0d] hover:text-[#f5e91a]">XPENG {m.name} →</Link>)}
          <Link href="/simulasi-kredit" className="tk !h-auto py-2">Simulasi kredit →</Link>
          <Link href="/test-drive" className="tk blk !h-auto py-2">Booking test drive <b>→</b></Link>
        </div>
        <Faqs faq={FAQ} />
        <Meta />
        <DealerNote />
      </section>
      <JsonLd data={faqSchema(FAQ)} />
    </main>
  );
}

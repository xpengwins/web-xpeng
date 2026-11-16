import Link from "next/link";
import { DEALER, hasIdentity, hasWhatsApp, waDisplay } from "@/lib/dealer";
import { OFFICIAL_SITE, UPDATED_LABEL } from "@/lib/site";
import { MODELS } from "@/data/variants";

export default function Footer() {
  const social = [["Instagram", DEALER.instagram], ["TikTok", DEALER.tiktok], ["YouTube", DEALER.youtube], ["Facebook", DEALER.facebook]].filter(([, u]) => u);
  return (
    <footer className="mono bg-[#0d0d0d] px-7 py-8 text-[10px] leading-[1.8] text-white">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <b className="text-[#f5e91a]">{DEALER.displayName} — Dealer XPENG</b>
          {hasIdentity ? <p>{DEALER.legalName}<br />{DEALER.addressLine}{DEALER.district ? `, ${DEALER.district}` : ""}, {DEALER.city}{DEALER.postalCode ? ` ${DEALER.postalCode}` : ""}</p> : null}
          {DEALER.openingHours ? <p>Jam operasional: {DEALER.openingHours}</p> : null}
          {(DEALER.phone || hasWhatsApp) ? <p>Telepon/WhatsApp: {DEALER.phone || waDisplay}</p> : null}
          <p className="mt-3 text-white/60">Situs ini dikelola dealer dan bukan situs resmi XPENG Indonesia. XPENG adalah merek milik pemiliknya.
            Informasi resmi: <a className="underline" href={OFFICIAL_SITE} target="_blank" rel="noopener nofollow">{OFFICIAL_SITE.replace("https://", "")}</a>.</p>
        </div>
        <div><b className="text-[#f5e91a]">Model</b>
          <ul>{MODELS.map((m) => <li key={m.slug}><Link href={`/model/${m.slug}`}>XPENG {m.name}</Link></li>)}
            <li><Link href="/harga-xpeng">Daftar harga</Link></li></ul></div>
        <div><b className="text-[#f5e91a]">Layanan</b>
          <ul><li><Link href="/simulasi-kredit">Simulasi kredit</Link></li><li><Link href="/test-drive">Test drive</Link></li>
            <li><Link href="/dealer">Dealer & kontak</Link></li><li><Link href="/tentang">Tentang</Link></li><li><Link href="/kebijakan-privasi">Kebijakan privasi</Link></li></ul>
          {social.length ? <ul className="mt-2">{social.map(([n, u]) => <li key={n}><a href={u} rel="noopener me" target="_blank">{n}</a></li>)}</ul> : null}</div>
      </div>
      <p className="mt-6 text-white/50">Harga & spesifikasi menurut materi APM XPENG Indonesia dan brosur resmi, diperbarui {UPDATED_LABEL}; dapat berubah sewaktu-waktu.</p>
    </footer>
  );
}

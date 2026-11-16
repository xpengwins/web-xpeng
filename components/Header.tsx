import Link from "next/link";
import { contactHref, contactExternal } from "@/lib/dealer";

export default function Header() {
  return (
    <header className="hdr">
      <Link href="/" className="logo">XPENG<small>WINS</small></Link>
      <nav className="nav" aria-label="Utama">
        <Link href="/#top">The Line</Link><Link href="/harga-xpeng">Harga</Link>
        <Link href="/simulasi-kredit">Kredit</Link><Link href="/test-drive">Test Drive</Link><Link href="/dealer">Dealer</Link>
      </nav>
      <a className="tag" href={contactHref("Halo, saya mau tanya XPENG")} {...(contactExternal ? { target: "_blank", rel: "noopener" } : {})}>HUBUNGI →</a>
    </header>
  );
}

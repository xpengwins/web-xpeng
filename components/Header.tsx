import Link from "next/link";
import { waLink } from "@/data/variants";

export default function Header() {
  return (
    <header className="hdr">
      <Link href="/" className="logo">XPENG<small>WINS</small></Link>
      <nav className="nav">
        <Link href="/#top">The Line</Link><Link href="/#detail">Detail</Link>
        <Link href="/#simulasi">Simulasi</Link><Link href="/#daftar">Daftar</Link>
      </nav>
      <a className="tag" target="_blank" rel="noopener" href={waLink("Halo, saya mau tanya XPENG")}>HUBUNGI →</a>
    </header>
  );
}

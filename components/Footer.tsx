import { WA_DISPLAY } from "@/data/variants";

export default function Footer() {
  return (
    <footer className="mono flex flex-wrap justify-between gap-4 bg-[#0d0d0d] px-7 py-6 text-[9px] leading-[1.7] text-white">
      <div><b className="text-[#f5e91a]">XPENG Wins</b><br />Konsultasi, test drive &amp; booking XPENG G6 dan X9.</div>
      <div>WhatsApp: {WA_DISPLAY}</div>
    </footer>
  );
}

import Link from "next/link";
import Showroom from "@/components/Showroom";
import CreditCalc from "@/components/CreditCalc";
import LeadForm from "@/components/LeadForm";
import { MODELS } from "@/data/variants";

export default function Home() {
  return (
    <main>
      <Showroom />
      <section className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-[#0d0d0d] bg-[#f5e91a] px-8 py-5">
        <span className="sec-lab !text-[#0d0d0d]">Lihat per model</span>
        <div className="flex gap-3">
          {MODELS.map((m) => (
            <Link key={m.slug} href={`/model/${m.slug}`} className="border-[1.5px] border-[#0d0d0d] bg-white px-4 py-2 text-sm font-extrabold hover:bg-[#0d0d0d] hover:text-[#f5e91a]">
              XPENG {m.name} →
            </Link>
          ))}
        </div>
      </section>
      <CreditCalc />
      <LeadForm />
    </main>
  );
}

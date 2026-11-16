import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CarView from "@/components/CarView";
import { MODELS, VARIANTS, COLORS, rp, waLink } from "@/data/variants";

export function generateStaticParams() { return MODELS.map((m) => ({ slug: m.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = MODELS.find((x) => x.slug === slug);
  return m ? { title: `XPENG ${m.name} — ${m.headline}`, description: m.desc } : {};
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = MODELS.find((x) => x.slug === slug);
  if (!m) notFound();
  const list = VARIANTS.filter((v) => v.model === m.name);

  return (
    <main>
      <section className="border-b-2 border-[#0d0d0d] bg-[#ecebe7] px-8 py-14 md:px-12">
        <Link href="/" className="sec-lab underline underline-offset-4">← Kembali ke The Line</Link>
        <h1 className="sec-h mt-4 !text-6xl md:!text-8xl">XPENG {m.name}</h1>
        <p className="mono mt-3 max-w-lg text-[11px] leading-relaxed text-[#444]">{m.headline} — {m.desc}</p>
      </section>
      <div className="grid md:grid-cols-2">
        {list.map((v, i) => (
          <article key={v.slug} className={"flex flex-col gap-4 border-[#0d0d0d] p-8 md:p-12 " + (i % 2 === 0 ? "md:border-r-2" : "") + " border-b-2"}>
            <div className="sec-lab">{v.tag}</div>
            <CarView variant={v} color={v.defaultColor} />
            <h2 className="text-3xl font-black tracking-tighter">{v.name}</h2>
            <div className="text-2xl font-black tracking-tighter">{rp(v.priceJt)} <span className="mono text-[9px] font-normal text-[#555]">OTR Jakarta</span></div>
            <ul className="mono grid gap-1 text-[10px] uppercase">
              {v.spec.slice(0, 3).map(([a, b]) => <li key={a} className="flex justify-between border-t border-dotted border-[#333] py-1.5"><span>{a}</span><b>{b}</b></li>)}
            </ul>
            <div className="flex gap-2">{v.colors.map((k) => <span key={k} title={COLORS[k].name} className="h-5 w-5 rounded-full border border-black/30" style={{ background: COLORS[k].hex }} />)}</div>
            <div className="flex flex-wrap gap-2">
              <Link href="/#daftar" className="tk">Test drive →</Link>
              <a className="tk blk" target="_blank" rel="noopener" href={waLink("Halo, saya tertarik XPENG " + v.name)}>WhatsApp <b>→</b></a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

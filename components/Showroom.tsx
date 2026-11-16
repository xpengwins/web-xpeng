"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { COLORS, VARIANTS, MODELS, rp, type ColorKey } from "@/data/variants";
import { contactHref, contactExternal } from "@/lib/dealer";
import CarView from "./CarView";
import Cursor from "./Cursor";

const N = VARIANTS.length;
const pad = (n: number) => String(n).padStart(2, "0");

function Swatches({ colors, active, onPick }: { colors: ColorKey[]; active: ColorKey; onPick: (k: ColorKey) => void }) {
  return (
    <div className="sw">
      {colors.map((k) => (
        <button key={k} type="button" aria-label={COLORS[k].name} title={COLORS[k].name}
          className={"dot" + (k === active ? " on" : "")} style={{ background: COLORS[k].hex }} onClick={() => onPick(k)} />
      ))}
    </div>
  );
}

export default function Showroom() {
  const [cur, setCur] = useState(0);
  const [mode, setMode] = useState<"line" | "lineup">("line");
  const [colors, setColors] = useState<ColorKey[]>(VARIANTS.map((v) => v.defaultColor));
  const [W, setW] = useState(900);
  const [ready, setReady] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const curRef = useRef(0);
  curRef.current = cur;
  const swipe = useRef<number | null>(null);

  const go = useCallback((i: number) => setCur(Math.max(0, Math.min(N - 1, i))), []);
  const setColor = (i: number, k: ColorKey) => setColors((c) => c.map((x, j) => (j === i ? k : x)));

  // ukuran stage
  useEffect(() => {
    const el = stage.current!;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => { ro.disconnect(); cancelAnimationFrame(r); };
  }, []);

  // scroll roda mouse menggeser antrean; di ujung antrean halaman boleh scroll biasa
  useEffect(() => {
    const el = stage.current!;
    let last = 0;
    const h = (e: WheelEvent) => {
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(d) < 6) return;
      const nxt = curRef.current + (d > 0 ? 1 : -1);
      if (nxt < 0 || nxt >= N) return;
      e.preventDefault();
      const t = Date.now();
      if (t - last < 520) return;
      last = t;
      setCur(nxt);
    };
    el.addEventListener("wheel", h, { passive: false });
    return () => el.removeEventListener("wheel", h);
  }, []);

  // keyboard
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest?.("input,select,textarea")) return;
      if (e.key === "ArrowRight") go(curRef.current + 1);
      if (e.key === "ArrowLeft") go(curRef.current - 1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [go]);

  const mob = W < 620;
  const figStyle = (i: number): CSSProperties => {
    const d = i - cur;
    let w: number, x: number, y = 0, s = 1, op = 1, bl = 0, z = 5, gr = 0;
    if (mode === "lineup") {
      w = W / (N + 0.6);
      x = W * 0.04 + i * ((W * 0.92) / N);
      y = i === cur ? -16 : 0;
      gr = i === cur ? 0 : 1;
    } else {
      w = Math.min(W * (mob ? 0.92 : 0.74), 680);
      const base = mob ? W * 0.04 : W * 0.24;
      if (d < 0) { x = base + W * 0.5; s = 0.9; op = 0; bl = 6; z = 1; }
      else {
        x = base - d * (mob ? W * 0.1 : W * 0.085); y = -d * 16;
        s = d === 0 ? 1 : Math.max(0.5, 0.82 - d * 0.1);
        op = d === 0 ? 1 : Math.max(0.3, 0.8 - d * 0.16);
        bl = d === 0 ? 0 : Math.min(5, d * 1.6); z = 10 - d;
      }
    }
    return {
      width: w, zIndex: z, opacity: op,
      transform: `translate(${x}px,${y}px) scale(${s})`,
      filter: `blur(${bl}px) grayscale(${gr})`,
      pointerEvents: mode === "lineup" || d > 0 ? "auto" : "none",
      transition: ready ? undefined : "none",
    };
  };

  const v = VARIANTS[cur];
  const ck = colors[cur];
  const ext = contactExternal ? { target: "_blank", rel: "noopener" } : {};

  return (
    <>
      <Cursor />
      <section className="hero" id="top">
        <div ref={stage} data-stage className={"stage" + (mode === "lineup" ? " lineup" : "")}
          onPointerDown={(e) => { if (!(e.target as HTMLElement).closest("button,a,[data-hot]")) swipe.current = e.clientX; }}
          onPointerUp={(e) => { if (swipe.current === null) return; const dx = e.clientX - swipe.current; swipe.current = null; if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); }}>
          <div className="meta">Dealer XPENG · G6 · X9 · G9L · Harga OTR Jakarta</div>
          <div className="toggle">
            <button className={mode === "line" ? "on" : ""} onClick={() => setMode("line")}>Line</button>
            <button className={mode === "lineup" ? "on" : ""} onClick={() => setMode("lineup")}>Line-up</button>
          </div>
          <div className="copy"><h1>XPENG<br />Lineup</h1>
            <p>{VARIANTS.length} varian, satu antrean. Geser barisannya — yang paling depan sedang dilayani. Ilustrasi mobil; foto unit asli menyusul.</p></div>
          <svg className="floor" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden>
            <path d={`M-20 ${560 - cur * 8} C 250 ${470 + cur * 10}, 520 ${640 - cur * 12}, 1020 ${700 - cur * 16}`}
              fill="none" stroke="#f5e91a" strokeWidth={22} strokeLinecap="round" style={{ transition: "d .8s" }} />
          </svg>
          {VARIANTS.map((x, i) => (
            <div key={x.slug} data-hot className={"fig" + (i === cur ? " pop" : "")} style={figStyle(i)} onClick={() => i !== cur && go(i)}>
              <div className="lbl">{pad(i + 1)} · {x.name}</div>
              <CarView variant={x} color={colors[i]} />
            </div>
          ))}
          <div className="serve"><span className="now">Now serving</span><span className="num">{pad(cur + 1)}</span><div className="ttl">{v.name}</div></div>
          <div className="ctrl">
            <button className="tk sq" onClick={() => go(cur - 1)} aria-label="Sebelumnya">←</button>
            <a className="tk" href="#detail">No. <b>{pad(cur + 1)}</b> &nbsp;|&nbsp; Lihat detail ↓</a>
            <button className="tk sq" onClick={() => go(cur + 1)} aria-label="Berikutnya">→</button>
          </div>
          <div className="hint">Scroll · drag · ← →</div>
          <div className="dots">{VARIANTS.map((x, i) => <i key={x.slug} data-hot className={i === cur ? "on" : ""} onClick={() => go(i)} />)}</div>
        </div>

        <aside className="aside" key={cur}>
          <div className="card"><div className="top"><span>{pad(cur + 1)} · 01/03</span><span>Harga OTR Jakarta</span></div>
            <div className="mid"><div className="big-n">{rp(v.priceJt)}</div></div>
            <div className="row"><div><div className="nm">{v.name}</div><div className="pr">{v.tag}</div></div>
              <a className="add" {...ext} href={contactHref("Halo, saya tertarik booking XPENG " + v.name)}>BOOKING</a></div></div>
          <div className="card" style={{ animationDelay: ".07s" }}><div className="top"><span>{pad(cur + 1)} · 02/03</span><span>Jarak tempuh</span></div>
            <div className="mid"><div className="big-n">{v.range}<small>{v.rangeUnit}</small></div></div>
            <div className="row"><div><div className="nm">{v.tag}</div><div className="pr">{v.spec[0][0]}: {v.spec[0][1]}</div></div>
              <Link className="add" href={`/model/${v.model.toLowerCase()}`}>SPEK</Link></div></div>
          <div className="card" style={{ animationDelay: ".14s" }}><div className="top"><span>{pad(cur + 1)} · 03/03</span><span>Pilih warna</span></div>
            <div className="mid"><Swatches colors={v.colors} active={ck} onPick={(k) => setColor(cur, k)} /></div>
            <div className="row"><div><div className="nm">{COLORS[ck].name}</div><div className="pr">Klik warna → mobil berganti</div></div>
              <Link className="add" href="/test-drive">TEST DRIVE</Link></div></div>
        </aside>
      </section>

      <section className="detail" id="detail">
        <div className="dl">
          <div className="water">{v.model}</div>
          <div className="bigcar" key={cur}><CarView variant={v} color={ck} /></div>
          <div className="cname"><span className="nb">WARNA</span><b>{COLORS[ck].name}</b></div>
          <Swatches colors={v.colors} active={ck} onPick={(k) => setColor(cur, k)} />
          <div className="na">Ilustrasi — warna dapat berbeda dengan unit asli. Pilihan warna sesuai brosur; stok dikonfirmasi sales.</div>
        </div>
        <div className="dr">
          <div><div className="lab" style={{ marginBottom: 10 }}>Pilih varian</div>
            <div className="tabs">{VARIANTS.map((x, i) => <button key={x.slug} className={"tab" + (i === cur ? " on" : "")} onClick={() => go(i)}>{x.name}</button>)}</div></div>
          <div><h2>{v.name}</h2><p className="sub">{v.sub}</p></div>
          <div className="price">{rp(v.priceJt)}<small>Harga on the road Jakarta</small></div>
          <div className="specs">{v.spec.map(([a, b]) => <div key={a}><span>{a}</span><b>{b}</b></div>)}</div>
          <div className="ctas">
            <a className="tk" {...ext} href={contactHref(`Halo, saya tertarik XPENG ${v.name} warna ${COLORS[ck].name}`)}>{contactExternal ? "Booking via WhatsApp →" : "Booking →"}</a>
            <Link className="tk blk" href="/test-drive">Test drive <b>→</b></Link>
            <Link className="tk blk" href={`/model/${v.model.toLowerCase()}`}>Halaman {v.model} <b>→</b></Link>
          </div>
          <div className="disc">Harga OTR Jakarta menurut materi APM XPENG Indonesia, November 2026; dapat berubah sewaktu-waktu. Spesifikasi menurut brosur resmi; konfirmasi ke sales sebelum memesan.</div>
        </div>
      </section>
    </>
  );
}

import { useId } from "react";
import type { CarType } from "@/data/variants";

const P = {
  g6: {
    body: "M44 178 L44 140 Q46 124 76 118 C120 108 160 86 210 68 Q250 56 300 56 L376 58 Q420 62 452 102 L528 116 Q564 124 568 150 L568 178 Q568 184 560 184 L52 184 Q44 184 44 178Z",
    win: "M200 78 Q244 66 298 66 L372 68 Q404 72 430 100 L176 100 Q186 88 200 78Z",
    lines: "M296 66 L296 100 M170 140 L470 140", wx: [150, 468], head: "M522 124 L564 138", tail: "M46 138 L74 128",
  },
  x9: {
    body: "M36 180 L36 128 Q38 104 68 96 L116 88 Q128 62 168 56 L396 54 Q438 56 460 86 L520 108 Q568 120 572 152 L572 180 Q572 186 564 186 L44 186 Q36 186 36 180Z",
    win: "M142 92 Q152 70 176 64 L392 62 Q424 64 444 92Z",
    lines: "M250 63 L250 92 M340 62 L340 92 M150 142 L500 142", wx: [138, 482], head: "M524 118 L566 134", tail: "M38 124 L62 116",
  },
};

function Wheel({ cx }: { cx: number }) {
  return (
    <g>
      <circle cx={cx} cy={184} r={44} fill="#0f1113" />
      <circle cx={cx} cy={184} r={36} fill="#17191c" />
      <circle cx={cx} cy={184} r={25} fill="#cfd3d6" />
      {[0, 72, 144, 216, 288].map((a) => (
        <line key={a} x1={cx} y1={184} x2={cx + 22 * Math.cos((a * Math.PI) / 180)} y2={184 + 22 * Math.sin((a * Math.PI) / 180)}
          stroke="#8d9296" strokeWidth={5} strokeLinecap="round" />
      ))}
      <circle cx={cx} cy={184} r={7} fill="#3a3d40" />
    </g>
  );
}

/** Ilustrasi mobil. Warna dikontrol lewat CSS variable --car pada elemen induk. */
export default function Car({ type }: { type: CarType }) {
  const id = useId().replace(/:/g, "");
  const p = P[type];
  return (
    <svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`Ilustrasi XPENG ${type.toUpperCase()}`}>
      <defs>
        <linearGradient id={`gl${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".32" />
        </linearGradient>
        <linearGradient id={`gw${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b333a" /><stop offset="1" stopColor="#0a0d10" />
        </linearGradient>
      </defs>
      <ellipse cx="305" cy="222" rx="275" ry="9" fill="#000" opacity=".2" />
      <path d={p.body} style={{ fill: "var(--car)", transition: "fill .6s" }} />
      <path d={p.body} fill={`url(#gl${id})`} style={{ opacity: "var(--gl, 1)", transition: "opacity .6s" }} />
      <path d={p.win} fill={`url(#gw${id})`} />
      <path d={p.lines} stroke="#0004" strokeWidth={1.6} fill="none" />
      <path d={p.head} stroke="#fff" strokeWidth={5} strokeLinecap="round" />
      <path d={p.head} stroke="#9fe8ff" strokeWidth={2} strokeLinecap="round" opacity={0.8} />
      <path d={p.tail} stroke="#e0262b" strokeWidth={5} strokeLinecap="round" />
      <Wheel cx={p.wx[0]} /><Wheel cx={p.wx[1]} />
    </svg>
  );
}

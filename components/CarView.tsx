import type { CSSProperties } from "react";
import Car from "./Car";
import { COLORS, PHOTOS, type ColorKey, type Variant } from "@/data/variants";

/** Foto asli kalau ada di PHOTOS, kalau tidak: ilustrasi berwarna. */
export default function CarView({ variant, color }: { variant: Variant; color: ColorKey }) {
  const c = COLORS[color];
  const photo = PHOTOS[`${variant.slug}|${color}`];
  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={photo} alt={`${variant.name} ${c.name}`} />;
  }
  const style = { "--car": c.hex, "--gl": c.matte ? 0.25 : 1 } as CSSProperties;
  return <div style={style}><Car type={variant.type} /></div>;
}

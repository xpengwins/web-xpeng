"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      const t = e.target as Element | null;
      el.style.opacity = t?.closest?.("[data-stage]") ? "1" : "0";
      el.classList.toggle("big", !!t?.closest?.("button,a,[data-hot]"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ref} className="cur" aria-hidden />;
}

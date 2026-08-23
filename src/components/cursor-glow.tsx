"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf: number | null = null;

    const tick = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      node.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf =
        Math.abs(x - cx) + Math.abs(y - cy) > 0.4
          ? window.requestAnimationFrame(tick)
          : null;
    };

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      node.style.opacity = "1";
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden />;
}

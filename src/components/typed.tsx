"use client";

import { useEffect, useState } from "react";

export function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setN(text.length), 0);
      return () => window.clearTimeout(id);
    }

    const id = window.setInterval(() => {
      setN((value) => {
        if (value >= text.length) {
          window.clearInterval(id);
          return value;
        }
        return value + 1;
      });
    }, 34);

    return () => window.clearInterval(id);
  }, [text]);

  return (
    <p className="font-mono text-[15px] leading-[2.2em] text-fg-dim min-[480px]:text-[16.5px]">
      <span className="text-accent">$&nbsp;</span>
      {text.slice(0, n)}
      <span className="caret" />
    </p>
  );
}

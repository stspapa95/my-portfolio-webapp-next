"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function reveal(el: Element) {
  el.classList.add("vis");
}

export function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 12% 0px" },
    );

    const bind = () => {
      nodes.forEach((el, i) => {
        if (el.classList.contains("vis")) return;
        if (el.getBoundingClientRect().top < window.innerHeight) {
          reveal(el);
          return;
        }
        (el as HTMLElement).style.transitionDelay = `${Math.min(i % 5, 4) * 55}ms`;
        io.observe(el);
      });
    };

    bind();
    window.addEventListener("pageshow", bind);
    window.addEventListener("load", bind);

    return () => {
      io.disconnect();
      window.removeEventListener("pageshow", bind);
      window.removeEventListener("load", bind);
    };
  }, [pathname]);

  return null;
}

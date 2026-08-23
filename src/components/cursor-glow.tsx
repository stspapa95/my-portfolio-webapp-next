"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function CursorGlow() {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!window.matchMedia("(pointer: fine)").matches) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const node = ref.current;
		if (!node) return;

		const xTo = gsap.quickTo(node, "x", { duration: 0.55, ease: "power3" });
		const yTo = gsap.quickTo(node, "y", { duration: 0.55, ease: "power3" });

		const move = (event: PointerEvent) => {
			node.style.opacity = "1";
			xTo(event.clientX);
			yTo(event.clientY);
		};

		window.addEventListener("pointermove", move, { passive: true });
		return () => window.removeEventListener("pointermove", move);
	});

	return <div ref={ref} className="cursor-glow" aria-hidden />;
}

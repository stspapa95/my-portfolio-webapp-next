"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
	gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);
}

let smoother: ScrollSmoother | null = null;

export function setSmoother(next: ScrollSmoother | null) {
	smoother = next;
}

export function getSmoother() {
	return smoother;
}

export function pauseSmoother(paused: boolean) {
	smoother?.paused(paused);
}

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText };

"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Typed } from "@/components/typed";
import { site } from "@/content/site";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

function subscribeReducedMotion(onChange: () => void) {
	const media = window.matchMedia("(prefers-reduced-motion: reduce)");
	media.addEventListener("change", onChange);
	return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Hero() {
	const stage = useRef<HTMLElement>(null);
	const title = useRef<HTMLHeadingElement>(null);
	const reduceMotion = useSyncExternalStore(
		subscribeReducedMotion,
		getReducedMotion,
		() => false,
	);
	const [typing, setTyping] = useState(reduceMotion);

	useGSAP(
		() => {
			const root = stage.current;
			const heading = title.current;
			if (!root || !heading) return;

			root.setAttribute("data-ready", "");

			if (reduceMotion) {
				return;
			}

			let split: SplitText | undefined;
			let cancelled = false;

			const play = () => {
				if (cancelled) return;

				split = SplitText.create(heading, {
					type: "lines,chars",
					linesClass: "gs-line",
					charsClass: "gs-char",
					aria: "auto",
				});

				gsap
					.timeline({ defaults: { ease: "power3.out" } })
					.from(
						split.chars,
						{
							yPercent: 118,
							rotate: 4,
							duration: 1.05,
							ease: "expo.out",
							stagger: { each: 0.022, from: "start" },
						},
						0.18,
					)
					.add(() => setTyping(true), "-=0.55")
					.from(
						".hero-cta a",
						{ y: 18, opacity: 0, duration: 0.6, stagger: 0.07 },
						"-=0.35",
					)
					.from(".hero-meta", { y: 16, opacity: 0, duration: 0.7 }, "-=0.4");
			};

			if (document.fonts?.status === "loaded") {
				play();
			} else {
				void document.fonts?.ready.then(play);
			}

			return () => {
				cancelled = true;
				split?.revert();
			};
		},
		{ scope: stage, dependencies: [reduceMotion] },
	);

	return (
		<section
			ref={stage}
			className="hero-stage relative flex min-h-svh flex-col overflow-hidden"
			id="top"
		>
			<div className="hero-parallax" aria-hidden>
				<div className="hero-glow" />
				<div className="hero-glow-2" />
			</div>

			<div className="shell relative z-[1] flex flex-1 flex-col justify-center pt-[88px] pb-16">
				<h1
					ref={title}
					className="hero-title font-display text-[length:var(--h-hero)] leading-[0.92] font-semibold tracking-[-0.04em] text-fg"
				>
					Stergios
					<br />
					Papathanasiou
				</h1>

				<div className="hero-typed mt-[22px] max-w-[62ch]">
					<Typed lines={site.taglines} play={typing} />
				</div>

				<div className="hero-cta mt-8 flex flex-wrap gap-[14px]">
					<a
						href="#work"
						className="magnetic inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-[22px] font-display text-[14.5px] font-semibold tracking-[-0.02em] text-bg"
					>
						View selected work
					</a>
					<a
						href="#contact"
						className="magnetic inline-flex min-h-11 items-center justify-center rounded-full border border-line px-[22px] font-display text-[14.5px] tracking-[-0.02em] text-fg"
					>
						Get in touch
					</a>
				</div>
			</div>

			<div className="shell relative z-[1] pb-9">
				<div className="hero-meta flex flex-wrap items-center justify-between gap-x-11 gap-y-[14px] border-t border-line pt-[18px] font-mono text-[12.5px] tracking-[0.09em] text-muted">
					<p>{site.years}</p>
					<p>{site.stack.join(" · ")}</p>
					<p className="flex items-center gap-[10px] text-accent">
						<span
							className="size-1.5 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]"
							aria-hidden
						/>
						{site.availability}
					</p>
				</div>
			</div>
		</section>
	);
}

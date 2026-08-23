"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const links = [
	{ href: "/#work", label: "Work" },
	{ href: "/#about", label: "About" },
	{ href: "/#contact", label: "Contact" },
] as const;

const [firstName, ...lastName] = site.name.split(" ");

export function Nav() {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const header = ref.current;
			if (!header) return;

			ScrollTrigger.create({
				start: "top -24px",
				end: 99999,
				onToggle: (self) => {
					header.toggleAttribute("data-scrolled", self.isActive);
				},
			});

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				return;
			}

			gsap.to("#gs-bar", {
				scaleX: 1,
				ease: "none",
				scrollTrigger: {
					trigger: document.documentElement,
					start: "top top",
					end: "bottom bottom",
					scrub: 0.25,
				},
			});
		},
		{ scope: ref },
	);

	return (
		<header ref={ref}>
			<nav aria-label="Primary">
				<a href="/" className="brand">
					{firstName} <span className="brand-last">{lastName.join(" ")}</span>
				</a>
				<div className="nav-links">
					{links.map((link) => (
						<a key={link.href} href={link.href}>
							{link.label}
						</a>
					))}
				</div>
			</nav>
			<span id="gs-bar" aria-hidden />
		</header>
	);
}

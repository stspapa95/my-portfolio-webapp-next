"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function Motion() {
	const pathname = usePathname();

	useGSAP(
		() => {
			const reduce = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");

			if (reduce) {
				gsap.set(reveals, { clearProps: "all", opacity: 1, y: 0 });
				return;
			}

			ScrollTrigger.batch("[data-reveal]", {
				start: "top 88%",
				once: true,
				onEnter: (batch) =>
					gsap.fromTo(
						batch,
						{ y: 34, opacity: 0 },
						{
							y: 0,
							opacity: 1,
							duration: 0.85,
							ease: "power3.out",
							stagger: 0.07,
							overwrite: true,
						},
					),
			});

			const hero = document.querySelector("#top");
			if (hero) {
				gsap.to(".hero-parallax", {
					yPercent: 26,
					ease: "none",
					scrollTrigger: {
						trigger: hero,
						start: "top top",
						end: "bottom top",
						scrub: 0.6,
					},
				});
			}

			const about = document.querySelector("#about");
			if (about && document.querySelector(".portrait")) {
				gsap.fromTo(
					".portrait",
					{ yPercent: -4 },
					{
						yPercent: 4,
						ease: "none",
						scrollTrigger: {
							trigger: about,
							start: "top bottom",
							end: "bottom top",
							scrub: 0.8,
						},
					},
				);
			}

			const refresh = () => ScrollTrigger.refresh();
			void document.fonts?.ready.then(refresh);
			window.addEventListener("load", refresh);

			return () => {
				window.removeEventListener("load", refresh);
			};
		},
		{ dependencies: [pathname] },
	);

	return null;
}

"use client";

import { usePathname } from "next/navigation";
import {
	getSmoother,
	gsap,
	ScrollSmoother,
	ScrollTrigger,
	setSmoother,
	useGSAP,
} from "@/lib/gsap";

const ACCENT_SHIFTS = [
	["#work", "#B4FF39"],
	["#about", "#7DD3FC"],
	["#contact", "#FF6B4A"],
] as const;

function bindMagnets() {
	const R = 90;
	const cache = new Map<
		HTMLElement,
		{
			xT: ReturnType<typeof gsap.quickTo>;
			yT: ReturnType<typeof gsap.quickTo>;
			sxT: ReturnType<typeof gsap.quickTo>;
			syT: ReturnType<typeof gsap.quickTo>;
		}
	>();

	const tweens = (btn: HTMLElement) => {
		let next = cache.get(btn);
		if (!next) {
			next = {
				xT: gsap.quickTo(btn, "x", { duration: 0.45, ease: "power3" }),
				yT: gsap.quickTo(btn, "y", { duration: 0.45, ease: "power3" }),
				sxT: gsap.quickTo(btn, "scaleX", { duration: 0.45, ease: "power3" }),
				syT: gsap.quickTo(btn, "scaleY", { duration: 0.45, ease: "power3" }),
			};
			cache.set(btn, next);
		}
		return next;
	};

	const move = (event: PointerEvent) => {
		document.querySelectorAll<HTMLElement>(".magnetic").forEach((btn) => {
			const { xT, yT, sxT, syT } = tweens(btn);
			const box = btn.getBoundingClientRect();
			const dx = event.clientX - (box.left + box.width / 2);
			const dy = event.clientY - (box.top + box.height / 2);
			if (
				Math.abs(dx) > box.width / 2 + R ||
				Math.abs(dy) > box.height / 2 + R
			) {
				xT(0);
				yT(0);
				sxT(1);
				syT(1);
				return;
			}
			xT(gsap.utils.clamp(-14, 14, dx * 0.3));
			yT(gsap.utils.clamp(-10, 10, dy * 0.35));
			sxT(1.04);
			syT(1.04);
		});
	};

	window.addEventListener("pointermove", move, { passive: true });
	return () => {
		window.removeEventListener("pointermove", move);
		cache.forEach((_, btn) => {
			gsap.set(btn, { clearProps: "x,y,scaleX,scaleY,transform" });
		});
	};
}

export function Motion() {
	const pathname = usePathname();

	useGSAP(
		() => {
			const reduce = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			const fine = window.matchMedia("(pointer: fine)").matches;
			const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
			const header = document.querySelector("header");

			if (reduce) {
				gsap.set(reveals, {
					clearProps: "y,transform,opacity",
					opacity: 1,
					y: 0,
				});
				header?.toggleAttribute("data-scrolled", window.scrollY > 24);
				return;
			}

			const wrapper = document.querySelector("#smooth-wrapper");
			const content = document.querySelector("#smooth-content");
			if (fine && wrapper && content) {
				document.documentElement.classList.add("smoother-active");
				setSmoother(
					ScrollSmoother.create({
						wrapper: "#smooth-wrapper",
						content: "#smooth-content",
						smooth: 1.05,
						effects: true,
						normalizeScroll: true,
					}),
				);
			}

			gsap.set(reveals, { clearProps: "y,scaleX,scaleY,transform,rotate" });

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
							immediateRender: false,
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

			if (header) {
				ScrollTrigger.create({
					start: "top -24px",
					end: 99999,
					onToggle: (self) => {
						header.toggleAttribute("data-scrolled", self.isActive);
					},
				});
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

			const sections = gsap.utils.toArray<HTMLElement>("main > section");
			gsap.set(sections, { transformOrigin: "center center", force3D: true });
			const skewers = sections.map((section) =>
				gsap.quickTo(section, "skewY", { duration: 0.55, ease: "power3" }),
			);
			const skewTo = (value: number) => {
				skewers.forEach((set) => set(value));
			};
			let idle = 0;

			ScrollTrigger.create({
				start: "top top",
				end: 99999,
				onUpdate: (self) => {
					const smoother = getSmoother();
					const raw = smoother ? smoother.getVelocity() : self.getVelocity();
					skewTo(gsap.utils.clamp(-2.2, 2.2, raw / -500));
					window.clearTimeout(idle);
					idle = window.setTimeout(() => skewTo(0), 90);
				},
			});

			const root = document.documentElement;
			ACCENT_SHIFTS.forEach(([selector, color]) => {
				if (!document.querySelector(selector)) return;
				gsap.to(root, {
					"--accent": color,
					ease: "none",
					scrollTrigger: {
						trigger: selector,
						start: "top 70%",
						end: "top 30%",
						scrub: 0.8,
					},
				});
			});

			const magnetCleanups = fine ? [bindMagnets()] : [];

			const refresh = () => ScrollTrigger.refresh();
			void document.fonts?.ready.then(refresh);
			window.addEventListener("load", refresh);
			refresh();

			return () => {
				window.clearTimeout(idle);
				window.removeEventListener("load", refresh);
				magnetCleanups.forEach((cleanup) => cleanup());
				document.documentElement.classList.remove("smoother-active");
				document.documentElement.style.removeProperty("--accent");
				header?.removeAttribute("data-scrolled");
				getSmoother()?.kill();
				setSmoother(null);
			};
		},
		{ dependencies: [pathname] },
	);

	return null;
}

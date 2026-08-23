"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import type { Project } from "@/content/projects";
import { gsap, useGSAP } from "@/lib/gsap";

export type ThumbRect = {
	left: number;
	top: number;
	width: number;
	height: number;
};

export function ProjectGallery({ projects }: { projects: Project[] }) {
	const root = useRef<HTMLDivElement>(null);
	const [openSlug, setOpenSlug] = useState<string | null>(null);
	const [fromRect, setFromRect] = useState<ThumbRect | null>(null);
	const openProject =
		projects.find((project) => project.slug === openSlug) ?? null;

	useGSAP(
		() => {
			if (!window.matchMedia("(pointer: fine)").matches) return;
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				return;
			}

			const cards = gsap.utils.toArray<HTMLElement>(".card-tilt");
			const cleanups = cards.map((card) => {
				gsap.set(card, {
					transformPerspective: 900,
					transformOrigin: "center",
				});
				const rx = gsap.quickTo(card, "rotationX", {
					duration: 0.5,
					ease: "power3",
				});
				const ry = gsap.quickTo(card, "rotationY", {
					duration: 0.5,
					ease: "power3",
				});

				const move = (event: PointerEvent) => {
					const box = card.getBoundingClientRect();
					ry(((event.clientX - box.left) / box.width - 0.5) * 9);
					rx(((event.clientY - box.top) / box.height - 0.5) * -7);
				};
				const leave = () => {
					rx(0);
					ry(0);
				};

				card.addEventListener("pointermove", move);
				card.addEventListener("pointerleave", leave);
				return () => {
					card.removeEventListener("pointermove", move);
					card.removeEventListener("pointerleave", leave);
				};
			});

			return () => cleanups.forEach((cleanup) => cleanup());
		},
		{ scope: root },
	);

	return (
		<div ref={root}>
			<div className="work-grid">
				{projects.map((project) => (
					<Link
						key={project.slug}
						href={`/work/${project.slug}`}
						className="card"
						data-reveal
						onClick={(event) => {
							if (
								event.metaKey ||
								event.ctrlKey ||
								event.shiftKey ||
								event.altKey ||
								event.button !== 0
							) {
								return;
							}
							event.preventDefault();
							const thumb = event.currentTarget.querySelector(".thumb");
							if (thumb) {
								const box = thumb.getBoundingClientRect();
								setFromRect({
									left: box.left,
									top: box.top,
									width: box.width,
									height: box.height,
								});
							} else {
								setFromRect(null);
							}
							setOpenSlug(project.slug);
						}}
					>
						<div className="card-tilt">
							<ProjectCard project={project} />
						</div>
					</Link>
				))}
			</div>
			<ProjectModal
				project={openProject}
				fromRect={fromRect}
				onClose={() => {
					setOpenSlug(null);
					setFromRect(null);
				}}
			/>
		</div>
	);
}

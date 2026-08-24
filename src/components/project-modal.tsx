"use client";

import { useEffect, useRef } from "react";
import { ProjectCaseStudy } from "@/components/project-case-study";
import type { ThumbRect } from "@/components/project-gallery";
import type { Project } from "@/content/projects";
import { gsap, pauseSmoother } from "@/lib/gsap";

type ProjectModalProps = {
	project: Project | null;
	fromRect?: ThumbRect | null;
	onClose: () => void;
};

const CLEAR = "x,y,scaleX,scaleY,transform,transformOrigin,opacity";

export function ProjectModal({
	project,
	fromRect,
	onClose,
}: ProjectModalProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = ref.current;
		if (!dialog) return;

		let frame = 0;
		let nested = 0;

		if (project && !dialog.open) {
			const reduce = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			const mobile = window.matchMedia("(max-width: 640px)").matches;

			if (!reduce) gsap.set(dialog, { opacity: 0 });
			dialog.showModal();
			dialog.focus();
			pauseSmoother(true);

			if (!reduce) {
				const play = () => {
					const hero = dialog.querySelector<HTMLElement>(".modal-hero");
					const copy = dialog.querySelectorAll<HTMLElement>(".modal-copy > *");

					if (!mobile && fromRect && hero) {
						const to = hero.getBoundingClientRect();
						gsap
							.timeline()
							.fromTo(
								dialog,
								{ opacity: 0 },
								{ opacity: 1, duration: 0.2, ease: "none" },
								0,
							)
							.fromTo(
								hero,
								{
									x: fromRect.left - to.left,
									y: fromRect.top - to.top,
									scaleX: fromRect.width / Math.max(to.width, 1),
									scaleY: fromRect.height / Math.max(to.height, 1),
									transformOrigin: "top left",
								},
								{
									x: 0,
									y: 0,
									scaleX: 1,
									scaleY: 1,
									duration: 0.7,
									ease: "expo.out",
									immediateRender: true,
								},
								0,
							)
							.fromTo(
								copy,
								{ y: 26, opacity: 0 },
								{
									y: 0,
									opacity: 1,
									duration: 0.6,
									stagger: 0.05,
									ease: "power3.out",
									immediateRender: true,
								},
								0.14,
							);
					} else {
						gsap.fromTo(
							dialog,
							{
								y: mobile ? 18 : 44,
								scaleX: mobile ? 1 : 0.97,
								scaleY: mobile ? 1 : 0.97,
								opacity: 0,
							},
							{
								y: 0,
								scaleX: 1,
								scaleY: 1,
								opacity: 1,
								duration: 0.65,
								ease: "expo.out",
							},
						);
					}
				};

				frame = requestAnimationFrame(() => {
					nested = requestAnimationFrame(play);
				});
			}
		}

		if (!project && dialog.open) {
			gsap.set([dialog, dialog.querySelector(".modal-hero")], {
				clearProps: CLEAR,
			});
			dialog.close();
			pauseSmoother(false);
		}

		return () => {
			cancelAnimationFrame(frame);
			cancelAnimationFrame(nested);
			gsap.killTweensOf(dialog);
			gsap.killTweensOf(dialog.querySelector(".modal-hero"));
			gsap.killTweensOf(dialog.querySelectorAll(".modal-copy > *"));
		};
	}, [fromRect, project]);

	return (
		<dialog
			ref={ref}
			className="project-dialog"
			tabIndex={-1}
			aria-labelledby="project-dialog-title"
			onClose={() => {
				pauseSmoother(false);
				onClose();
			}}
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			{project && (
				<ProjectCaseStudy
					project={project}
					headingId="project-dialog-title"
					closeAction={
						<button
							type="button"
							onClick={onClose}
							className="dialog-close"
							aria-label="Close case study"
						>
							<span aria-hidden>×</span>
						</button>
					}
				/>
			)}
		</dialog>
	);
}

"use client";

import { useEffect, useRef } from "react";
import { ProjectCaseStudy } from "@/components/project-case-study";
import type { Project } from "@/content/projects";
import { gsap } from "@/lib/gsap";

type ProjectModalProps = {
	project: Project | null;
	onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = ref.current;
		if (!dialog) return;

		if (project && !dialog.open) {
			dialog.showModal();
			dialog.focus();

			if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				const mobile = window.matchMedia("(max-width: 640px)").matches;
				gsap.fromTo(
					dialog,
					{ y: mobile ? 18 : 44, scale: mobile ? 1 : 0.97, opacity: 0 },
					{
						y: 0,
						scale: 1,
						opacity: 1,
						duration: 0.65,
						ease: "expo.out",
					},
				);
			}
		}
		if (!project && dialog.open) {
			dialog.close();
		}

		return () => {
			gsap.killTweensOf(dialog);
		};
	}, [project]);

	return (
		<dialog
			ref={ref}
			className="project-dialog"
			tabIndex={-1}
			aria-labelledby="project-dialog-title"
			onClose={onClose}
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

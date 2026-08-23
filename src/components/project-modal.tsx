"use client";

import { useEffect, useRef } from "react";
import { ProjectCaseStudy } from "@/components/project-case-study";
import type { Project } from "@/content/projects";

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
		}
		if (!project && dialog.open) {
			dialog.close();
		}
	}, [project]);

	return (
		<dialog
			ref={ref}
			className="project-dialog"
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

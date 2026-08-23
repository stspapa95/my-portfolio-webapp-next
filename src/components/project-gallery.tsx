"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import type { Project } from "@/content/projects";

export function ProjectGallery({ projects }: { projects: Project[] }) {
	const [openSlug, setOpenSlug] = useState<string | null>(null);
	const openProject =
		projects.find((project) => project.slug === openSlug) ?? null;

	return (
		<>
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
							setOpenSlug(project.slug);
						}}
					>
						<ProjectCard project={project} />
					</Link>
				))}
			</div>
			<ProjectModal project={openProject} onClose={() => setOpenSlug(null)} />
		</>
	);
}

import { ProjectMedia } from "@/components/project-media";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
	project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
	return (
		<>
			<div className="relative aspect-16/10 overflow-hidden bg-surface">
				<ProjectMedia
					src={project.image}
					alt={`${project.title} preview`}
					className="size-full"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				/>
				<div className="scrim pointer-events-none absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent transition-opacity duration-[450ms]" />
				<ul className="tags pointer-events-none absolute inset-x-[18px] bottom-[18px] flex flex-wrap gap-[7px]">
					{project.stack.map((item) => (
						<li
							key={item}
							className="rounded-[6px] border border-accent-line bg-bg/80 px-[9px] py-[5px] font-mono text-[11px] tracking-[0.09em] text-accent"
						>
							{item}
						</li>
					))}
				</ul>
			</div>

			<div className="relative flex flex-1 flex-col px-[22px] pt-[22px] pb-[26px]">
				<div className="flex items-baseline justify-between gap-4">
					<h3 className="font-display text-[22px] leading-none font-semibold tracking-[-0.035em] text-fg">
						{project.title}
					</h3>
					<time
						className="font-mono text-[12px] tracking-[0.09em] text-muted"
						dateTime={project.year}
					>
						{project.year}
					</time>
				</div>
				<p className="mt-[10px] max-w-[42ch] text-[15px] leading-[1.6] text-fg-dim">
					{project.description}
				</p>
				<span className="card-underline pointer-events-none absolute inset-x-[22px] bottom-0 h-px origin-left bg-accent" />
			</div>
		</>
	);
}

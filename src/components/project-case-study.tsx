import type { ReactNode } from "react";
import { ProjectMedia } from "@/components/project-media";
import type { Project } from "@/content/projects";

type ProjectCaseStudyProps = {
	project: Project;
	heading?: "h1" | "h2";
	headingId?: string;
	closeAction?: ReactNode;
};

export function ProjectCaseStudy({
	project,
	heading: Heading = "h2",
	headingId,
	closeAction,
}: ProjectCaseStudyProps) {
	return (
		<article>
			<div className="relative">
				<ProjectMedia
					src={project.image}
					alt={`${project.title} preview`}
					className="aspect-16/10"
					sizes="(max-width: 960px) 100vw, 960px"
					priority
				/>
				{closeAction}
			</div>

			<div className="px-[clamp(20px,4vw,32px)] pt-[26px] pb-[32px]">
				<Heading
					id={headingId}
					className="font-display text-[length:var(--h-sub)] leading-[1.05] font-semibold tracking-[-0.04em] text-fg"
				>
					{project.title}
				</Heading>
				<p className="mt-[10px] max-w-[62ch] text-[15.5px] leading-[1.6] text-fg-dim">
					{project.description}
				</p>

				<dl className="dialog-meta mt-[26px] border-y border-line py-[22px]">
					<div>
						<dt className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
							Role
						</dt>
						<dd className="mt-[7px] text-[15px] text-fg">{project.role}</dd>
					</div>
					<div>
						<dt className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
							Year
						</dt>
						<dd className="mt-[7px] text-[15px] text-fg">{project.year}</dd>
					</div>
					<div>
						<dt className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
							Stack
						</dt>
						<dd className="mt-[10px]">
							<ul className="flex flex-wrap gap-[7px]">
								{project.stack.map((item) => (
									<li
										key={item}
										className="rounded-[6px] border border-line bg-bg/50 px-[9px] py-[5px] font-mono text-[11px] tracking-[0.09em] text-accent"
									>
										{item}
									</li>
								))}
							</ul>
						</dd>
					</div>
				</dl>

				<div className="mt-[26px] max-w-[62ch] space-y-[18px] text-fg-dim">
					{project.body.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</div>

				{project.details.length > 0 && (
					<div className="dialog-shots mt-[26px]">
						{project.details.map((src, index) => (
							<ProjectMedia
								key={src}
								src={src}
								alt={`${project.title} detail ${index + 1}`}
								className="aspect-16/10 rounded-[12px] border border-line"
								sizes="(max-width: 640px) 100vw, 460px"
							/>
						))}
					</div>
				)}

				{project.links.length > 0 && (
					<div className="mt-[26px] flex flex-wrap gap-[14px]">
						{project.links.map((link) => {
							const primary = link.variant === "primary";
							return (
								<a
									key={link.href + link.label}
									href={link.href}
									target="_blank"
									rel="noreferrer"
									className={
										primary
											? "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-[22px] font-mono text-[12.5px] tracking-[0.04em] text-bg transition-transform duration-300 ease-[var(--ease)] hover:-translate-y-0.5"
											: "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line px-[22px] font-mono text-[12.5px] tracking-[0.04em] text-fg transition-colors duration-300 hover:border-fg-dim"
									}
								>
									{link.label}
									<span
										aria-hidden
										className={primary ? "text-bg" : "text-accent"}
									>
										↗
									</span>
								</a>
							);
						})}
					</div>
				)}
			</div>
		</article>
	);
}

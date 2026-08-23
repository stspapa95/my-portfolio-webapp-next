import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
	params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		return { title: "Not found", robots: { index: false, follow: false } };
	}

	const url = `/work/${project.slug}`;

	return {
		title: project.title,
		description: project.description,
		robots: {
			index: false,
			follow: true,
			googleBot: {
				index: false,
				follow: true,
				noimageindex: true,
			},
		},
		alternates: { canonical: url },
		openGraph: {
			title: `${project.title} — ${site.name}`,
			description: project.description,
			type: "article",
			url,
		},
	};
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		notFound();
	}

	return (
		<main id="main" className="relative z-[1]">
			<div className="shell section pt-[120px]">
				<div
					data-reveal
					className="overflow-hidden rounded-[16px] border border-line bg-surface-2"
				>
					<ProjectCaseStudy project={project} heading="h1" />
				</div>
				<p data-reveal className="mt-[32px]">
					<Link
						href="/#work"
						className="font-mono text-[12.5px] tracking-[0.08em] text-muted transition-colors duration-300 hover:text-fg"
					>
						← Back to {site.name}
					</Link>
				</p>
			</div>
		</main>
	);
}

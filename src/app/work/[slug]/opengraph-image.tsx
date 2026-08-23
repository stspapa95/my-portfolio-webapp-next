import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { OgCard, ogSize } from "@/lib/og-card";

export const alt = "Selected work";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export default async function OpenGraphImage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = getProject(slug);

	return new ImageResponse(
		<OgCard
			kicker={site.name}
			title={project?.title ?? "Selected work"}
			footer={
				project
					? `${project.year} · ${project.role}`
					: `${site.years} · ${site.availability}`
			}
		/>,
		size,
	);
}

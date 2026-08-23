export const site = {
	name: "Stergios Papathanasiou",
	jobTitle: "Web Developer",
	email: "sts.papa@gmail.com",
	tagline: "I build fast, precise interfaces for the web.",
	description:
		"Frontend engineer Stergios Papathanasiou designs and builds fast web interfaces & scalable web applications.",
	years: "5 yrs shipping product",
	stack: ["React", "Next", "Typescript", "WebGL"],
	availability: "Available — Sept 2026",
	keywords: [
		"Stergios Papathanasiou",
		"web developer",
		"frontend engineer",
		"Next.js",
		"React",
		"TypeScript",
	],
	socials: [
		{ label: "GitHub", href: "https://github.com/stspapa95/" },
		{ label: "LinkedIn", href: "https://www.linkedin.com/in/spapathan/" },
	],
} as const;

export function getSiteUrl() {
	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return new URL(process.env.NEXT_PUBLIC_SITE_URL);
	}

	if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
		return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
	}

	return new URL("http://localhost:3000");
}

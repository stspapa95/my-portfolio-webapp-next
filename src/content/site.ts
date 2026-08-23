export const site = {
	name: "Stergios Papathanasiou",
	email: "sts.papa@gmail.com",
	tagline: "I build fast, precise interfaces for the web.",
	years: "5 yrs shipping product",
	stack: ["React", "Next", "Typescript", "WebGL"],
	availability: "Available — Sept 2026",
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

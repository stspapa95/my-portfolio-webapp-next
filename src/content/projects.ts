export type ProjectLink = {
	label: string;
	href: string;
	variant?: "primary" | "secondary";
};

export type Project = {
	slug: string;
	title: string;
	year: string;
	role: string;
	description: string;
	image?: string;
	details: string[];
	stack: string[];
	body: string[];
	links: ProjectLink[];
};

export const projects: Project[] = [
	{
		slug: "resta",
		title: "Resta",
		year: "2026",
		role: "Product & Lead frontend",
		description:
			"A work-in-progress personal budgeting tool with AI analysis and insights — cash flow, categories, and what to cut, without connecting a bank.",
		image: "/images/resta-screenshot-1.jpg",
		details: [
			"/images/resta-screenshot-2.jpg",
			"/images/resta-screenshot-3.jpg",
		],
		stack: [
			"React",
			"Next",
			"Typescript",
			"Tailwind",
			"Prisma",
			"Supabase",
			"Clerk",
		],
		body: [
			"Resta (Ρέστα) is a personal budgeting app for seeing where money goes, without accounting software and without linking a bank. You log a transaction in a couple of seconds — amount, category, save — and the month updates: cash flow, categories, subscriptions, and budgets on one screen.",
			"AI insights explain, in plain language, what changed in spending and what to cut. Twelve months of history sit behind readable charts. The product is still in progress; this is the landing and the direction of the interface.",
		],
		links: [],
	},
	{
		slug: "carlito",
		title: "Carlito",
		year: "2026",
		role: "Lead frontend",
		description:
			"E-commerce storefront for Carlito car accessories and spare parts — catalogue, search, cart, and checkout in Next.js.",
		image: "/images/carlito-project.jpg",
		details: ["/images/carlito-project-1.jpg", "/images/carlito-project-2.jpg"],
		stack: ["React", "Next", "Typescript", "Tailwind"],
		body: [
			"Carlito is an e-commerce store for car accessories and spare parts — filters, lighting, interior kits, and the SKU a driver needs to match a specific make and year. The catalogue is dense, so the storefront had to stay fast while a customer drills from category to fitment without losing the cart.",
			"I built the storefront in Next.js — catalogue, search, cart, and checkout — against a Java backend, so a part can go from fitment to paid order without a separate shop bolted on afterwards.",
		],
		links: [
			{
				label: "Live demo",
				href: "https://carlito-dev.up.railway.app/",
				variant: "primary",
			},
		],
	},
];

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}

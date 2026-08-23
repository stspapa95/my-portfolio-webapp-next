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

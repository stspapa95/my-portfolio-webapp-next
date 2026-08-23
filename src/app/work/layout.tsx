import type { Metadata } from "next";

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: true,
		googleBot: {
			index: false,
			follow: true,
			noimageindex: true,
		},
	},
};

export default function WorkLayout({ children }: LayoutProps<"/work">) {
	return children;
}

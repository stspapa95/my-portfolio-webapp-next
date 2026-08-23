import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { CursorGlow } from "@/components/cursor-glow";
import { Nav } from "@/components/nav";
import { Reveals } from "@/components/reveals";
import { getSiteUrl, site } from "@/content/site";
import "./globals.css";

const display = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space",
});

const body = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const mono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains",
});

export const metadata: Metadata = {
	metadataBase: getSiteUrl(),
	title: {
		default: site.name,
		template: `%s — ${site.name}`,
	},
	description: site.tagline,
	openGraph: {
		title: site.name,
		description: site.tagline,
		type: "website",
		locale: "en_US",
	},
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
		>
			<body className="relative z-0 min-h-full bg-bg font-body text-fg">
				<noscript>
					<style>{`[data-reveal]{opacity:1;transform:none}`}</style>
				</noscript>
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<CursorGlow />
				<Nav />
				<Reveals />
				{children}
			</body>
		</html>
	);
}

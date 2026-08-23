import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
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

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
	themeColor: "#0D0D0F",
	colorScheme: "dark",
};

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title: {
		default: `${site.name} — ${site.jobTitle}`,
		template: `%s — ${site.name}`,
	},
	description: site.description,
	applicationName: site.name,
	keywords: [...site.keywords],
	authors: [{ name: site.name, url: siteUrl.origin }],
	creator: site.name,
	publisher: site.name,
	alternates: {
		canonical: "/",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	openGraph: {
		title: `${site.name} — ${site.jobTitle}`,
		description: site.description,
		type: "website",
		locale: "en_US",
		url: "/",
		siteName: site.name,
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
				<Analytics />
			</body>
		</html>
	);
}

import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
	const origin = getSiteUrl().origin;

	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${origin}/sitemap.xml`,
		host: origin,
	};
}

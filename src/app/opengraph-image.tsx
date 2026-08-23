import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { OgCard, ogSize } from "@/lib/og-card";

export const alt = site.name;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		<OgCard
			kicker={site.name}
			title={site.tagline}
			footer={`${site.years} · ${site.availability}`}
		/>,
		size,
	);
}

import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Work } from "@/components/work";
import { getSiteUrl, site } from "@/content/site";

export default function Home() {
	const origin = getSiteUrl().origin;
	const sameAs = site.socials.map((social) => social.href);

	return (
		<main id="main" className="relative z-[1]">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@graph": [
						{
							"@type": "WebSite",
							"@id": `${origin}/#website`,
							url: origin,
							name: site.name,
							description: site.description,
							inLanguage: "en",
							publisher: { "@id": `${origin}/#person` },
						},
						{
							"@type": "Person",
							"@id": `${origin}/#person`,
							name: site.name,
							jobTitle: site.jobTitle,
							url: origin,
							email: site.email,
							description: site.description,
							knowsAbout: [...site.stack],
							sameAs,
						},
					],
				}}
			/>
			<Hero />
			<Work />
			<About />
			<Contact />
		</main>
	);
}

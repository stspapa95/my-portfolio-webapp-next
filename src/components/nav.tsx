import { site } from "@/content/site";

const links = [
	{ href: "/#work", label: "Work" },
	{ href: "/#about", label: "About" },
	{ href: "/#contact", label: "Contact" },
] as const;

const [firstName, ...lastName] = site.name.split(" ");

export function Nav() {
	return (
		<header>
			<nav aria-label="Primary">
				<a href="/" className="brand">
					{firstName} <span className="brand-last">{lastName.join(" ")}</span>
				</a>
				<div className="nav-links">
					{links.map((link) => (
						<a key={link.href} href={link.href}>
							{link.label}
						</a>
					))}
				</div>
			</nav>
		</header>
	);
}

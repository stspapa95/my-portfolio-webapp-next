const skills = [
	{
		title: "Languages",
		lines: ["TypeScript / JavaScript", "HTML & CSS"],
	},
	{
		title: "Frameworks",
		lines: ["React · Next.js", "Three.js · D3"],
	},
	{
		title: "Tools",
		lines: [
			"Vite · Turborepo",
			"Playwright · Vitest",
			"Figma · Storybook",
			"Git · GitHub Actions",
			"Docker · Vercel",
		],
	},
] as const;

export function About() {
	return (
		<section id="about" aria-labelledby="about-heading" className="section relative z-[1] overflow-hidden">
			<div
				className="hero-glow top-auto right-[-8%] bottom-[-20%] opacity-80"
				aria-hidden
			/>
			<div className="shell about-grid">
				<figure
					data-reveal
					className="placeholder relative flex aspect-4/5 w-full flex-col items-center justify-center gap-[10px] overflow-hidden rounded-[14px] border border-line px-6 text-center"
				>
					<span className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
						Portrait
					</span>
					<span className="font-display text-[20px] tracking-[-0.03em] text-fg">
						Image coming soon
					</span>
				</figure>

				<div className="flex flex-col justify-center">
					<h2
						id="about-heading"
						data-reveal
						className="font-display text-[length:var(--h-sub)] leading-[1.1] font-semibold tracking-[-0.04em] text-fg"
					>
						I care about the half-second between click and response.
					</h2>

					<div
						data-reveal
						className="mt-[22px] max-w-[62ch] space-y-[18px] text-fg-dim"
					>
						<p>
							Five years building interfaces for design tools, developer
							platforms, and data-heavy products. I work close to the design
							side — type, spacing, motion — and close to the metal — bundle
							budgets, render profiles, accessibility trees.
						</p>
						<p>
							Currently a senior frontend engineer at an enterprise software
							engineering and AI agency. Before that: agency work, a stint in
							data visualisation, and one very long year maintaining a component
							library used by ten engineers.
						</p>
					</div>

					<div data-reveal className="skills-grid mt-10">
						{skills.map((group) => (
							<div key={group.title}>
								<h3 className="border-b border-line pb-[9px] font-mono text-[12.5px] tracking-[0.1em] text-accent uppercase">
									{group.title}
								</h3>

								<ul className="mt-[14px] space-y-[7px] text-[15px] text-fg-dim">
									{group.lines.map((line) => (
										<li key={line}>{line}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

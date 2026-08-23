import { site } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="section section-contact relative z-[1] overflow-hidden pt-0">
      <div
        className="hero-glow top-auto right-[8%] bottom-[10%] opacity-70"
        aria-hidden
      />
      <div className="shell">
        <h2
          data-reveal
          className="max-w-[18ch] font-display text-[length:var(--h-section)] leading-[1.05] font-semibold tracking-[-0.04em] text-fg"
        >
          Let’s build something precise.
        </h2>

        <a
          data-reveal
          href={`mailto:${site.email}`}
          className="mt-[22px] inline-block font-display text-[clamp(22px,3.4vw,36px)] tracking-[-0.03em] text-fg underline decoration-accent decoration-2 underline-offset-[10px] transition-opacity duration-300 hover:opacity-80"
        >
          {site.email}
        </a>

        <div data-reveal className="mt-8 flex flex-wrap gap-[14px]">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-[18px] font-mono text-[12.5px] tracking-[0.04em] text-fg-dim transition-colors duration-300 hover:border-accent-line hover:text-fg"
            >
              {social.label}
              <span className="text-accent" aria-hidden>
                ↗
              </span>
            </a>
          ))}
        </div>

        <p className="mt-[64px] border-t border-line pt-[22px] font-mono text-[12px] tracking-[0.08em] text-muted">
          © 2026. {site.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
}

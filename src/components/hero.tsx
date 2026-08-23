import { Typed } from "@/components/typed";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden" id="top">
      <div className="hero-glow" aria-hidden />
      <div className="hero-glow-2" aria-hidden />

      <div className="shell relative z-[1] flex flex-1 flex-col justify-center pt-[88px] pb-16">
        <h1
          data-reveal
          className="font-display text-[length:var(--h-hero)] leading-[0.92] font-semibold tracking-[-0.04em] text-fg"
        >
          Stergios
          <br />
          Papathanasiou
        </h1>

        <div data-reveal className="mt-[22px] max-w-[62ch]">
          <Typed text={site.tagline} />
        </div>

        <div data-reveal className="mt-8 flex flex-wrap gap-[14px]">
          <a
            href="#work"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-[22px] font-display text-[14.5px] font-semibold tracking-[-0.02em] text-bg transition-transform duration-300 ease-[var(--ease)] hover:-translate-y-0.5"
          >
            View selected work
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-[22px] font-display text-[14.5px] tracking-[-0.02em] text-fg transition-colors duration-300 hover:border-fg-dim"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div className="shell relative z-[1] pb-9">
        <div
          data-reveal
          className="flex flex-wrap items-center justify-between gap-x-11 gap-y-[14px] border-t border-line pt-[18px] font-mono text-[12.5px] tracking-[0.09em] text-muted"
        >
          <p>{site.years}</p>
          <p>{site.stack.join(" · ")}</p>
          <p className="flex items-center gap-[10px] text-accent">
            <span
              className="size-1.5 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]"
              aria-hidden
            />
            {site.availability}
          </p>
        </div>
      </div>
    </section>
  );
}

import { ProjectGallery } from "@/components/project-gallery";
import { projects } from "@/content/projects";

export function Work() {
  return (
    <section id="work" className="section relative z-[1]">
      <div className="shell">
        <h2
          data-reveal
          className="font-display text-[length:var(--h-section)] leading-[1.05] font-semibold tracking-[-0.04em] text-fg"
        >
          Things I’ve built.
        </h2>
        <div className="mt-[44px]">
          <ProjectGallery projects={projects} />
        </div>
      </div>
    </section>
  );
}

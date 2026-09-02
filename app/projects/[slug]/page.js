import Link from "next/link";
import { notFound } from "next/navigation";
import CasePlate from "@/components/CasePlate";
import NextChapter from "@/components/NextChapter";
import Reveal from "@/components/Reveal";
import {
  ArrowLeft,
  Calendar,
  Monitor,
  Person,
  Pin,
  Scan,
} from "@/components/Icons";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} · Meersha Jafar`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const meta = [
    { icon: <Calendar />, label: "Year", value: project.year },
    { icon: <Pin />, label: "Location", value: project.location },
    { icon: <Person />, label: "Role", value: project.role },
    { icon: <Monitor />, label: "Type", value: project.type },
    { icon: <Scan />, label: "Status", value: project.status },
  ];

  return (
    <>
    <section className="shell case">
      <Link href="/projects" className="case__back">
        <ArrowLeft width={15} height={15} /> All projects
      </Link>

      <div className="case__layout">
        <div>
          <span className="case__num">{project.number}</span>
          <h1 className="case__title">{project.title}</h1>
          <p className="case__summary">{project.summary}</p>

          <div className="chips case__chips">
            {project.stack.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>

          <div className="case__meta">
            {meta.map((row) => (
              <div key={row.label} className="case__meta-row">
                <span className="case__meta-icon">{row.icon}</span>
                <div>
                  <span className="tag">{row.label}</span>
                  <span className="case__meta-value">{row.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="case__media">
          <CasePlate project={project} />
        </div>
      </div>

      {project.process?.length ? (
        <div className="case__process">
          <span className="tag">Process</span>
          <div className="case__process-row">
            {project.process.map((item) => (
              <figure key={item.src} className="process-plate">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                  />
                ) : (
                  <img src={item.src} alt={item.caption} />
                )}
                <figcaption className="tag">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}

      <div className="case__sections">
        {project.sections.map((section, index) => (
          <Reveal key={section.heading} delay={index * 110}>
            <div className="case-section corners">
              <span className="corners__foot" />
              <span className="case-section__head">{section.heading}</span>
              <div className="case-section__body">
                {section.body.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

    </section>

      {(() => {
        const index = projects.findIndex((p) => p.slug === project.slug);
        const next = projects[(index + 1) % projects.length];
        return (
          <NextChapter
            href={`/projects/${next.slug}`}
            eyebrow="Next project"
            title={`${next.number} · ${next.title}`}
          />
        );
      })()}
    </>
  );
}


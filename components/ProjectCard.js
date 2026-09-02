import { asset } from "@/lib/asset";
import Link from "next/link";
import { ArrowNE } from "@/components/Icons";

// Two shapes for the same data: "featured" (home strip, image beside text)
// and "grid" (work page, image above text with tech chips).
export default function ProjectCard({ project, variant = "grid" }) {
  if (variant === "featured") {
    return (
      <Link href={`/projects/${project.slug}`} className="feature-card">
        <div className="feature-card__shot">
          <img
            src={asset(project.image)}
            alt={project.imageAlt}
            style={
              project.thumbPositionFeatured || project.thumbPosition
                ? {
                    objectPosition:
                      project.thumbPositionFeatured || project.thumbPosition,
                  }
                : undefined
            }
          />
        </div>
        <div className="feature-card__body">
          <span className="feature-card__num">{project.number}</span>
          <h2 className="feature-card__title">{project.title}</h2>
          <p className="feature-card__desc">{project.tagline}</p>
          <div className="feature-card__foot">
            <span className={`tag pip status--${project.statusTone}`}>
              {project.status}
            </span>
            <span className="feature-card__open">
              <ArrowNE />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/projects/${project.slug}`} className="work-card">
      <div className="work-card__shot">
        <img
          src={asset(project.image)}
          alt={project.imageAlt}
          style={
            project.thumbPosition
              ? { objectPosition: project.thumbPosition }
              : undefined
          }
        />
      </div>
      <div className="work-card__body">
        <div className="work-card__meta">
          <span className="work-card__num">{project.number}</span>
          <span className={`tag pip status--${project.statusTone}`}>
            {project.status}
          </span>
        </div>
        <h2 className="work-card__title">{project.title}</h2>
        <p className="work-card__desc">{project.tagline}</p>
        <div className="work-card__foot">
          <div className="chips">
            {project.stack.slice(0, 4).map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
          <span className="work-card__open">
            <ArrowNE />
          </span>
        </div>
      </div>
    </Link>
  );
}

"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { categories, projects } from "@/data/projects";

export default function WorkExplorer() {
  const [active, setActive] = useState("all");

  const shown =
    active === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <>
      <div className="filterbar" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            className="filterbar__btn"
            data-active={active === c.key}
            aria-pressed={active === c.key}
            onClick={() => setActive(c.key)}
          >
            {c.label}
          </button>
        ))}
        <span className="filterbar__count" role="status" aria-live="polite">
          {shown.length} of {projects.length} shown
        </span>
      </div>

      <div className="work-grid">
        {shown.map((project, index) => (
          <Reveal key={project.slug} delay={index * 90}>
            <ProjectCard project={project} variant="grid" />
          </Reveal>
        ))}
      </div>
    </>
  );
}

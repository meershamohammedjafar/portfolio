"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

// Featured Work as a scroll-driven card sequence. A tall wrapper gives the
// section its scroll range; a sticky stage pins while each project flies in,
// holds, and releases; the final stretch assembles the real resting grid.
// Every value is a pure function of scroll position (one rect read, then
// transform/opacity/filter writes per frame), so reversing the scroll runs
// the sequence backwards exactly and nothing plays on its own clock.
// Reduced motion renders the plain grid with no wrapper, no pin, no motion.

const UNITS_PER_CARD = 1;
const GRID_UNITS = 0.9;
const VH_PER_UNIT = 0.85;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const backOut = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const cubicIn = (t) => t * t * t;
const cubicOut = (t) => 1 - Math.pow(1 - t, 3);

function MetaPlate({ project }) {
  return (
    <span className="seq__facts">
      <span className={`tag pip status--${project.statusTone}`}>
        {project.status}
      </span>
      <span className="tag">{project.year}</span>
      <span className="tag">{project.role}</span>
    </span>
  );
}

export default function FeaturedSequence() {
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const shadowRefs = useRef([]);
  const partRefs = useRef([]);
  const gridRef = useRef(null);
  const gridCardRefs = useRef([]);
  const showcaseRef = useRef(null);

  const [reduced, setReduced] = useState(null);

  const total = projects.length * UNITS_PER_CARD + GRID_UNITS;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced !== false) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let frame = 0;
    let running = false;

    function apply() {
      const vh = window.innerHeight;
      const rect = wrapper.getBoundingClientRect();
      const range = rect.height - vh;
      const p = clamp01(-rect.top / range) * total;

      const gridStart = projects.length * UNITS_PER_CARD;
      const showcase = showcaseRef.current;
      if (showcase) {
        showcase.style.visibility = p >= gridStart + 0.05 ? "hidden" : "visible";
      }

      projects.forEach((project, i) => {
        const card = cardRefs.current[i];
        const shadow = shadowRefs.current[i];
        const parts = partRefs.current[i] || [];
        if (!card) return;

        const local = seg(p, i * UNITS_PER_CARD, (i + 1) * UNITS_PER_CARD);
        const pin = seg(local, 0, 0.34);
        const ph = seg(local, 0.34, 0.78);
        const po = cubicIn(seg(local, 0.78, 1));
        const e = backOut(pin);

        const inX = (1 - e) * 20;
        const inY = (1 - e) * 60;
        const inZ = (1 - e) * -460;
        const rx = (1 - e) * 38 - po * 22 + 0;
        const ry = (1 - e) * -26 + (ph - 0.5) * 4;
        const rz = (1 - e) * 9 - po * 12;
        const outX = po * -18;
        const outY = po * -55;
        const outZ = po * -240;
        const scale = (0.72 + 0.28 * Math.min(e, 1.02)) * (1 - 0.1 * po);
        const driftY = (ph - 0.5) * -2;

        card.style.transform = `translate(-50%, -50%) translate3d(${
          inX + outX
        }vw, ${inY + outY + driftY}vh, ${inZ + outZ}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`;

        const visible = local > 0 && local < 1 ? 1 : 0;
        card.style.opacity = String(
          visible * Math.min(1, pin * 3) * (1 - po)
        );
        card.style.zIndex = local > 0 && local < 1 ? "3" : "1";

        const speedBlur = Math.max((1 - pin) * 3.2, po * 2.6);
        card.style.filter = speedBlur > 0.2 ? `blur(${speedBlur}px)` : "";

        if (shadow) {
          const ground = Math.min(e, 1) * (1 - po);
          shadow.style.transform = `translate(-50%, 0) scaleX(${
            0.55 + 0.45 * ground
          }) scaleY(${0.7 + 0.3 * ground})`;
          shadow.style.opacity = String(0.5 * ground * (local > 0 ? 1 : 0));
        }

        const windows = [
          [0, 0.55],
          [0.15, 0.7],
          [0.3, 0.85],
          [0.45, 1],
        ];
        parts.forEach((part, k) => {
          if (!part) return;
          const w = windows[k] || [0, 1];
          const pe = cubicOut(seg(pin, w[0], w[1]));
          part.style.opacity = String(pe * (1 - po));
          part.style.transform = `translateY(${(1 - pe) * 26}px)`;
        });
      });

      const pg = seg(p, gridStart, total);
      const grid = gridRef.current;
      if (grid) {
        grid.style.opacity = String(cubicOut(seg(pg, 0, 0.35)));
        grid.style.pointerEvents = pg > 0.6 ? "auto" : "none";
        gridCardRefs.current.forEach((cell, k) => {
          if (!cell) return;
          const ce = backOut(seg(pg, k * 0.16, k * 0.16 + 0.55));
          cell.style.transform = `translate3d(0, ${(1 - ce) * 12}vh, ${
            (1 - ce) * -160
          }px) rotateX(${(1 - ce) * 18}deg) scale(${0.86 + 0.14 * Math.min(ce, 1.01)})`;
          cell.style.opacity = String(cubicOut(seg(pg, k * 0.16, k * 0.16 + 0.4)));
        });
      }
    }

    function loop() {
      if (!running) return;
      apply();
      frame = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    io.observe(wrapper);
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    apply();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, [reduced, total]);

  const head = (
    <div className="band__head">
      <span className="tag">Featured work</span>
      <Link href="/projects" className="link-arrow">
        View all work <ArrowRight width={15} height={15} />
      </Link>
    </div>
  );

  // Reduced motion (or not yet known on the server): the plain resting grid
  if (reduced !== false) {
    return (
      <section className="shell band band--hairline">
        {head}
        <div className="featured-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} variant="featured" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <div
      className="seq band--hairline"
      ref={wrapperRef}
      style={{ height: `calc(100vh + ${total * VH_PER_UNIT * 100}vh)` }}
    >
      <div className="seq__stage">
        <div className="shell seq__inner">
          {head}

          <div className="seq__viewport" ref={showcaseRef} aria-hidden="true">
            {projects.map((project, i) => (
              <div key={project.slug} className="seq__slot">
                <span
                  className="seq__shadow"
                  ref={(el) => (shadowRefs.current[i] = el)}
                />
                <article
                  className="seq__card"
                  ref={(el) => (cardRefs.current[i] = el)}
                >
                  <div
                    className="seq__thumb"
                    ref={(el) => {
                      partRefs.current[i] = partRefs.current[i] || [];
                      partRefs.current[i][0] = el;
                    }}
                  >
                    <img src={project.image} alt="" />
                  </div>
                  <div className="seq__body">
                    <span
                      className="seq__num"
                      ref={(el) => (partRefs.current[i][1] = el)}
                    >
                      {project.number}
                    </span>
                    <h3
                      className="seq__title"
                      ref={(el) => (partRefs.current[i][2] = el)}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="seq__desc"
                      ref={(el) => (partRefs.current[i][3] = el)}
                    >
                      {project.tagline}
                    </p>
                    <div className="seq__meta">
                      <MetaPlate project={project} />
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="featured-grid seq__grid" ref={gridRef}>
            {projects.map((project, k) => (
              <div
                key={project.slug}
                className="seq__gridcell"
                ref={(el) => (gridCardRefs.current[k] = el)}
              >
                <ProjectCard project={project} variant="featured" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

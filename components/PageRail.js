"use client";

import { useEffect, useState } from "react";

// The left-edge rail from the reference: section indices that light up as
// each [data-rail-section] scrolls into view, plus the vertical scroll cue.
// Hidden below 1500px viewports (no room in the gutter) — CSS handles that.
export default function PageRail() {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("[data-rail-section]")
    );
    setCount(sections.length);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(sections.indexOf(entry.target));
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  if (!count) return null;

  return (
    <div className="page-rail" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="page-rail__idx" data-active={active === i}>
          {String(i + 1).padStart(2, "0")}
        </span>
      ))}
      <span className="page-rail__scroll">Scroll</span>
    </div>
  );
}

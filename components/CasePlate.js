"use client";

import { useEffect, useRef, useState } from "react";

// The case-study hero. Renders a real capture video when one exists,
// otherwise the still image. Reduced-motion visitors get a paused player
// with controls instead of an autoplaying loop.
export default function CasePlate({ project }) {
  const videoRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e) => {
      setReduceMotion(e.matches);
      const video = videoRef.current;
      if (video) {
        if (e.matches) video.pause();
        else video.play().catch(() => {});
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      className={`case__plate${
        project.heroFit === "full" ? " case__plate--fit" : ""
      }`}
    >
      {project.heroVideo ? (
        <video
          ref={videoRef}
          src={project.heroVideo}
          poster={project.hero}
          muted
          loop
          playsInline
          autoPlay={!reduceMotion}
          controls={reduceMotion}
          preload="metadata"
          aria-label={project.heroAlt ?? project.imageAlt}
        />
      ) : (
        <img
          src={project.hero}
          alt={project.imageAlt}
          style={
            project.heroAspect ? { aspectRatio: project.heroAspect } : undefined
          }
        />
      )}
      {project.mediaNote ? (
        <span className="case__plate-note tag">{project.mediaNote}</span>
      ) : null}
    </div>
  );
}

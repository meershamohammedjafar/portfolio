"use client";

import { useEffect, useRef, useState } from "react";

// The portrait as a computer-vision moment: it enters soft and grey, a scan
// line sweeps it, brackets lock on, and the image resolves to full colour.
// Plays once when the portrait enters the viewport. Reduced-motion visitors
// get the sharp, full-colour portrait immediately with no scan.
// States: idle -> scanning -> locked -> settled.
// By default the bracket chrome retires at "settled"; with persistCorners
// the scan's brackets instead travel outward (to the --hud-* offsets of the
// surrounding frame) and stay as the composition's permanent markers.
export default function DetectionPortrait({
  src,
  alt,
  className,
  persistCorners = false,
}) {
  const rootRef = useRef(null);
  const [state, setState] = useState("idle");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("settled");
      return;
    }

    let timers = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timers.push(setTimeout(() => setState("scanning"), 350));
        timers.push(setTimeout(() => setState("locked"), 1500));
        timers.push(setTimeout(() => setState("settled"), 3000));
      },
      { threshold: 0.35 }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <span
      className={`detect${persistCorners ? " detect--persist" : ""}`}
      data-state={state}
      ref={rootRef}
    >
      <span className="detect__media">
        <img src={src} alt={alt} className={className} />
      </span>
      <span className="detect__scanline" aria-hidden="true" />
      <span className="detect__corner detect__corner--tl" aria-hidden="true" />
      <span className="detect__corner detect__corner--tr" aria-hidden="true" />
      <span className="detect__corner detect__corner--bl" aria-hidden="true" />
      <span className="detect__corner detect__corner--br" aria-hidden="true" />
      <span className="detect__readout tag" aria-hidden="true">
        {state === "scanning" ? "Scanning ·" : "Subject · locked"}
      </span>
    </span>
  );
}

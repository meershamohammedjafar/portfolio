"use client";

import { useEffect, useRef } from "react";

// A cyan ring that trails the pointer with eased lag and swells over
// anything interactive. Fine pointers only; never rendered for touch or
// reduced-motion visitors. Transform-only updates, one rAF loop.
export default function CursorRing() {
  const ringRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const ring = ringRef.current;
    if (reduceMotion || !finePointer || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let frame;

    function onMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
      }
      const interactive = event.target.closest(
        "a, button, input, textarea, [role='button']"
      );
      targetScale = interactive ? 2.1 : 1;
    }

    function onLeave() {
      visible = false;
      ring.style.opacity = "0";
    }

    function loop() {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      scale += (targetScale - scale) * 0.18;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      frame = requestAnimationFrame(loop);
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <span ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}

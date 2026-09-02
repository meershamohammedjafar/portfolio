"use client";

import { useEffect } from "react";

// Magnetic pull for anything marked data-magnetic: within reach, the element
// leans toward the cursor (capped at a few px) and springs home when it
// leaves. One delegated listener, one rAF loop that only runs while a magnet
// is live, transform-only writes. Fine pointers only, off for reduced motion.
export default function Magnetic() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const STRENGTH = 0.32;
    const MAX = 12;
    const REACH_PAD = 70;

    const active = new Map();
    let frame = 0;
    let running = false;

    function loop() {
      let alive = false;
      for (const [el, s] of active) {
        s.x += (s.tx - s.x) * 0.18;
        s.y += (s.ty - s.y) * 0.18;
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
        if (s.done && Math.abs(s.x) < 0.05 && Math.abs(s.y) < 0.05) {
          el.style.transform = "";
          el.style.willChange = "";
          active.delete(el);
        } else {
          alive = true;
        }
      }
      if (alive) {
        frame = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    }

    function ensureLoop() {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(loop);
      }
    }

    function onMove(event) {
      const hit = event.target.closest?.("[data-magnetic]");
      if (hit && !active.has(hit)) {
        active.set(hit, { x: 0, y: 0, tx: 0, ty: 0, done: false });
        hit.style.willChange = "transform";
      }
      for (const [el, s] of active) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - s.x;
        const cy = rect.top + rect.height / 2 - s.y;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const reach = Math.max(rect.width, rect.height) / 2 + REACH_PAD;
        if (Math.hypot(dx, dy) < reach) {
          s.tx = Math.max(-MAX, Math.min(MAX, dx * STRENGTH));
          s.ty = Math.max(-MAX, Math.min(MAX, dy * STRENGTH));
          s.done = false;
        } else {
          s.tx = 0;
          s.ty = 0;
          s.done = true;
        }
      }
      if (active.size) ensureLoop();
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      active.forEach((_, el) => {
        el.style.transform = "";
        el.style.willChange = "";
      });
    };
  }, []);

  return null;
}

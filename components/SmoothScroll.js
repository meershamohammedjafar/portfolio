"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Weighted, eased scrolling on fine-pointer devices. Touch keeps native
// scrolling, and reduced-motion visitors keep the browser default entirely.
// On every route change Lenis is snapped back to the top immediately —
// otherwise its internal target still points at the previous page's bottom
// and drags the new page down there.
export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    let land = null;
    try {
      land = sessionStorage.getItem("journey-land");
      sessionStorage.removeItem("journey-land");
    } catch {
      /* private mode: default to top */
    }
    if (land === "bottom") {
      // Reverse navigation: re-enter the previous page at its end.
      // Twice, because layout can settle a beat after the route commits.
      const toBottom = () => {
        const bottom = document.documentElement.scrollHeight;
        lenisRef.current?.scrollTo(bottom, { immediate: true, force: true });
        window.scrollTo(0, bottom);
      };
      toBottom();
      const settle = setTimeout(toBottom, 80);
      return () => clearTimeout(settle);
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

// The upward half of the journey: keep scrolling at the very top of a page
// and it carries you back to the previous chapter, landing at its bottom so
// the walk backwards is continuous. Mirrors NextChapter's intent rules:
// arrival cooldown against momentum, decay between gestures, deliberate
// input only, nothing under reduced motion.

function previousFor(pathname) {
  if (pathname === "/projects") return { href: "/", label: "Home" };
  if (pathname === "/about") return { href: "/projects", label: "Work" };
  if (pathname === "/contact") return { href: "/about", label: "About" };
  const match = pathname.match(/^\/projects\/(.+)$/);
  if (match) {
    const index = projects.findIndex((p) => p.slug === match[1]);
    if (index > 0) {
      const prev = projects[index - 1];
      return { href: `/projects/${prev.slug}`, label: prev.title };
    }
    return { href: "/projects", label: "Work" };
  }
  return null;
}

export default function JourneyReverse() {
  const router = useRouter();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const prev = previousFor(pathname);

  const state = useRef({
    atTop: true,
    arrivedAt: 0,
    accum: 0,
    lastEventAt: 0,
    touchStartY: null,
    touchStartedAtTop: false,
    navigated: false,
  });

  useEffect(() => {
    if (!prev) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const s = state.current;
    s.navigated = false;
    s.accum = 0;
    // Pages open at the top, so treat mount as arrival: the tail of the
    // gesture that brought us here must not chain another navigation.
    s.atTop = window.scrollY <= 4;
    s.arrivedAt = performance.now() + 400;
    setProgress(0);

    const THRESHOLD = 360;
    const ARRIVAL_COOLDOWN = 400;
    const DECAY_GAP = 600;

    function setAccum(value) {
      s.accum = Math.max(0, Math.min(value, THRESHOLD));
      setProgress(s.accum / THRESHOLD);
    }

    function go() {
      if (s.navigated) return;
      s.navigated = true;
      setAccum(THRESHOLD);
      try {
        sessionStorage.setItem("journey-land", "bottom");
      } catch {
        /* private mode: land at top instead */
      }
      router.push(prev.href);
    }

    function addIntent(amount) {
      const now = performance.now();
      if (now - s.arrivedAt < ARRIVAL_COOLDOWN) return;
      if (now - s.lastEventAt > DECAY_GAP) s.accum = 0;
      s.lastEventAt = now;
      setAccum(s.accum + amount);
      if (s.accum >= THRESHOLD) go();
    }

    function onScroll() {
      const nowAtTop = window.scrollY <= 4;
      if (nowAtTop && !s.atTop) {
        s.arrivedAt = performance.now();
        s.accum = 0;
      }
      if (!nowAtTop && s.atTop) setAccum(0);
      s.atTop = nowAtTop;
    }

    function onWheel(event) {
      if (!s.atTop || event.deltaY >= 0) return;
      addIntent(-event.deltaY);
    }

    function onTouchStart(event) {
      s.touchStartY = event.touches[0].clientY;
      s.touchStartedAtTop = window.scrollY <= 4;
    }

    function onTouchMove(event) {
      if (!s.touchStartedAtTop || s.touchStartY == null) return;
      const delta = event.touches[0].clientY - s.touchStartY;
      if (delta <= 0) return;
      const now = performance.now();
      if (now - s.arrivedAt < ARRIVAL_COOLDOWN) return;
      s.lastEventAt = now;
      setAccum(delta * 2.2);
      if (delta * 2.2 >= THRESHOLD) go();
    }

    function onKeyDown(event) {
      if (!s.atTop) return;
      const tag = event.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || event.target.isContentEditable)
        return;
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        addIntent(THRESHOLD / 2 + 1);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pathname, prev?.href, router]);

  if (!prev) return null;

  return (
    <span
      className="prev-chapter"
      data-visible={progress > 0.03}
      aria-hidden="true"
    >
      <span className="prev-chapter__label tag">
        ↑ Back to {prev.label}
      </span>
      <span
        className="prev-chapter__progress"
        style={{ transform: `scaleX(${progress})` }}
      />
    </span>
  );
}

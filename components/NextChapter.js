"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/Icons";

// The journey seam, now active: a band at the bottom of each page that both
// links to the next chapter and advances there automatically when the visitor
// keeps scrolling past the end of the page.
//
// The advance requires deliberate intent, never momentum:
// - wheel/trackpad: extra downward delta accumulated only while already at
//   the page bottom, ignoring the first 400ms after arrival (momentum tail)
//   and resetting after a 600ms pause, until ~360px of intent is gathered
// - touch: only a swipe that STARTS while at the bottom, moving 160px up
// - keyboard: two presses of ArrowDown / PageDown / Space at the bottom
// Scrolling up is always free; back/forward and deep links are untouched;
// reduced-motion visitors get no auto-advance at all, only the link.
export default function NextChapter({ href, eyebrow, title }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const state = useRef({
    atBottom: false,
    arrivedAt: 0,
    accum: 0,
    lastEventAt: 0,
    touchStartY: null,
    touchStartedAtBottom: false,
    navigated: false,
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const s = state.current;
    const THRESHOLD = 360;
    const ARRIVAL_COOLDOWN = 400;
    const DECAY_GAP = 600;

    function isAtBottom() {
      const doc = document.documentElement;
      return window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
    }

    function setAccum(value) {
      s.accum = Math.max(0, Math.min(value, THRESHOLD));
      setProgress(s.accum / THRESHOLD);
    }

    function go() {
      if (s.navigated) return;
      s.navigated = true;
      setAccum(THRESHOLD);
      router.push(href);
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
      const nowAtBottom = isAtBottom();
      if (nowAtBottom && !s.atBottom) {
        s.arrivedAt = performance.now();
        s.accum = 0;
      }
      if (!nowAtBottom && s.atBottom) setAccum(0);
      s.atBottom = nowAtBottom;
    }

    function onWheel(event) {
      if (!s.atBottom || event.deltaY <= 0) return;
      addIntent(event.deltaY);
    }

    function onTouchStart(event) {
      s.touchStartY = event.touches[0].clientY;
      s.touchStartedAtBottom = isAtBottom();
    }

    function onTouchMove(event) {
      if (!s.touchStartedAtBottom || s.touchStartY == null) return;
      const delta = s.touchStartY - event.touches[0].clientY;
      if (delta <= 0) return;
      const now = performance.now();
      if (now - s.arrivedAt < ARRIVAL_COOLDOWN) return;
      s.lastEventAt = now;
      setAccum(delta * 2.2);
      if (delta * 2.2 >= THRESHOLD) go();
    }

    function onKeyDown(event) {
      if (!s.atBottom) return;
      const tag = event.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || event.target.isContentEditable)
        return;
      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        (event.key === " " && !event.shiftKey)
      ) {
        addIntent(THRESHOLD / 2 + 1);
      }
    }

    onScroll();
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
  }, [href, router]);

  return (
    <div className="shell">
      <Link href={href} className="next-chapter corners">
        <span className="corners__foot" />
        <span className="tag tag--accent">{eyebrow}</span>
        <span className="next-chapter__title">
          {title} <ArrowRight width={22} height={22} />
        </span>
        <span
          className="next-chapter__hint tag"
          data-visible={progress > 0.03}
          aria-hidden="true"
        >
          Keep scrolling
        </span>
        <span
          className="next-chapter__progress"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

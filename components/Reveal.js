"use client";

import { useEffect, useRef, useState } from "react";

// Reveals content the first time it scrolls into view.
// effect: "up" (default) | "left" | "right" | "scale" | "blur"
// Wrap anything: <Reveal effect="left" delay={120}><Card /></Reveal>
export default function Reveal({ children, delay = 0, effect = "up" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      data-effect={effect}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

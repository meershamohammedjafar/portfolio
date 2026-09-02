"use client";

import { useEffect, useState } from "react";

// A true reading: the current time in Dubai, ticking live. Renders a
// placeholder until mounted so server and client HTML always match.
export default function LiveClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dubai",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hero__rail-sub hero__rail-sub--clock">
      Local time · {time ?? "--:--:--"} GST
    </span>
  );
}

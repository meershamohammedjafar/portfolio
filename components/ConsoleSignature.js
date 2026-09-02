"use client";

import { useEffect } from "react";
import { site } from "@/data/projects";

// A note for people who open devtools. They are usually the ones hiring.
export default function ConsoleSignature() {
  useEffect(() => {
    if (window.__meershaConsoleSigned) return;
    window.__meershaConsoleSigned = true;

    console.log(
      "%c⌜ MEERSHA.SYS ⌟ %cvisitor inspecting the build",
      "color:#4dd8e6;font-family:monospace;letter-spacing:2px;",
      "color:#8b97a1;font-family:monospace;"
    );
    console.log(
      `%cOpening the console counts as a gesture. Good instincts.\n${site.email}`,
      "color:#4dd8e6;font-family:monospace;"
    );
  }, []);

  return null;
}

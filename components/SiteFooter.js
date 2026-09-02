import { Heart } from "@/components/Icons";
import { site } from "@/data/projects";

export default function SiteFooter() {
  return (
    <footer className="colophon">
      <div className="shell colophon__inner">
        <span className="colophon__item">
          © 2026 {site.name}. All rights reserved.
        </span>
        <span className="colophon__item colophon__item--caps">
          Built with{" "}
          <Heart width={13} height={13} className="accent-dot" /> coffee &amp;
          code
        </span>
        <span className="colophon__item colophon__item--caps">
          Based in {site.location} <span className="colophon__dot" />
        </span>
      </div>
    </footer>
  );
}

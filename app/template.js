// Remounts on every route change, so each page composes itself on entry.
// The animation lives in CSS and is disabled under prefers-reduced-motion.
export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}

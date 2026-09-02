"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ConnectMenu from "@/components/ConnectMenu";
import { site } from "@/data/projects";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="masthead">
      <div className="shell masthead__inner">
        <Link href="/" className="masthead__mark">
          {site.name}
        </Link>

        <div className="masthead__right">
          <nav className="masthead__nav">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="masthead__link"
                data-active={isActive(pathname, link.href)}
                aria-current={
                  isActive(pathname, link.href) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <ConnectMenu />
        </div>
      </div>
    </header>
  );
}

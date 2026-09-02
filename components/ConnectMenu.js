"use client";

import { asset } from "@/lib/asset";

import { useEffect, useRef, useState } from "react";
import { ArrowNE } from "@/components/Icons";
import { site } from "@/data/projects";

// The LET'S CONNECT button: opens a small channel picker instead of a page.
// Each channel carries its own pre-filled message, written for that medium.
// Instagram allows neither pre-filled DMs nor (for this account type) a
// direct DM deep link, so the profile opens and the starter line is copied.
// Email uses Gmail's web compose rather than mailto: a mailto with no mail
// app registered on the visitor's machine does nothing at all.

const whatsappText = encodeURIComponent(
  "Hey Meersha! Just went through your portfolio and I'd love to talk about a project."
);

const emailSubject = encodeURIComponent("Project enquiry (via your portfolio)");
const emailBody = encodeURIComponent(
  "Hi Meersha,\n\nI just went through your portfolio and would like to talk about a project.\n\n"
);

const instagramStarter = "Hey! Saw your portfolio, would love to chat.";

const channels = [
  {
    key: "whatsapp",
    badge: "/images/badge-whatsapp.png",
    label: "WhatsApp",
    hint: "Chat right away",
    href: `${site.whatsapp}?text=${whatsappText}`,
    newTab: true,
  },
  {
    key: "instagram",
    badge: "/images/badge-instagram.png",
    label: "Instagram",
    hint: "Profile opens, starter line copied",
    href: site.instagram,
    newTab: true,
    copy: instagramStarter,
  },
  {
    key: "email",
    badge: "/images/badge-email.png",
    label: "Email",
    hint: "Gmail compose, pre-filled",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}&su=${emailSubject}&body=${emailBody}`,
    newTab: true,
  },
];

export default function ConnectMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        const items = Array.from(
          rootRef.current?.querySelectorAll("[role='menuitem']") ?? []
        );
        if (!items.length) return;
        event.preventDefault();
        const index = items.indexOf(document.activeElement);
        const next =
          event.key === "ArrowDown"
            ? items[(index + 1) % items.length]
            : items[(index - 1 + items.length) % items.length];
        next.focus();
      }
    }

    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    rootRef.current?.querySelector("[role='menuitem']")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function onChannelClick(channel) {
    if (channel.copy) {
      try {
        navigator.clipboard?.writeText(channel.copy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        /* clipboard unavailable: the DM still opens */
      }
    }
    setOpen(false);
  }

  return (
    <span className="connect-menu" ref={rootRef}>
      <button
        type="button"
        ref={buttonRef}
        className="connect-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        data-magnetic
        onClick={() => setOpen((v) => !v)}
      >
        Let&apos;s connect <ArrowNE width={14} height={14} />
      </button>

      {open ? (
        <span className="connect-menu__panel" role="menu" aria-label="Contact channels">
          <span className="tag connect-menu__head">Pick a channel</span>
          {channels.map((channel) => (
            <a
              key={channel.key}
              role="menuitem"
              className="connect-menu__item"
              href={channel.href}
              target={channel.newTab ? "_blank" : undefined}
              rel={channel.newTab ? "noreferrer noopener" : undefined}
              onClick={() => onChannelClick(channel)}
            >
              <img src={asset(channel.badge)} alt="" className="channel__badge" />
              <span>
                <span className="connect-menu__label">{channel.label}</span>
                <span className="connect-menu__hint tag">{channel.hint}</span>
              </span>
              <ArrowNE width={14} height={14} />
            </a>
          ))}
          <span
            className="connect-menu__copied tag"
            data-visible={copied}
            role="status"
          >
            Starter line copied, paste it in the DM
          </span>
        </span>
      ) : null}
    </span>
  );
}

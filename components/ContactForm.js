"use client";

import { useState } from "react";
import { ArrowNE } from "@/components/Icons";
import { site } from "@/data/projects";

// Static site, no backend: submitting opens the visitor's own mail client
// with everything pre-filled. Honest, works everywhere, nothing to maintain.
export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function update(field) {
    return (event) =>
      setValues((v) => ({ ...v, [field]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    const subject = values.subject || `Hello from ${values.name || "your site"}`;
    const signature = [
      values.name ? `From: ${values.name}` : "",
      values.email ? `Reply to: ${values.email}` : "",
    ].filter(Boolean);
    const body = signature.length
      ? `${values.message}\r\n\r\n${signature.join("\r\n")}`
      : values.message;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="form" onSubmit={submit}>
      <span className="form__head tag">Send a message</span>
      <input
        type="text"
        placeholder="Your Name"
        aria-label="Your name"
        autoComplete="name"
        value={values.name}
        onChange={update("name")}
      />
      <input
        type="email"
        placeholder="Your Email"
        aria-label="Your email"
        autoComplete="email"
        value={values.email}
        onChange={update("email")}
      />
      <input
        type="text"
        placeholder="Subject"
        aria-label="Subject"
        value={values.subject}
        onChange={update("subject")}
      />
      <textarea
        placeholder="Message"
        aria-label="Message"
        value={values.message}
        onChange={update("message")}
        required
      />
      <button type="submit" className="form__submit" data-magnetic>
        Send message <ArrowNE width={15} height={15} />
      </button>
      <p className="form__note">
        Opens in your own email app, addressed to {site.email}. No mail app?{" "}
        <a
          className="form__gmail"
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
            site.email
          }&su=${encodeURIComponent(
            values.subject || "Hello from your portfolio"
          )}&body=${encodeURIComponent(values.message)}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          Open in Gmail
        </a>
      </p>
    </form>
  );
}

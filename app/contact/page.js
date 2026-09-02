import ContactForm from "@/components/ContactForm";
import DetectionPortrait from "@/components/DetectionPortrait";
import { ArrowNE, Globe } from "@/components/Icons";
import { site } from "@/data/projects";

export const metadata = {
  title: "Contact · Meersha Jafar",
  description:
    "Have a project in mind or just want to say hi? Get in touch with Meersha Jafar.",
};

const channels = [
  {
    icon: (
      <img src="/images/badge-email.png" alt="" className="channel__badge" />
    ),
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: (
      <img src="/images/badge-location.png" alt="" className="channel__badge" />
    ),
    label: "Location",
    value: site.location,
    href: null,
  },
  {
    icon: (
      <img src="/images/badge-whatsapp.png" alt="" className="channel__badge" />
    ),
    label: "WhatsApp",
    value: site.whatsappLabel,
    href: site.whatsapp,
  },
  {
    icon: (
      <img
        src="/images/badge-instagram.png"
        alt=""
        className="channel__badge"
      />
    ),
    label: "Instagram",
    value: site.instagramLabel,
    href: site.instagram,
  },
  {
    icon: (
      <img src="/images/badge-github.png" alt="" className="channel__badge" />
    ),
    label: "GitHub",
    value: site.githubLabel,
    href: site.github,
  },
  {
    icon: (
      <img src="/images/badge-linkedin.png" alt="" className="channel__badge" />
    ),
    label: "LinkedIn",
    value: site.linkedinLabel,
    href: site.linkedin,
  },
];

export default function ContactPage() {
  return (
    <section className="shell contact">
      <div className="contact__head">
        <span className="eyebrow">{"// Get in touch"}</span>
        <h1 className="contact__title">
          Let&apos;s build something impactful together
          <span className="accent-dot">.</span>
        </h1>
        <p className="contact__sub">
          Have a project in mind or just want to say hi? I&apos;d love to hear
          from you.
        </p>
      </div>

      <div className="contact__channels">
        {channels.map((channel) => {
          const inner = (
            <>
              <span className="channel__icon">{channel.icon}</span>
              <div>
                <span className="tag">{channel.label}</span>
                <span className="channel__value">{channel.value}</span>
              </div>
              {channel.href ? (
                <span className="channel__arrow">
                  <ArrowNE width={16} height={16} strokeWidth={2} />
                </span>
              ) : (
                <span />
              )}
            </>
          );
          return channel.href ? (
            <a
              key={channel.label}
              className="channel"
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={
                channel.href.startsWith("http")
                  ? "noreferrer noopener"
                  : undefined
              }
            >
              {inner}
            </a>
          ) : (
            <div key={channel.label} className="channel">
              {inner}
            </div>
          );
        })}

        <div className="panel contact__avail">
          <div>
            <span className="tag pip">
              Available for freelance &amp; collaborations
            </span>
            <p>
              Open to exciting opportunities and meaningful collaborations
              worldwide.
            </p>
          </div>
          <span className="contact__avail-globe">
            <Globe width={26} height={26} />
          </span>
        </div>
      </div>

      <ContactForm />

      <div className="contact__stage">
        <div className="contact__stack">
          <span className="hero__ring" aria-hidden="true" />
          <DetectionPortrait
            className="contact__portrait contact__portrait--photo"
            src="/images/portrait-contact.jpg"
            alt={`Portrait of ${site.fullName}`}
            persistCorners
          />
        </div>
      </div>
    </section>
  );
}

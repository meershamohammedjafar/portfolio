import { asset } from "@/lib/asset";
import Link from "next/link";
import DetectionPortrait from "@/components/DetectionPortrait";
import NextChapter from "@/components/NextChapter";
import PageRail from "@/components/PageRail";
import Reveal from "@/components/Reveal";
import { ArrowNE, Bolt, Box, Person, Pin, Scan, Send } from "@/components/Icons";
import { site } from "@/data/projects";

export const metadata = {
  title: "About · Meersha Jafar",
  description: site.blurb,
};

const focusAreas = [
  {
    icon: <Box />,
    name: "Computer vision",
    desc: "Real-time vision systems, image understanding and AI integration.",
  },
  {
    icon: <Scan />,
    name: "Interactive systems",
    desc: "Gesture-controlled installations and immersive interfaces.",
  },
  {
    icon: <Bolt />,
    name: "Real-time engineering",
    desc: "Building performant experiences that respond in the moment.",
  },
  {
    icon: <Person />,
    name: "User experience",
    desc: "Designing intuitive interactions that connect with people.",
  },
];

const tools = [
  "Python",
  "OpenCV",
  "Unreal Engine",
  "Blueprints",
  "UMG",
  "TouchDesigner",
  "Unity",
  "JavaScript",
  "WebRTC",
  "Full-stack development",
  "Flutter",
  "Git",
];

const journey = [
  {
    year: "2023",
    what: "Started the public trail: first repositories, learning in the open.",
  },
  {
    year: "2025",
    what: "Deep dive into Python, a hand-rolled WebRTC video chat, Flutter experiments.",
  },
  {
    year: "2026",
    what: "Rebuilt a Nissan showroom kiosk into Unreal Engine 5.8, gesture input and all.",
  },
  {
    year: "Next",
    what: "More experiments, more builds, more connection.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageRail />

      <section className="shell about" data-rail-section>
        <div>
          <span className="eyebrow">{"// About me"}</span>
          <h1 className="about__title">
            Building interactive experiences{" "}
            <span className="about__title-dim">at the</span> intersection of
            vision, code and design<span className="accent-dot">.</span>
          </h1>
          <p className="about__intro">
            I&apos;m {site.fullName}, an interactive and computer vision
            engineer who loves building immersive systems that bridge the
            physical and digital worlds. I build software, mobile applications,
            and websites as well, essentially anything a programmer can build.
            And when a project needs a thing that does not exist yet, I
            engineer it rather than wait for it.
          </p>

          <div className="about__stage">
            <span className="hero__ring" aria-hidden="true" />
            <DetectionPortrait
              className="about__portrait"
              src={asset("/images/portrait-about.png")}
              alt={`Portrait of ${site.fullName}`}
            />
          </div>
        </div>

        <div className="about__panels">
          <Reveal effect="right">
          <div className="panel">
            <span className="tag">Focus areas</span>
            <div className="focus-grid">
              {focusAreas.map((area) => (
                <div key={area.name} className="focus-cell">
                  <span className="focus-cell__icon">{area.icon}</span>
                  <div className="focus-cell__name">{area.name}</div>
                  <p className="focus-cell__desc">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
          </Reveal>

          <Reveal effect="right" delay={90}>
          <div className="panel">
            <span className="tag">Tools &amp; technologies</span>
            <div className="chips">
              {tools.map((tool) => (
                <span key={tool} className="chip">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          </Reveal>

          <div className="about__duo">
            <div className="panel">
              <span className="tag">
                <Pin width={18} height={18} /> Based in
              </span>
              <div className="basedin__city">{site.location}</div>
              <img
                className="basedin__art"
                src={asset("/images/dubai-skyline.png")}
                alt=""
                aria-hidden="true"
              />
              <p className="basedin__note">
                Available for collaborations worldwide.
              </p>
            </div>

            <div className="panel connectpanel">
              <span className="tag">
                <Send width={18} height={18} /> Let&apos;s connect
              </span>
              <p>
                I&apos;m interested in working together or have a project in
                mind?
                <br />
                Let&apos;s build something impactful.
              </p>
              <Link href="/contact" className="connect-btn" data-magnetic>
                Start a conversation <ArrowNE width={14} height={14} />
              </Link>
            </div>
          </div>

        </div>

        <Reveal effect="scale" delay={120}>
          <figure className="panel buildshot">
            <img
              src={asset("/images/on-the-build.jpg")}
              alt="Meersha at his desk, tracking code on the left monitor and the metro map scene on the right"
            />
            <figcaption className="tag">
              On the build · tracking code left, metro scene right
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="shell journey" data-rail-section>
        <span className="tag">Journey so far</span>
        <div className="journey__track">
          {journey.map((stop, index) => (
            <Reveal key={stop.year} delay={index * 120}>
              <div className="journey__item">
                <div className="journey__year">{stop.year}</div>
                <p className="journey__what">{stop.what}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <NextChapter
        href="/contact"
        eyebrow="Continue"
        title="Let's build something together"
      />
    </>
  );
}

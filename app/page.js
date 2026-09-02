import { asset } from "@/lib/asset";
import Link from "next/link";
import DetectionPortrait from "@/components/DetectionPortrait";
import FeaturedSequence from "@/components/FeaturedSequence";
import LiveClock from "@/components/LiveClock";
import NextChapter from "@/components/NextChapter";
import { ArrowRight } from "@/components/Icons";
import { site } from "@/data/projects";

export default function HomePage() {
  const words = site.headline.split(" ");

  return (
    <>
      <section className="hero">
        <div className="hero__scrollcue" aria-hidden="true">
          <span>Scroll to explore</span>
        </div>

        <div className="shell hero__inner">
          <div className="hero__copy">
            <span className="hero__designation boot boot--1">{site.role}</span>
            <h1 className="hero__title">
              {words.map((word, index) => (
                <span
                  key={index}
                  className="hero__word"
                  style={{ animationDelay: `${140 + index * 55}ms` }}
                >
                  <span
                    className="hero__word-in"
                    style={{ "--wd": `${index * 50}ms` }}
                  >
                    {word}
                    {index === words.length - 1 ? (
                      <span className="accent-dot">.</span>
                    ) : null}
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero__blurb boot boot--2">{site.blurb}</p>
            <Link href="/projects" className="hero__cta boot boot--3" data-magnetic>
              Explore my work <ArrowRight width={16} height={16} />
            </Link>
          </div>

          <div className="hero__stage boot boot--2">
            <span className="hero__ring" aria-hidden="true" />
            <DetectionPortrait
              className="hero__portrait"
              src={asset("/images/portrait-home.png")}
              alt={`Portrait of ${site.fullName}`}
            />
          </div>

          <aside className="hero__rail">
            <div className="hero__rail-item boot boot--3">
              <span className="tag">Based in</span>
              <span className="hero__rail-value">{site.location}</span>
              <span className="hero__rail-sub">{site.coordinates}</span>
              <LiveClock />
            </div>
            <div className="hero__rail-item hero__rail-item--dot boot boot--4">
              <span className="tag">Available for</span>
              <span className="hero__rail-value">{site.availability}</span>
            </div>
          </aside>
        </div>
      </section>

      <FeaturedSequence />

      <NextChapter
        href="/projects"
        eyebrow="Continue"
        title="All the work, filterable"
      />
    </>
  );
}

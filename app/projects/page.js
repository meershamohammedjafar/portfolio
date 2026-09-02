import NextChapter from "@/components/NextChapter";
import WorkExplorer from "@/components/WorkExplorer";
import { Box, Scan } from "@/components/Icons";

export const metadata = {
  title: "Work · Meersha Jafar",
  description:
    "Interactive installations that combine computer vision, real-time systems, and interactive design.",
};

export default function ProjectsPage() {
  return (
    <>
    <section className="shell">
      <div className="pagehead">
        <div>
          <span className="eyebrow">Selected work</span>
          <h1 className="pagehead__title">
            Interactive installations that engage and respond
            <span className="accent-dot">.</span>
          </h1>
          <p className="pagehead__blurb">
            A selection of projects that combine computer vision, real-time
            systems, and interactive design to create meaningful experiences.
          </p>
        </div>

        <div className="pagehead__note">
          <span className="pagehead__note-icon">
            <Scan />
          </span>
          <div>
            <span className="tag">Always exploring</span>
            <p>
              These projects represent my focus areas and technical journey.
              More experiments and collaborations coming soon.
            </p>
          </div>
        </div>
      </div>

      <WorkExplorer />

      <div className="coming-soon">
        <span className="coming-soon__icon">
          <Box />
        </span>
        <div>
          <span className="tag">More projects coming soon</span>
          <p>Always building, experimenting and exploring new ideas.</p>
        </div>
      </div>

    </section>

      <NextChapter
        href="/about"
        eyebrow="Continue"
        title="The person behind the builds"
      />
    </>
  );
}

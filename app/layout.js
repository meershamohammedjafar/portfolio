import { Archivo, IBM_Plex_Mono } from "next/font/google";
import ConsoleSignature from "@/components/ConsoleSignature";
import CursorRing from "@/components/CursorRing";
import JourneyReverse from "@/components/JourneyReverse";
import Magnetic from "@/components/Magnetic";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/data/projects";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  title: `${site.name} · ${site.role}`,
  description: site.blurb,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <span className="scroll-progress" aria-hidden="true" />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <SmoothScroll />
        <JourneyReverse />
        <CursorRing />
        <Magnetic />
        <ConsoleSignature />
      </body>
    </html>
  );
}

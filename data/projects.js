// All site content lives here. Edit this file to update projects.
// Nothing in components/ needs to change when you add or edit a project.

export const projects = [
  {
    slug: "nissan-horizon",
    number: "01",
    title: "Nissan Horizon",
    tagline: "A showroom kiosk you operate with your hands, from across the room.",
    site: "Showroom floor",
    status: "Live build",
    statusTone: "live",
    year: "2026",
    location: "Dubai, UAE",
    role: "Interactive developer",
    type: "Interactive installation",
    categories: ["real-time", "interactive-systems"],
    image: "/images/nissan-thumb.jpg",
    thumbPosition: "50% 62%",
    thumbPositionFeatured: "72% 50%",
    hero: "/images/nissan-hero.jpg",
    heroVideo: "/video/nissan-v2.mp4",
    mediaNote: "Prototype in the Unreal Editor · filmed off the monitor",
    heroAlt:
      "The Nissan Horizon prototype running in the Unreal Editor, filmed off the monitor: the attract screen, category browse, the GT-R NISMO vehicle view and the paint and wheel options",
    process: [
      {
        type: "video",
        src: "/video/nissan-early.mp4",
        caption: "Early build · hand tracking at arm's length",
      },
    ],
    imageAlt:
      "The Nissan Horizon kiosk vehicle view: a GT-R NISMO on the lit stage with a spec panel and configure menu",
    stack: ["Unreal Engine 5.8", "Lumen HWRT", "Nanite", "UMG", "Gesture input"],
    summary:
      "A gesture-controlled kiosk for a Nissan showroom in Dubai, rebuilt from an existing web kiosk into a real-time Unreal Engine environment.",
    sections: [
      {
        heading: "The problem",
        body: [
          "The original kiosk was a web application. It worked, but it framed every car head-on and flat, which is the one angle that hides what a car actually looks like. Visitors were reading a spec sheet with a picture attached.",
          "The showroom needed something closer to the car being there. Real light falling on real paint, at an angle that shows length and stance, controlled without anyone having to touch a screen that a hundred other people touched that day.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "A visitor raises a hand to wake the kiosk. From there they browse categories, select a vehicle, and move into a customizer where paint, wheels and trim change in real time. The session ends on a QR code so they can carry the build they configured out of the showroom.",
          "The camera stays locked to a fixed three-quarter hero angle, tuned once and kept for every car in the lineup.",
        ],
      },
      {
        heading: "Details worth knowing",
        body: [
          "The room is sealed and dark, lit entirely by fixtures inside the scene: a square stage with a glowing LED frame, a ceiling panel, a key light, and a trio of spots throwing visible cones through volumetric fog.",
          "Every accent in the room, floor frame and wall strips included, retints to the accent colour of the selected car. Pick the crimson one and the room turns crimson with it.",
        ],
      },
    ],
  },
  {
    slug: "ar-fitting-room",
    number: "02",
    title: "AR Fitting Room",
    tagline: "A mirror that shows you wearing something you never took off the rail.",
    site: "Retail floor",
    status: "In spec",
    statusTone: "spec",
    year: "2026",
    location: "Dubai, UAE",
    role: "Concept & technical design",
    type: "Smart-mirror kiosk",
    categories: ["computer-vision", "interactive-systems"],
    image: "/images/ar-fitting-thumb.jpg",
    hero: "/images/ar-fitting-thumb.jpg",
    mediaNote: "Concept visual · not yet built",
    imageAlt:
      "Concept visual of the smart mirror interface on a retail floor, showing a fitted garment with size and colour options",
    stack: ["Real-time try-on", "Depth camera", "Cloth simulation", "Gesture input", "Pose estimation"],
    summary:
      "A smart-mirror kiosk for retail. A customer stands in front of a display, browses the new collection with mid-air gestures, and sees garments render onto their body as they move.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Fitting rooms are a queue and a decision made in bad lighting. Most stores would happily put the new collection in front of more people if trying it on did not cost fifteen minutes and a changing cubicle.",
          "The kiosk is not meant to replace the fitting room. It is a rotating showcase for new arrivals, five to ten pieces at a time, sitting where people already walk past.",
        ],
      },
      {
        heading: "The hard part",
        body: [
          "Retailers have product photography. They do not have 3D garment models, and building them per item does not scale to a collection that turns over every few weeks.",
          "So the pipeline has to get from a flat photograph to cloth that drapes and folds correctly on a body that is moving. That constraint drives most of the architecture.",
        ],
      },
      {
        heading: "How it would work",
        body: [
          "In the spec, the system reads height, an apparent age bracket and a gender category from the camera, then filters the garment menu and shifts the interface theme to match. A teenager and a grandparent should not be handed the same screen.",
          "Browsing is a dial. Turning it in mid-air moves through the collection, and a gentle push forward selects. Tops and bottoms mix freely. At the end, a QR code sends the photo to the customer's phone.",
        ],
      },
    ],
  },
  {
    slug: "metro-assistant",
    number: "03",
    title: "Metro Assistant",
    tagline: "Ask it where you are and it shows you, rather than telling you.",
    site: "Station concourse",
    status: "First build",
    statusTone: "early",
    year: "2026",
    location: "Colombia",
    role: "Concept & technical design",
    type: "AI assistant kiosk",
    categories: ["interactive-systems", "real-time"],
    image: "/images/metro-thumb.jpg",
    thumbPosition: "50% 32%",
    hero: "/images/metro-thumb.jpg",
    heroAspect: "4 / 3",
    heroFit: "full",
    mediaNote: "Concept visual · first build below",
    process: [
      {
        type: "image",
        src: "/images/metro-first-build.jpg",
        caption: "First working build · 3D avatar, tap to talk",
      },
    ],
    imageAlt:
      "Concept visual of the metro assistant kiosk interface with a greeting, route card and tap-to-speak control",
    stack: ["3D avatar", "Speech recognition", "Route visualisation", "Live timings", "Accessible UI"],
    summary:
      "A 3D assistant kiosk for metro stations in Colombia. Passengers ask about routes, timings and stations out loud, and get an answer they can see.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Someone lost in a station asks which station this is. A text answer is close to useless to them. They need to see where they are on the map, and then see the way out.",
          "So the map is never hidden. It sits in the side panel the whole time, and any question about a place puts a marker on it.",
        ],
      },
      {
        heading: "Designed around who is actually standing there",
        body: [
          "People using this are often in a hurry, often not local, sometimes elderly, sometimes speaking a second language. The assistant is multilingual by requirement: the passenger who needs it most is usually the one furthest from home. And it waits. A pause is treated as someone thinking, not as the end of a sentence, and it holds for a real silence before it answers.",
          "When a spoken station name could plausibly be one of two, it repeats back what it heard and asks before acting on it. Getting this wrong sends someone to the wrong side of a city.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Route guidance plays as a 3D animation paced to the assistant's own speech, so it never gets ahead of someone who needs a moment. It pauses where the passenger changes line and sweeps through the stops in between, because that is the only decision they have to make.",
          "Live timings appear as a chart. Emergencies, a medical problem, a theft, something left on a train, connect straight to the nearest agent along with practical advice for the next two minutes.",
        ],
      },
      {
        heading: "Accessibility drove the interface",
        body: [
          "Large type, no dark backgrounds, high contrast, and a layout with very little on it. The measure of success is that nobody standing at this kiosk has to turn around and ask a stranger for help using it.",
        ],
      },
    ],
  },
];

export const categories = [
  { key: "all", label: "All projects" },
  { key: "computer-vision", label: "Computer vision" },
  { key: "interactive-systems", label: "Interactive systems" },
  { key: "real-time", label: "Real-time" },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export const site = {
  name: "Meersha Jafar",
  fullName: "Meersha Mohammed Jafar",
  shortName: "Meersha",
  role: "Interactive & Computer Vision Engineer",
  location: "Dubai, UAE",
  coordinates: "25.2048° N, 55.2708° E",
  email: "meershajafar@gmail.com",
  github: "https://github.com/meershamohammedjafar",
  githubLabel: "meershamohammedjafar",
  linkedin: "https://www.linkedin.com/in/meershamohammedjafar/",
  linkedinLabel: "in/meershamohammedjafar",
  whatsapp: "https://wa.me/971502863848",
  whatsappLabel: "+971 50 286 3848",
  instagram: "https://www.instagram.com/meersha_jafar/",
  instagramLabel: "meersha_jafar",
  headline: "I build interactive experiences that bridge the physical and digital worlds",
  blurb:
    "Specializing in computer vision, interactive systems, and real-time technologies to create immersive installations that sense, interpret, and respond. Software, mobile apps, and websites too, and when the tool a project needs does not exist, I engineer it new.",
  availability: "Collaborations & Opportunities",
};

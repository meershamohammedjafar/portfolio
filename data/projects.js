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
  {
    slug: "du-journey-table",
    number: "04",
    title: "du Journey Table",
    tagline: "Thirty du stories, chosen by turning a printed tag on a glass table.",
    site: "du, UAE",
    status: "Installed",
    statusTone: "live",
    year: "2026",
    location: "UAE",
    role: "Interactive programmer",
    type: "Object-recognition table",
    categories: ["interactive-systems", "real-time"],
    image: "/images/du-journey.jpg",
    thumbPosition: "62% 45%",
    thumbPositionFeatured: "62% 45%",
    hero: "/images/du-journey.jpg",
    heroVideo: "/video/du-journey-tutorial.mp4",
    mediaNote: "In-app tutorial · 3D animation of the table",
    heroAlt:
      "The in-app tutorial for the du Journey table, a 3D animation: a visitor walks up to the DISPLAX table, places the printed du tag on the glass and turns it, and the row of journey videos slides across the table",
    imageAlt:
      "A frame from the du Journey table tutorial: a hand turning the printed du tag on the glass while a row of journey videos slides across the table",
    specs: ["3 physical tags", "30 video journeys", "60 Hz tag simulation", "24/7 unattended"],
    stack: [
      "Electron",
      "Node.js",
      "TUIO over UDP",
      "DISPLAX object recognition",
      "ffmpeg",
      "SVG filters",
      "Scripted Windows deployment",
    ],
    summary:
      "A DISPLAX object-recognition table for du. Turning a printed tag scrolls through thirty video journeys. One Electron application replaced a compiled Flash build, its Adobe AIR runtime and a separate Python browser window.",
    sections: [
      {
        heading: "What the table does",
        body: [
          "A visitor puts a printed tag on the table and the journey wheel wakes up. Turning the tag scrolls through thirty video journeys, each one starting from its first frame as it arrives, and lifting the tag sends everything back to journey one.",
          "A second tag opens a short tutorial that grows out of wherever the tag was placed. A third opens a live web page inside the experience, with a keyboard drawn on the glass, so people can log in without ever seeing a desktop.",
        ],
      },
      {
        heading: "What it replaced",
        body: [
          "The table came with a build from a previous team: a compiled Flash application running on Adobe AIR, thirty Flash video files, and a separate Python browser window bolted on the side. I replaced all of it with one Electron application.",
          "Node reads the table's TUIO stream straight off the UDP port, the videos were converted to H.264 so the machine can decode them in hardware, and the web page lives inside the app as a native browser view rather than a second program fighting for the touch surface.",
        ],
      },
      {
        heading: "Tracking before pixels",
        body: [
          "Reading rotation reliably was the riskiest part, so it came first. Presence comes from the table's alive messages, rotation accumulates across full turns instead of trusting a raw angle, and a small spring simulation runs at a fixed 60 Hz so the wheel settles like a weighted dial instead of snapping. Everything that tunes the feel sits in one config file next to the executable.",
        ],
      },
      {
        heading: "Rebuilding what was inherited",
        body: [
          "The old build shipped as compiled Flash and its video format no longer plays in a modern browser engine. The new one watches a content folder, so swapping a journey means dropping in a file and nothing else. Ordering, labels and thumbnails come from the filenames.",
        ],
      },
      {
        heading: "Surprises on site",
        body: [
          "The table's sensor reports X mirrored against the picture. The wheel had passed every test by luck, because its target sits three pixels from the centre line, where a mirror image lands almost on top of itself. The tutorial tag exposed it within seconds. The fix is a transform in the config with a live readout of raw and corrected coordinates, so the next table can be dialled in without a rebuild.",
          "The browser modal went through a rewrite too: the first version showed a blank panel when the connection failed, the final one says why, logs every navigation, and raises the keyboard the moment a text box takes focus.",
        ],
      },
      {
        heading: "Left running",
        body: [
          "It is installed as a portable build with a watchdog script, autostart, a nightly restart, and plain text logs an operator can read.",
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

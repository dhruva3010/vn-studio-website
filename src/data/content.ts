export const PROJECT_URL = "https://github.com/dhruva3010/vn-studio";

export const navigation = [
  { label: "Studio", href: "#studio" },
  { label: "Features", href: "#features" },
  { label: "Local-first", href: "#local" },
  { label: "FAQ", href: "#faq" },
  { label: "Docs", href: "./docs.html" }
];

export const workflow = [
  {
    id: "write",
    label: "Write",
    title: "Start with a moment.",
    description: "Compose dialogue, direct expressions, and shape every scene in a workspace that stays out of your way.",
    image: "./images/editor.png",
    alt: "VN Studio scene editor showing Maya at the station in The Last Light",
    caption: "Scene editor · The Last Light",
    points: ["Visual scene composition", "Layered characters and expressions", "Live dialogue editing"]
  },
  {
    id: "branch",
    label: "Branch",
    title: "Give every choice a consequence.",
    description: "Connect scenes, rewire routes, and see your entire narrative take shape in one interactive story-flow map.",
    image: "./images/story-graph.png",
    alt: "VN Studio visual story-flow graph with connected scenes and branching choices",
    caption: "Story flow · Every route in view",
    points: ["Draggable story-flow graph", "Variables and visual conditions", "Reusable chapters and substories"]
  },
  {
    id: "animate",
    label: "Animate",
    title: "Let the dialogue move them.",
    description: "Bring characters and cameras to life with visual keyframes, native cutout rigs, sprite clips, and dialogue-timed cues.",
    image: "./images/motion-cue-editor.png",
    alt: "VN Studio dialogue animation cue editor with camera and character animation controls",
    caption: "Dialogue cues · Motion with intention",
    points: ["Character and camera keyframes", "Native cutout character rigs", "Scrubbable dialogue timelines"]
  },
  {
    id: "play",
    label: "Play",
    title: "Step inside your story.",
    description: "Preview with the same player used by your published games, then test every route with saves, rollback, and live inspection.",
    image: "./images/play-preview.png",
    alt: "The Last Light running in VN Studio's playable story preview with two choices",
    caption: "Shared player · What you preview is what you publish",
    points: ["Instant in-editor preview", "Save slots and story rollback", "Keyboard and controller support"]
  }
] as const;

export const capabilities = [
  {
    icon: "layers",
    title: "Scenes & characters",
    description: "Layered artwork, expressions, props, tints, stage layouts, and reusable compositions."
  },
  {
    icon: "languages",
    title: "Dialogue & localization",
    description: "Dynamic text, formatted story values, and translation catalogs that travel with your game."
  },
  {
    icon: "swords",
    title: "Encounters & progression",
    description: "Turn-based encounters, battle-style presets on 2D, 2.5D, or 3D stages, inventory, equipment, and RPG progression."
  },
  {
    icon: "save",
    title: "Saves & accessibility",
    description: "Local save slots, rollback, remappable controls, reduced motion, and readable dialogue."
  },
  {
    icon: "audio",
    title: "Sound & atmosphere",
    description: "Music, ambience, voice-over, sound cues, volume envelopes, and seamless crossfades."
  },
  {
    icon: "package",
    title: "Verified publishing",
    description: "Standalone Windows games and browser-ready Web exports, built from an isolated snapshot."
  }
] as const;

export const faqs = [
  {
    question: "Do I need to know how to code?",
    answer: "No. VN Studio is built around visual scene cards, inspectors, story-flow connections, and typed rule controls. You can author dialogue, choices, conditions, animation, encounters, and progression without writing scripts."
  },
  {
    question: "What can I publish?",
    answer: "You can build a standalone Windows game or a browser-ready Web export. Windows players do not need Godot or VN Studio installed. Web exports can be uploaded to a static HTTPS host with WebAssembly and WebGL 2 support."
  },
  {
    question: "Which platforms does VN Studio run on?",
    answer: "Windows. VN Studio installs from a Windows x64 ZIP with a built-in update and rollback, and it is tested on Windows only. Mac and Android are out of scope, both for the studio and as publishing targets."
  },
  {
    question: "Does VN Studio require an account or cloud service?",
    answer: "No. Authoring and previewing are local, with no account, telemetry, or cloud service required. Initial setup may download the pinned Godot toolchain; after that, your project stays in portable files on your machine."
  },
  {
    question: "Can I try it with an existing story?",
    answer: "Yes. VN Studio includes original sample projects, including The Last Light, so you can explore branching, story variables, animation, audio, saves, and publishing before starting a world of your own."
  },
  {
    question: "Is VN Studio still evolving?",
    answer: "Yes. VN Studio is an actively developed personal game framework with a tracked roadmap. The current studio already covers the complete authoring-to-publishing workflow, while the project documentation clearly records planned extensions and remaining scope."
  }
] as const;

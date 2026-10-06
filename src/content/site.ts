// ============================================================================
// SITE CONTENT — single source of truth for all copy/data on the site.
//
// Populated from Harshil Makwana's resume.
// ============================================================================

import type {
  AudioTrack,
  ExperienceItem,
  NavItem,
  Project,
  SkillSector,
  SocialLink,
  Stat,
  ThemeSwatch,
} from "./types";

export const siteUrl = "https://makwana8399.github.io/designer-portfolio";

export const siteConfig = {
  name: "Harshil Makwana",
  firstName: "Harshil",
  initials: "HM",
  role: "Generative AI Engineer",
  roleLine2: "AI Automation & Agentic Systems",
  eyebrow: "GTU '26 Grad",
  tagline: "ENGINEERING AUTONOMOUS SYSTEMS THAT THINK, ACT, AND SHIP.",
  bio: "Computer Engineering graduate (CGPA 8.39) with 1+ year of hands-on experience building LLM-powered autonomous agents, RAG pipelines, and generative AI systems across three internships — shipping 10+ production AI workflows and 5+ live public projects, including dual-platform publishing systems and REST APIs. Skilled in integrating LLMs with vector databases, async task pipelines, and multi-platform APIs to deliver reliable, production-grade automation. SAP Code Unnati certified (AI, Machine Learning, Deep Learning, IoT, SAP BTP) via Edunet Foundation. Focused on retrieval-augmented generation, multi-step agent orchestration, and tool-integrated LLM pipelines from prototype to cloud deployment.",
  email: "harshilmakwana8399@gmail.com",
  phone: "+91-7990780309",
  location: "Surat, Gujarat, India",
  timezone: "Asia/Kolkata",
  resumeUrl: "/resume.pdf",
  upworkUrl: "https://www.upwork.com/freelancers/~01feab09c1caf66a13?mp_source=share",
  telegramUrl: "https://t.me/makwana8399",
  availability: "OPEN_FOR_OFFERS",
  activeStack: "NEXT_R3F_GSAP",
  availabilityType: "REMOTE / HYBRID",
} as const;

// The two stat bars shown on the Home hero.
export const stats: Stat[] = [
  { label: "AI Workflows Shipped", shortLabel: "Workflows", value: 10, suffix: "+" },
  { label: "Live Public Projects", shortLabel: "Projects", value: 5, suffix: "+" },
];

// Cycles in the "Developer Stats" status dot on Home (purely cosmetic).
export const statusWords = ["ACTIVE", "SYNCING", "STABLE", "OPTIMIZING"];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", url: "https://linkedin.com/in/harshil8399" },
  { label: "GitHub", url: "https://github.com/makwana8399" },
  { label: "Upwork", url: "https://www.upwork.com/freelancers/~01feab09c1caf66a13?mp_source=share" },
  { label: "Telegram", url: "https://t.me/makwana8399" },
];

export const experience: ExperienceItem[] = [
  {
    role: "AI Automation Engineer (Intern)",
    company: "Rohtre Media",
    location: "Remote",
    start: "May 2026",
    end: "Present",
    highlights: [
      "Built a Telegram-driven publishing agent that converts a headline and source image into a branded graphic, drafts and reviews the caption and website summary, and publishes to the company website and Instagram with independent per-platform state tracking, so a partial failure retries only the failed side.",
      "Extended a content-generation agent to auto-generate and host thumbnails and publish end-to-end with zero manual writing, running 24/7 with Telegram alerts; improved publishing efficiency by ~95%, cut writer time 5x, and maintained ~90% accuracy on spot-checked output.",
      "Designed an autonomous content agent that scans 20+ YouTube channels, filters relevant sports content, and drafts articles using a self-evaluation loop that scores each draft against an SEO rubric and regenerates up to 2 revisions before selecting the best version.",
      "Built a Python-based Telegram agent for a Shopify store that generates AI model photos, drafts titles, descriptions, pricing and captions, and publishes after owner approval, with independent Shopify and Instagram/Facebook publish tracking and chat-based product management, cutting manual upload effort ~85% and publishing time ~90%.",
    ],
  },
  {
    role: "Python AI Engineer (Intern)",
    company: "Toshal Infotech Pvt. Ltd.",
    location: "Surat, India",
    start: "Nov 2025",
    end: "May 2026",
    highlights: [
      "Engineered AI-powered FastAPI microservices with Celery async task pipelines, cutting data-retrieval latency; implemented a PGVector-based RAG pipeline enabling sub-second semantic search over large document corpora.",
      "Integrated OpenAI LLMs for automated insight generation (summaries, keyword extraction, sentiment, topic detection) and channel-tracking alerts, reducing manual analysis time significantly; deployed and maintained services on Render.",
    ],
  },
  {
    role: "AI/ML Intern",
    company: "CODTECH IT Solutions Pvt. Ltd.",
    location: "Remote",
    start: "July 2025",
    end: "Aug 2025",
    highlights: [
      "Engineered an NLP Text Summarization Tool utilizing Hugging Face transformer models to generate high-fidelity extractive and abstractive summaries from dense text.",
      "Developed an end-to-end Speech Recognition System with acoustic modeling and signal preprocessing, transcribing live and recorded audio into clean, structured text.",
      "Implemented Neural Style Transfer with deep convolutional neural networks in PyTorch, blending artistic brushwork and textures onto target imagery via Gram-matrix loss optimization.",
      "Built a Generative Text Model leveraging autoregressive transformer architectures with temperature and top-p nucleus sampling for context-aware language synthesis.",
    ],
  },
];

// Skills grouped into sectors — mirrors the resume's own Technical Skills
// categories, rendered as the numbered "SECTOR_0N" grid on the About page.
export const skillSectors: SkillSector[] = [
  {
    id: "01",
    label: "Generative AI & LLMs",
    skills: [
      "LLMs",
      "Prompt Engineering",
      "OpenAI API (GPT-4o, GPT-image)",
      "RAG Pipelines",
      "Embeddings",
      "Semantic Search",
      "NLP",
      "Hugging Face Transformers",
    ],
  },
  {
    id: "02",
    label: "Agentic Systems",
    skills: [
      "Autonomous Task Agents",
      "Multi-step Tool Orchestration",
      "Self-Evaluation/Scoring Loops",
      "n8n Agentic Workflows",
    ],
  },
  {
    id: "03",
    label: "RAG & Retrieval",
    skills: [
      "Context-Injected Prompting",
      "Chroma DB",
      "FAISS",
      "Semantic Search",
      "Embedding Based Retrieval",
      "PGVector",
    ],
  },
  {
    id: "04",
    label: "Backend & Deployment",
    skills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "Celery (Async Task Queues)",
      "Docker",
      "Render",
      "Railway",
      "Netlify",
      "Git",
      "Linux",
    ],
  },
  {
    id: "05",
    label: "ML & Data",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Bidirectional LSTM",
      "Neural Networks",
    ],
  },
  {
    id: "06",
    label: "Integrations & APIs",
    skills: [
      "Twilio WhatsApp",
      "Shopify GraphQL APIs",
      "Instagram Graph API",
      "WooCommerce API",
      "Cloudflare",
      "Telegram Bot API",
      "Discord API",
      "Trello API",
    ],
  },
];

// Ordered by how strong/helpful each project is, best first — this drives
// display order on the Projects page and the Next_Project chain on each
// case-study page (which just walks this array, wrapping at the end).
export const projects: Project[] = [
  {
    id: "full-agentic-shopify-store",
    title: "Full Agentic Controlled Shopify Store",
    description:
      "Built a Telegram agent that generates AI model photos for Shopify products, drafts titles, descriptions, pricing and captions, and publishes only after owner approval, using a stateful category-based intake flow with a 24-hour approval gate.",
    image: "/images/projects/placeholder.svg",
    tags: ["Agentic AI", "Python · Telegram · Shopify GraphQL · OpenAI"],
    link: "#",
    year: "2026",
    projectType: "AGENTIC_ECOMMERCE_AUTOMATION",
    entryYear: "2026",
    targetPlatform: "SHOPIFY / TELEGRAM",
    primaryRole: "AI_AUTOMATION_ENGINEER",
    technologies: [
      "Python",
      "Telegram Bot API",
      "Shopify GraphQL API",
      "OpenAI API",
      "Instagram & Facebook Graph API",
    ],
    colorPalette: ["#ffffff", "#96bf48", "#0a0a0a"],
    contributions:
      "Built a Telegram agent that generates AI model photos for Shopify products, drafts titles, descriptions, pricing and captions, and publishes only after owner approval, using a stateful category-based intake flow with a 24-hour approval gate. Added independent Shopify and Instagram/Facebook publish tracking so a failure retries only the failed side, plus chat-based product management (lookup, out-of-stock sizes, delete) via Shopify APIs.",
    challenge:
      "Managing product intake, AI image generation, multi-platform publishing, and catalog management manually is time-consuming and error-prone. A failure on one platform often derails the entire pipeline without granular retry mechanisms, and owners need a friction-free mobile approval interface.",
    solution:
      "Engineered an autonomous Telegram bot workflow with a 24-hour approval gate. The system drafts complete product assets with AI model imagery, coordinates independent per-platform state tracking across Shopify and Meta Graph APIs, and enables real-time inventory management directly within Telegram chat.",
    media: [
      { src: "/images/projects/placeholder.svg", alt: "Full Agentic Controlled Shopify Store — Telegram bot interface" },
      { src: "/images/projects/placeholder.svg", alt: "Full Agentic Controlled Shopify Store — AI model generation and drafting" },
      { src: "/images/projects/placeholder.svg", alt: "Full Agentic Controlled Shopify Store — Dual-platform publish tracking" },
    ],
  },
  {
    id: "ai-video-intelligence-platform",
    title: "AI-Powered Video Intelligence Platform",
    description:
      "Architected a full-stack LLM + RAG platform over video transcripts with ~90% retrieval accuracy via semantic search, plus automated alerts and new-upload channel monitoring, deployed on Render as a scalable, production-ready service.",
    image: "/images/projects/placeholder.svg",
    tags: ["RAG Platform", "FastAPI · PGVector · Celery · Render"],
    link: "#",
    year: "2026",
    projectType: "RAG_INTELLIGENCE_PLATFORM",
    entryYear: "2026",
    targetPlatform: "WEB_API",
    primaryRole: "PYTHON_AI_ENGINEER",
    technologies: [
      "FastAPI",
      "PostgreSQL",
      "PGVector",
      "Celery",
      "OpenAI API",
      "Render",
      "Python",
    ],
    colorPalette: ["#ffffff", "#60a5fa", "#0a0a0a"],
    contributions:
      "Architected a full-stack LLM + RAG platform over video transcripts with ~90% retrieval accuracy via semantic search, plus automated alerts and new-upload channel monitoring, deployed on Render as a scalable, production-ready service.",
    challenge:
      "Querying and extracting precise insights across extensive video archives requires low-latency retrieval without hallucinations. Processing video transcripts asynchronously and maintaining real-time channel monitoring at scale demands robust task queues and optimized vector storage.",
    solution:
      "Designed and deployed a FastAPI microservice architecture with Celery async task pipelines and PGVector for sub-second semantic search. Integrated OpenAI LLMs for automated insight generation (summaries, keyword extraction, sentiment, topic detection) and alert pipelines.",
    media: [
      { src: "/images/projects/placeholder.svg", alt: "AI-Powered Video Intelligence Platform — Semantic search dashboard" },
      { src: "/images/projects/placeholder.svg", alt: "AI-Powered Video Intelligence Platform — PGVector RAG retrieval" },
      { src: "/images/projects/placeholder.svg", alt: "AI-Powered Video Intelligence Platform — Automated channel monitoring" },
    ],
  },
  {
    id: "autonomous-content-agent",
    title: "Autonomous Content Agent",
    description:
      "Fully autonomous content pipeline that scans 20+ YouTube channels, filters relevant sports content, drafts SEO-scored articles with a self-evaluation loop (up to 2 revisions), auto-generates thumbnails, and publishes end-to-end with 24/7 Telegram alerts.",
    image: "/images/projects/agent-dark-1.png",
    tags: ["Autonomous Agent", "Python · n8n · GPT-4o · Cloudflare"],
    link: "#",
    year: "2026",
    projectType: "AUTONOMOUS_CONTENT_AGENT",
    entryYear: "2026",
    targetPlatform: "BACKEND_AUTOMATION",
    primaryRole: "AI_AUTOMATION_ENGINEER",
    technologies: ["Python", "n8n", "OpenAI API", "Cloudflare", "Telegram Bot API", "YouTube Data API"],
    colorPalette: ["#ffffff", "#fbbf24", "#0a0a0a"],
    contributions:
      "Designed an autonomous content agent that scans 20+ YouTube channels, filters relevant sports content, and drafts articles using a self-evaluation loop that scores each draft against an SEO rubric and regenerates up to 2 revisions before selecting the best version. Extended the agent to auto-generate and host thumbnails and publish end-to-end with zero manual writing, running 24/7 with Telegram alerts; improved publishing efficiency by ~95%, cut writer time 5x, and maintained ~90% accuracy on spot-checked output.",
    challenge:
      "Monitoring dozens of video channels and manually transcribing, drafting, reviewing, and publishing articles creates severe bottlenecks and inconsistent editorial quality. Automating the full cycle requires strict SEO evaluation and multi-step self-scoring.",
    solution:
      "Implemented an end-to-end autonomous agent workflow with continuous YouTube scanning, automated thumbnail generation and Cloudflare hosting, iterative self-evaluation loops against SEO rubrics, and direct cross-platform publishing with 24/7 Telegram telemetry.",
    media: [
      { src: "/images/projects/agent-dark-1.png", alt: "Autonomous Content Agent — Channel scanning & intake dashboard" },
      { src: "/images/projects/agent-dark-2.png", alt: "Autonomous Content Agent — Workflow canvas & dual draft attempts" },
      { src: "/images/projects/agent-dark-3.png", alt: "Autonomous Content Agent — SEO self-evaluation & revision loop" },
      { src: "/images/projects/agent-dark-4.png", alt: "Autonomous Content Agent — Full pipeline execution log" },
      { src: "/images/projects/agent-dark-5.png", alt: "Autonomous Content Agent — Generated articles & Telegram alerts" },
    ],
  },
];

// Background music options for the audio-engine toggle in the settings panel.
// No audio files are wired in yet — src is empty on purpose. Drop files into
// /public/audio/ and fill in `src` to activate a track.
export const audioTracks: AudioTrack[] = [
  { id: "ambient", label: "Default", genre: "Ambient / Lo-Fi", src: "" },
  { id: "minimal", label: "Digital Minimalism", genre: "Synthwave / Retro", src: "" },
];

// Accent color options for the settings-panel theme swatches. "mono" (pure
// white) is the default, matching the reference's grayscale aesthetic.
export const themeSwatches: ThemeSwatch[] = [
  { id: "mono", label: "Mono", color: "#ffffff" },
  { id: "cyan", label: "Cyan", color: "#22d3ee" },
  { id: "green", label: "Green", color: "#4ade80" },
  { id: "amber", label: "Amber", color: "#fbbf24" },
  { id: "red", label: "Red", color: "#f87171" },
];

export const navItems: NavItem[] = [
  { index: "1", label: "Home", href: "/" },
  { index: "2", label: "About", href: "/about" },
  { index: "3", label: "Projects", href: "/projects" },
  { index: "4", label: "Contact", href: "/contact" },
];

export const devLabsUrl = "https://github.com/makwana8399";

// ============================================================================
// SITE CONTENT — single source of truth for all copy/data on the site.
//
// Populated from Mrunal J. Patel's resume (attached 2026-08-21). Structure
// rebuilt 2026-08-21 to match the reference site's real layout (monochrome,
// multi-page, list-style projects, skills taxonomy) after live browser
// inspection — see PLAN.md for what changed and why.
//
// Remaining gaps are marked "// TODO(user)" — see /TODO.md for the full list.
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

export const siteConfig = {
  name: "Mrunal J. Patel",
  firstName: "Mrunal",
  initials: "MP",
  role: "Generative AI Engineer",
  roleLine2: "Agentic AI Systems",
  eyebrow: "GTU '26 Grad", // TODO(user): swap for whatever short eyebrow tag you'd want next to your name (age, grad year, title — your call)
  tagline: "ENGINEERING AUTONOMOUS SYSTEMS THAT THINK, ACT, AND SHIP.",
  bio: "Computer Engineering graduate (CGPA 7.96) with a passion for building LLM-powered autonomous agents, RAG pipelines, and generative AI systems. His interest in AI was sharpened across two concurrent internships, shipping 15+ live workflows and 5 publicly deployed projects — and a Top 5 of 850+ national ranking at Intel's AI for Manufacturing Program. Curiosity quickly turned into a career of building agents that don't just answer questions, but actually get work done.",
  email: "patelmrunal7373@gmail.com",
  phone: "+91 91578 99743", // TODO(user): confirm you're OK with this being public on the Contact page
  location: "Surat, Gujarat, India",
  timezone: "Asia/Kolkata",
  resumeUrl: "/resume.pdf",
  availability: "OPEN_FOR_OFFERS", // TODO(user): confirm current availability status
  activeStack: "NEXT_R3F_GSAP",
  availabilityType: "REMOTE / HYBRID",
} as const;

// The two stat bars shown on the Home hero.
export const stats: Stat[] = [
  { label: "AI Workflows Shipped", shortLabel: "Projects", value: 15, suffix: "+" },
  { label: "Yrs Production Experience", shortLabel: "Experience", value: 1, suffix: "+" },
];

// Cycles in the "Developer Stats" status dot on Home (purely cosmetic).
export const statusWords = ["ACTIVE", "SYNCING", "STABLE", "OPTIMIZING"];

export const socialLinks: SocialLink[] = [
  // TODO(user): the resume's text layer reads "linkedin.com/in/mrunallpatel"
  // (double "l") but the rendered page image reads "mrunalpatel" (single
  // "l") — please confirm the exact handle before this goes live.
  { label: "LinkedIn", url: "https://linkedin.com/in/mrunallpatel" },
  { label: "GitHub", url: "https://github.com/patelmrunal" },
  { label: "Upwork", url: "#" }, // TODO(user): send your real Upwork profile URL
  { label: "Telegram", url: "#" }, // TODO(user): send your real Telegram handle/link
];

export const experience: ExperienceItem[] = [
  {
    role: "AI Automation Engineer (Intern)",
    company: "RohTreMedia",
    location: "Remote",
    start: "Jan 2026",
    end: "Jul 2026",
    highlights: [
      "Designed and deployed a fully autonomous content agent that scans 20 YouTube channels, filters football prediction/review content, and drafts complete articles (title, slug, URL, body) — with a self-evaluation loop that scores each draft against an SEO rubric and regenerates up to 2 revisions before auto-selecting the best-scoring version.",
      "Extended the agent to auto-generate and host thumbnails (Cloudflare) and publish end-to-end with zero manual writing, running autonomously 24/7 with Telegram status alerts; lifted publishing efficiency 95%, cut writer time 5x, held ~90% published-detail accuracy under spot-check review.",
      "Built an LLM-powered WhatsApp lead-nurturing agent (Twilio + GPT-4o) that cut response time 90% and lifted response efficiency 80%, with a live dashboard syncing lead status from ad sources to Excel.",
      "Deployed an autonomous AI agent that queries employees for task status and updates a live dashboard, saving 1+ hr/day per manager and improving task management efficiency 70%.",
      "Automated WooCommerce product onboarding (image-parsing → auto-generated title/description/price) and built an n8n editorial workflow (draft → review → publish), cutting manual upload effort 85% and publishing time 90%.",
    ],
  },
  {
    role: "Generative AI Intern",
    company: "NextGen World",
    location: "Surat, Gujarat, India",
    start: "Jun 2025",
    end: "Nov 2025",
    highlights: [
      "Shipped production-grade generative AI automation tools (n8n, Make.com, OpenAI APIs) and AI agent-based SaaS products with multi-modal LLM integrations, contributing directly to the company's AI-first product roadmap across education and service verticals.",
    ],
  },
  {
    role: "AI Intern",
    company: "Intel Digital Readiness Program",
    location: "Virtual",
    start: "Feb 2025",
    end: "Jul 2025",
    highlights: [
      "Ranked Top 5 of 850+ nationally — built an LLM-powered Dispatch Planning & Warehouse Optimization system using chain-of-thought reasoning over real-time logistics constraints; presented to Intel Global Leadership, Asia-Pacific & Japan Director, and GTU Vice Chancellor.",
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
      "OpenAI API (GPT-4o)",
      "LangChain",
      "Chain-of-Thought Reasoning",
      "Hugging Face",
    ],
  },
  {
    id: "02",
    label: "Agentic Systems",
    skills: [
      "Multi-step Tool Orchestration",
      "Autonomous Task Agents",
      "Memory-augmented Pipelines",
      "n8n Agentic Workflows",
    ],
  },
  {
    id: "03",
    label: "RAG & Retrieval",
    skills: [
      "FAISS",
      "ChromaDB",
      "Embedding-based Retrieval",
      "Semantic Search",
      "Context-Injected Prompting",
    ],
  },
  {
    id: "04",
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
    id: "05",
    label: "Backend & Deployment",
    skills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Netlify",
      "Git",
    ],
  },
  {
    id: "06",
    label: "Integrations",
    skills: [
      "Twilio WhatsApp",
      "YouTube Data API",
      "Instagram Graph API",
      "Discord API",
      "WooCommerce API",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "rag-chatbot-suite",
    title: "RAG-Powered Chatbot Suite",
    description:
      "Three production RAG applications — document Q&A, memory-augmented chatbot, and a policy-compliance bot — built with chunking, embedding generation, and context-injected prompting for hallucination-controlled responses over private corpora.",
    image: "/images/projects/placeholder-1.svg",
    tags: ["RAG Suite", "LangChain · FAISS"],
    link: "https://github.com/patelmrunal", // TODO(user): link the specific RAG-APP / CHAT-BOT / policy-rag-bot repos if you want them separated out
    year: "2025",
    // TODO(user): confirm/replace this case-study metadata — invented to fill the template until you correct it
    projectType: "RAG_APPLICATION_SUITE",
    entryYear: "2025",
    targetPlatform: "WEB",
    primaryRole: "AI_ENGINEER",
    technologies: ["Python", "LangChain", "FAISS", "ChromaDB", "OpenAI API", "FastAPI"],
    colorPalette: ["#ffffff", "#22d3ee", "#0a0a0a"],
    contributions:
      "Designed the chunking and embedding pipeline, built context-injected prompting to control hallucination over private document corpora, and shipped three separate RAG surfaces (document Q&A, memory-augmented chat, policy-compliance bot) from one shared retrieval core.",
    // TODO(user): confirm/replace — invented placeholder copy for the Project Walkthrough section
    challenge:
      "Private company documents live scattered across wikis, PDFs, and support tickets, and general-purpose LLMs either can't see that data or hallucinate confident-sounding answers when they don't have it. Teams needed to ask natural-language questions against their own corpus and get grounded, source-backed answers — without leaking unrelated internal data across the three different bot surfaces this had to serve.",
    solution:
      "Built a shared retrieval core — chunking, embedding, and vector search over FAISS/ChromaDB — then layered three purpose-built surfaces on top: a document Q&A bot, a memory-augmented conversational assistant, and a policy-compliance checker. Context-injected prompting keeps every answer traceable back to its source chunk, cutting hallucinated responses to near zero across all three.",
    media: [
      { src: "/images/projects/rag-1.svg", alt: "RAG-Powered Chatbot Suite — chat interface", isPlaceholder: true },
      { src: "/images/projects/rag-2.svg", alt: "RAG-Powered Chatbot Suite — retrieval pipeline", isPlaceholder: true },
      { src: "/images/projects/rag-3.svg", alt: "RAG-Powered Chatbot Suite — admin dashboard", isPlaceholder: true },
      { src: "/images/projects/rag-4.svg", alt: "RAG-Powered Chatbot Suite — mobile view", isPlaceholder: true },
    ], // TODO(user): send real screenshots/GIF or short screen-recording of this running
  },
  {
    id: "sentiment-analysis-api",
    title: "Sentiment Analysis API",
    description:
      "Bidirectional LSTM trained to 85.3% validation accuracy on the IMDB 50K dataset, deployed as a RESTful FastAPI service (POST /predict, GET /health) with a live public Streamlit demo.",
    image: "/images/projects/placeholder-2.svg",
    tags: ["ML API", "PyTorch · FastAPI"],
    link: "https://sentimentapi.streamlit.app",
    year: "2025",
    // TODO(user): confirm/replace this case-study metadata — invented to fill the template until you correct it
    projectType: "ML_API_SERVICE",
    entryYear: "2025",
    targetPlatform: "WEB_API",
    primaryRole: "ML_ENGINEER",
    technologies: ["PyTorch", "FastAPI", "Bidirectional LSTM", "Streamlit"],
    colorPalette: ["#ffffff", "#4ade80", "#0a0a0a"],
    contributions:
      "Trained and tuned a bidirectional LSTM to 85.3% validation accuracy on the IMDB 50K dataset, then wrapped it as a RESTful FastAPI service with health-check and prediction endpoints, plus a public Streamlit demo for live testing.",
    // TODO(user): confirm/replace — invented placeholder copy for the Project Walkthrough section
    challenge:
      "Most sentiment-analysis demos stop at a notebook accuracy score and never become something another service can actually call. The goal was to take a trained model all the way to a real, documented, publicly reachable API — with health checks, predictable latency, and a way for non-technical reviewers to try it without writing a single line of code.",
    solution:
      "Trained a bidirectional LSTM to 85.3% validation accuracy on the IMDB 50K dataset, then wrapped it in a FastAPI service with POST /predict and GET /health endpoints, deployed behind versioned, documented routes. A companion Streamlit app gives anyone a live, no-code way to type text in and see the model's confidence in real time.",
    media: [
      { src: "/images/projects/sentiment-1.svg", alt: "Sentiment Analysis API — API docs (Swagger)", isPlaceholder: true },
      { src: "/images/projects/sentiment-2.svg", alt: "Sentiment Analysis API — Streamlit demo", isPlaceholder: true },
      { src: "/images/projects/sentiment-3.svg", alt: "Sentiment Analysis API — model metrics", isPlaceholder: true },
    ], // TODO(user): send real screenshots/GIF or short screen-recording of this running
  },
  {
    id: "autonomous-content-agent",
    title: "Autonomous Content Agent",
    description:
      "Fully autonomous pipeline that scans 20 YouTube channels, drafts SEO-scored articles with a self-evaluation and revision loop, auto-generates and hosts thumbnails, and publishes end-to-end with zero manual writing — running 24/7 with Telegram status alerts.",
    image: "/images/projects/placeholder-3.svg",
    tags: ["Automation Agent", "n8n · GPT-4o"],
    link: "#", // TODO(user): internal/client project — add a public link or case-study writeup if you have one
    year: "2026",
    // TODO(user): confirm/replace this case-study metadata — invented to fill the template until you correct it
    projectType: "AUTONOMOUS_AGENT",
    entryYear: "2026",
    targetPlatform: "BACKEND_AUTOMATION",
    primaryRole: "AUTOMATION_ENGINEER",
    technologies: ["n8n", "GPT-4o", "Cloudflare", "Telegram Bot API", "YouTube Data API"],
    colorPalette: ["#ffffff", "#fbbf24", "#0a0a0a"],
    contributions:
      "Built the end-to-end autonomous loop: scanning source channels, drafting and self-scoring articles against an SEO rubric, auto-regenerating up to 2 revisions, generating and hosting thumbnails, and publishing with zero manual writing — plus live Telegram status alerts.",
    // TODO(user): confirm/replace — invented placeholder copy for the Project Walkthrough section
    challenge:
      "Publishing consistent, well-researched content from 20 YouTube channels by hand doesn't scale — writers burn out, SEO quality drifts, and thumbnails and publishing become the bottleneck long before writing does. The brief was to remove every manual step between 'a new video exists' and 'a published, on-brand article is live,' without sacrificing quality control.",
    solution:
      "Built a fully autonomous n8n + GPT-4o pipeline that scans source channels, drafts SEO-scored articles, and runs a self-evaluation/revision loop (up to 2 automatic passes) before anything ships. Thumbnails are auto-generated and hosted, publishing happens end-to-end with zero manual writing, and the whole thing reports its own status over Telegram 24/7.",
    media: [
      { src: "/images/projects/agent-1.svg", alt: "Autonomous Content Agent — pipeline overview", isPlaceholder: true },
      { src: "/images/projects/agent-2.svg", alt: "Autonomous Content Agent — article draft", isPlaceholder: true },
      { src: "/images/projects/agent-3.svg", alt: "Autonomous Content Agent — thumbnail generator", isPlaceholder: true },
      { src: "/images/projects/agent-4.svg", alt: "Autonomous Content Agent — Telegram alerts", isPlaceholder: true },
      { src: "/images/projects/agent-5.svg", alt: "Autonomous Content Agent — publishing dashboard", isPlaceholder: true },
    ], // TODO(user): send real screenshots/GIF or short screen-recording of this running
  },
]; // TODO(user): swap the placeholder gallery images for real screenshots or short screen-recordings per project

// Background music options for the audio-engine toggle in the settings panel.
// No audio files are wired in yet — src is empty on purpose. Drop files into
// /public/audio/ and fill in `src` to activate a track.
export const audioTracks: AudioTrack[] = [
  { id: "ambient", label: "Default", genre: "Ambient / Lo-Fi", src: "" }, // TODO(user)
  { id: "minimal", label: "Digital Minimalism", genre: "Synthwave / Retro", src: "" }, // TODO(user)
]; // TODO(user): optional feature — leave src empty to keep the toggle a no-op

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

export const devLabsUrl = "https://github.com/patelmrunal"; // TODO(user): point this at a dedicated experiments page if you build one, otherwise fine to leave as GitHub

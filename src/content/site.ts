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
    role: "Junior AI Automation Engineer",
    company: "RohTreMedia",
    location: "Remote",
    start: "Jul 2026",
    end: "Present",
    highlights: [
      "Built an IVR flow for the company's first outreach to US/Canada prospects — gathers requirements straight from the caller, then the moment the call ends, auto-sends the caller's number and full call transcript to the Sales team's inbox and a Telegram group chat for immediate follow-up.",
      "Designed and deployed a fully autonomous content agent that scans 20 YouTube channels, filters football prediction/review content, and drafts complete articles (title, slug, URL, body) — with a self-evaluation loop that scores each draft against an SEO rubric and regenerates up to 2 revisions before auto-selecting the best-scoring version.",
      "Extended the agent to auto-generate and host thumbnails (Cloudflare) and publish end-to-end with zero manual writing, running autonomously 24/7 with Telegram status alerts; lifted publishing efficiency 95%, cut writer time 5x, held ~90% published-detail accuracy under spot-check review.",
    ],
  },
  {
    role: "AI Automation Engineer (Intern)",
    company: "RohTreMedia",
    location: "Remote",
    start: "Jan 2026",
    end: "Jul 2026",
    highlights: [
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

// Ordered by how strong/helpful each project is, best first — this drives
// display order on the Projects page and the Next_Project chain on each
// case-study page (which just walks this array, wrapping at the end).
export const projects: Project[] = [
  {
    id: "dispatch-planning-warehouse-optimization",
    title: "Dispatch Planning & Warehouse Optimization",
    description:
      "AI-powered MVP that takes a raw CSV of warehouse product data (weight, dimensions, fragility, priority, destination) and turns it into an optimized storage layout, full dispatch route plan, live cost breakdown, and real-time fleet tracking — all in one system. Ranked Top 5 of 850+ projects in Intel's AI for Manufacturing Program.",
    image: "/images/projects/dispatch-1.png",
    tags: ["Intel AI for Manufacturing — Top 5/850+", "Python · Streamlit · Optimization ML"],
    link: "#", // TODO(user): add a public link/repo/demo if you have one
    year: "2025",
    projectType: "AI_OPTIMIZATION_MVP",
    entryYear: "2025",
    targetPlatform: "WEB",
    primaryRole: "AI_ENGINEER",
    technologies: ["Python", "Streamlit", "Optimization Algorithms", "Plotly", "Route Optimization", "Pandas"],
    colorPalette: ["#ffffff", "#60a5fa", "#0a0a0a"],
    contributions:
      "Designed and built the full MVP end to end as part of Intel's Digital Readiness Program internship: the CSV-driven product intake, the 2D/3D storage-optimization engine and constraint system, the dispatch route planner and cost-breakdown analytics, and the real-time dynamic optimization layer for simulating live inventory events. Represented and presented the system to Intel Global Leadership, the Asia-Pacific & Japan Director, GTU's Vice Chancellor, and other senior GTU/Intel representatives after it was ranked Top 5 of 850+ submissions nationally in Intel's AI for Manufacturing Program.",
    challenge:
      "Warehouses run this whole process by hand and in pieces: figuring out where a product should physically go based on its weight, size, and fragility; planning delivery routes and vehicle loads separately; and only tallying up the real cost after the fact. Nothing talks to anything else, so space gets wasted, routes are inefficient, and there's no single place to see the true cost of a day's operations. The brief was to build one AI system that could take raw product data and handle all of it — placement, dispatch, tracking, and cost — together.",
    solution:
      "Built an AI-powered MVP where you upload a single CSV of warehouse product details — weight, length, width, height, fragility, destination, priority, dispatch date — and the system takes it from there. A storage-optimization engine suggests where each product should go, respecting configurable constraints like max weight, fragile-on-top, and priority-first, and visualizes the result as both a 2D top-down layout and a rotatable 3D warehouse view. A dispatch-planning engine then builds full delivery routes across the fleet, complete with per-route distance, duration, cost, and stop-by-stop breakdowns. A dynamic-optimization layer lets the system react in real time as goods are added or removed from stock. And an analytics layer rolls everything — performance history, cost breakdown by driver/fuel/operating cost, fleet utilization, route maps, and delivery-density heatmaps — into one dashboard. This MVP was ranked Top 5 of 850+ projects nationally in Intel's AI for Manufacturing Program, and I presented it to Intel Global Leadership, the Asia-Pacific & Japan Director, GTU's Vice Chancellor, and other senior GTU/Intel representatives.",
    media: [
      { src: "/images/projects/dispatch-1.png", alt: "Dispatch Planning & Warehouse Optimization — CSV upload and storage constraints setup" },
      { src: "/images/projects/dispatch-2.png", alt: "Dispatch Planning & Warehouse Optimization — optimized storage plan with 2D warehouse layout" },
      { src: "/images/projects/dispatch-3.png", alt: "Dispatch Planning & Warehouse Optimization — main navigation across Storage, Dispatch, Dynamic Optimization, Analytics, and Settings tabs" },
      { src: "/images/projects/dispatch-4.png", alt: "Dispatch Planning & Warehouse Optimization — interactive 3D warehouse storage visualization" },
      { src: "/images/projects/dispatch-5.png", alt: "Dispatch Planning & Warehouse Optimization — dispatch planning summary with routes, distance, and total cost" },
      { src: "/images/projects/dispatch-6.png", alt: "Dispatch Planning & Warehouse Optimization — route list with assigned vehicles and drivers" },
      { src: "/images/projects/dispatch-7.png", alt: "Dispatch Planning & Warehouse Optimization — expanded route details with delivery stops" },
      { src: "/images/projects/dispatch-8.png", alt: "Dispatch Planning & Warehouse Optimization — dynamic real-time optimization controls" },
      { src: "/images/projects/dispatch-9.png", alt: "Dispatch Planning & Warehouse Optimization — live system state table and simulated inventory events" },
      { src: "/images/projects/dispatch-10.png", alt: "Dispatch Planning & Warehouse Optimization — analytics performance metrics" },
      { src: "/images/projects/dispatch-11.png", alt: "Dispatch Planning & Warehouse Optimization — cost analysis breakdown by driver, fuel, and operating cost" },
      { src: "/images/projects/dispatch-12.png", alt: "Dispatch Planning & Warehouse Optimization — route efficiency metrics across the fleet" },
      { src: "/images/projects/dispatch-13.png", alt: "Dispatch Planning & Warehouse Optimization — detailed per-route cost breakdown table" },
      { src: "/images/projects/dispatch-14.png", alt: "Dispatch Planning & Warehouse Optimization — fleet analytics and vehicle utilization" },
      { src: "/images/projects/dispatch-15.png", alt: "Dispatch Planning & Warehouse Optimization — dispatch routes plotted on a coordinate map" },
      { src: "/images/projects/dispatch-16.png", alt: "Dispatch Planning & Warehouse Optimization — delivery density heatmap and fleet performance details" },
    ],
  },
  {
    id: "whatsapp-lead-qualification-bot",
    title: "WhatsApp Lead Qualification Bot",
    description:
      "An automated WhatsApp bot that picks up new leads straight from Meta (Facebook/Instagram) ad campaigns, opens with a policy-compliant template message, qualifies the lead over a natural 3–5 message conversation, and — only once the customer agrees — hands off to the sales team on Discord and Telegram with the full chat and number, while every conversation is logged to Supabase and manageable from a custom dashboard.",
    image: "/images/projects/leadbot-1.png",
    tags: ["Client Project", "n8n · WhatsApp API · Supabase"],
    link: "#", // TODO(user): add a public link/repo/demo if you have one
    year: "2026",
    projectType: "WHATSAPP_LEAD_AUTOMATION",
    entryYear: "2026",
    targetPlatform: "WHATSAPP",
    primaryRole: "AUTOMATION_ENGINEER",
    technologies: ["n8n", "Twilio WhatsApp API", "FastAPI", "Supabase", "Google Sheets API", "Discord", "Telegram Bot API"],
    colorPalette: ["#ffffff", "#25d366", "#0a0a0a"],
    contributions:
      "Built the full pipeline end to end: the Meta Ads → Google Sheets → Twilio WhatsApp lead-intake automation, the FastAPI-backed AI conversation engine that qualifies each lead and tracks its phase, the instant Discord and Telegram sales-handoff notifications carrying the full chat transcript and phone number, the Supabase-backed conversation and lead-status storage, and the internal dashboard for browsing every chat, editing AI-generated summaries, and updating lead status.",
    challenge:
      "Meta and WhatsApp's messaging policy requires the very first message to a new ad lead to use a pre-approved template — you can't open with a free-form AI reply. Past that first message, the lead still needed to be qualified naturally (business type, location, whether they're already running ads, budget) without feeling scripted, and the moment a lead actually agreed to talk to a person, the sales team needed to be looped in immediately with full context — instead of leads sitting unrouted in an inbox somewhere.",
    solution:
      "Built an n8n-orchestrated pipeline that watches the Meta Ads-connected Google Sheet for new leads and fires off the mandatory policy-compliant WhatsApp template as the opener via Twilio. From there, a FastAPI-backed AI agent takes over and qualifies the lead naturally across 3–5 exchanges — business, location, current ad status, budget — before asking if they'd like to be connected with a sales person. The moment a lead says yes, the bot instantly pushes a handoff notification — with the full chat history and phone number — to both Discord and Telegram, and logs everything (messages, lead phase, status, AI-generated summary) to Supabase. A companion dashboard lets anyone on the team browse every lead's conversation, review and edit the AI's summary, and update lead status (Interested / Qualified / Lost / Not Qualified) by hand.",
    media: [
      { src: "/images/projects/leadbot-1.png", alt: "WhatsApp Lead Qualification Bot — n8n lead-intake automation from Google Sheets to Twilio" },
      { src: "/images/projects/leadbot-2.png", alt: "WhatsApp Lead Qualification Bot — internal dashboard with lead list, chat view, and AI summary" },
      { src: "/images/projects/leadbot-3.png", alt: "WhatsApp Lead Qualification Bot — opening template message and qualifying conversation" },
      { src: "/images/projects/leadbot-4.png", alt: "WhatsApp Lead Qualification Bot — conversation continuing through to sales handoff" },
      { src: "/images/projects/leadbot-5.png", alt: "WhatsApp Lead Qualification Bot — n8n conversation engine with AI response, status tracking, and handoff routing" },
    ],
  },
  {
    id: "invoice-payment-system",
    title: "Invoice & Payment Management System",
    description:
      "A fully mobile-responsive billing platform built for a client's electrical trading business — GST-compliant invoice generation, party/customer management, and full payment tracking (collected vs. outstanding), designed simple enough for their own non-technical staff to run without training.",
    image: "/images/projects/invoice-1.png",
    tags: ["Client Project", "Django · Python"],
    link: "#", // TODO(user): add a public link/repo/demo if you have one
    year: "2026",
    // TODO(user): confirm/replace this case-study metadata — invented to fill the template until you correct it
    projectType: "CLIENT_BILLING_SYSTEM",
    entryYear: "2026",
    targetPlatform: "WEB",
    primaryRole: "FULL_STACK_ENGINEER",
    technologies: ["Django", "Python", "PDF Generation", "GST Invoicing"],
    colorPalette: ["#ffffff", "#3b82f6", "#0a0a0a"],
    contributions:
      "Designed and built the full invoicing and payment system end to end for the client: the dashboard with real-time invoiced/received/outstanding/tax totals, GST-compliant tax invoice generation with auto-numbering and line-item CGST/SGST calculation, party/customer management, full invoice history with filtering, and a payment-recording flow that can be tied to a specific invoice or logged as a general advance — all built mobile-first so the client's own team could use it on a phone or a desktop with zero onboarding.",
    challenge:
      "The client needed one system to manage every party they invoice, track exactly how much payment has been collected versus what's still outstanding, and generate proper GST invoices — without hiring anyone or training their team to use it. Their explicit first requirement was simplicity: it had to be completely clear on both mobile and desktop, since we didn't want to spend their time teaching them how to generate an invoice — they needed to be able to pick it up and use it themselves from day one.",
    solution:
      "Built a fully responsive invoicing and payment dashboard: live totals for total invoiced, total received, outstanding balance, and tax collected, a monthly invoiced-vs-received trend chart, and a top-parties-by-invoiced-amount breakdown. Invoices are generated with auto-numbering, per-line HSN/CGST/SGST calculation, and produce a clean, print-ready GST tax invoice PDF. A dedicated Payments section records collections against a specific invoice or as a general advance, and Party management keeps every customer's details in one place — all wrapped in a minimal, guided UI so the client's own non-technical staff can create and manage invoices independently, on any device.",
    media: [
      { src: "/images/projects/invoice-1.png", alt: "Invoice & Payment Management System — dashboard with invoiced, received, outstanding, and tax totals" },
      {
        src: "/images/projects/invoice-2.png",
        alt: "Invoice & Payment Management System — generated GST-compliant tax invoice PDF",
        portrait: true,
        excludeFromGallery: true,
      },
      { src: "/images/projects/invoice-3.png", alt: "Invoice & Payment Management System — invoice history with filtering and status" },
      { src: "/images/projects/invoice-4.png", alt: "Invoice & Payment Management System — create invoice form with line items and live totals" },
      { src: "/images/projects/invoice-5.png", alt: "Invoice & Payment Management System — payments tracking page" },
      { src: "/images/projects/invoice-6.png", alt: "Invoice & Payment Management System — record payment form" },
    ],
  },
  {
    id: "autonomous-content-agent",
    title: "Autonomous Content Agent",
    description:
      "Fully autonomous pipeline that scans 20 YouTube channels, drafts SEO-scored articles with a self-evaluation and revision loop, auto-generates and hosts thumbnails, and publishes end-to-end with zero manual writing — running 24/7 with Telegram status alerts.",
    image: "/images/projects/agent-dark-1.png",
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
      { src: "/images/projects/agent-dark-1.png", alt: "Autonomous Content Agent — dashboard: pipeline stats, YouTube URL processor, manual run triggers" },
      { src: "/images/projects/agent-dark-2.png", alt: "Autonomous Content Agent — generation report: two scored draft attempts, best one auto-selected" },
      { src: "/images/projects/agent-dark-3.png", alt: "Autonomous Content Agent — session log of 100 generated articles with SEO score, tries, and word count" },
      { src: "/images/projects/agent-dark-4.png", alt: "Autonomous Content Agent — full pipeline run log from thumbnail generation through save" },
      { src: "/images/projects/agent-dark-5.png", alt: "Autonomous Content Agent — final generated article output" },
    ],
  },
  {
    id: "sentiment-analysis-api",
    title: "Sentiment Analysis API",
    description:
      "Bidirectional LSTM trained to 85.3% validation accuracy on the IMDB 50K dataset, deployed as a RESTful FastAPI service (POST /predict, GET /health) with a live public Streamlit demo.",
    image: "/images/projects/sentiment-1.png",
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
      { src: "/images/projects/sentiment-1.png", alt: "Sentiment Analysis API — Streamlit demo landing screen" },
      { src: "/images/projects/sentiment-2.png", alt: "Sentiment Analysis API — positive sentiment result with confidence breakdown" },
      { src: "/images/projects/sentiment-3.png", alt: "Sentiment Analysis API — negative sentiment result with confidence breakdown" },
    ], // TODO(user): send real screenshots/GIF or short screen-recording of this running
  },
  {
    id: "rag-chatbot-suite",
    title: "PDF RAG Chatbot",
    description:
      "My first hands-on RAG project — a PDF Q&A chatbot (LangChain + HuggingFace) that lets you upload a document and ask questions grounded in its actual content, built alongside a simple Groq-powered chat agent to learn the retrieval-augmented-generation fundamentals end to end.",
    image: "/images/projects/rag-1.png",
    tags: ["Learning Project", "LangChain · HuggingFace"],
    link: "https://github.com/patelmrunal", // TODO(user): link the specific repo(s) for these two apps if you want them separated out
    year: "2025",
    // TODO(user): confirm/replace this case-study metadata — invented to fill the template until you correct it
    projectType: "RAG_LEARNING_PROJECT",
    entryYear: "2025",
    targetPlatform: "WEB",
    primaryRole: "AI_ENGINEER",
    technologies: ["Python", "LangChain", "HuggingFace", "Groq"],
    colorPalette: ["#ffffff", "#22d3ee", "#0a0a0a"],
    contributions:
      "Built my first end-to-end RAG pipeline — PDF upload, chunking, embedding, and retrieval-grounded Q&A with LangChain and HuggingFace — plus a simple Groq-powered chat agent, both as hands-on learning projects to nail the fundamentals before building the more complex agent systems that followed.",
    challenge:
      "This was my first hands-on RAG project — the goal wasn't production polish, it was understanding how retrieval-augmented generation actually works end to end: chunking a document, embedding it, retrieving the relevant pieces, and grounding an LLM's answer in them instead of letting it hallucinate.",
    solution:
      "Built a PDF Q&A chatbot (LangChain + HuggingFace) that lets you upload a document and ask natural-language questions grounded in its actual content, plus a separate lightweight chat agent (Groq + Python) to get comfortable with the basic LLM request/response loop before building anything more complex.",
    media: [
      { src: "/images/projects/rag-1.png", alt: "PDF RAG Chatbot — upload screen" },
      { src: "/images/projects/rag-2.png", alt: "My First AI Agent — Groq-powered chat interface" },
      { src: "/images/projects/rag-3.png", alt: "My First AI Agent — empty chat state" },
      { src: "/images/projects/rag-4.png", alt: "PDF RAG Chatbot — PDF loaded, ready to answer questions" },
    ],
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

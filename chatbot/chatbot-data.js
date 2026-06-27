/*
 * chatbot-data.js — All of Ishpreet's CV data + Q&A answers
 *
 * HOW IT WORKS:
 * Each entry has an array of "triggers" (keywords to match) and an "answer".
 * When a recruiter types a question, we check which triggers appear in their
 * message and return the best matching answer.
 *
 * TO UPGRADE TO REAL AI LATER:
 * Replace the getAnswer() function in chatbot.js with a fetch() call to the
 * Claude API. Everything else stays the same. One function swap = real AI.
 */

const ISHPREET = {

  // ── Personal info ──────────────────────────────────────────────────────────
  name:     "Ishpreet Singh",
  email:    "ishpreet17suri@gmail.com",
  phone:    "+91 98999 41313",
  linkedin: "https://www.linkedin.com/in/ishpreet-singh-a81920291",
  github:   "https://github.com/ishpreetsuri",
  portfolio:"https://ishpreetsuri.github.io/code-ishpreet/portfolio/",

  // ── Q&A bank — triggers + answers ─────────────────────────────────────────
  qa: [

    {
      triggers: ["who", "about", "introduce", "yourself", "tell me", "ishpreet"],
      answer: "Hi! I'm Ishpreet Singh — a final-year B.Tech Computer Science student at Guru Nanak Dev University, Jalandhar (2023–2027), specialising in AI Engineering. I build software with Python, AI tools, and LLM-powered workflows, and I'm the founder of Cocokart, a live e-commerce store with 800+ orders and ₹3,00,000+ in sales."
    },

    {
      triggers: ["skill", "know", "tech", "stack", "language", "tools", "can you"],
      answer: "My skills: \n• AI & LLMs: Claude, Claude Code, ChatGPT, Perplexity, VidIQ, InVideo — daily use for prompt engineering, code generation & AI automation\n• Programming: Python (primary), SQL, C++, JavaScript\n• Web: HTML, CSS, WordPress, Shopify\n• Tools: Git, GitHub, Canva, Meta Ads Manager\n• Currently learning: LangChain, RAG pipelines, AI agents, AWS basics"
    },

    {
      triggers: ["project", "built", "build", "work", "portfolio", "show"],
      answer: "I've built 3 projects:\n\n1️⃣ YouTube Content Automation System — an end-to-end AI pipeline using Claude Code, VidIQ & InVideo. Automates scripts, videos, thumbnails, titles and analytics. Live and producing content.\n\n2️⃣ Faculty Management System — a deployed web app (HTML/CSS/JS) with full CRUD features. Live at ishpreetsuri.github.io/code-ishpreet\n\n3️⃣ Cocokart — my own Shopify e-commerce store (800+ orders, ₹3,00,000+ sales). Archived at github.com/ishpreetsuri/cocokart-archive"
    },

    {
      triggers: ["youtube", "automation", "video", "content", "vidig", "inVideo", "pipeline"],
      answer: "YouTube Content Automation System: I built an end-to-end AI content pipeline using Claude Code, VidIQ and InVideo for a US-audience YouTube channel. It automates the full workflow — script generation, video creation, thumbnails, titles, descriptions and analytics — and operates autonomously with human-in-the-loop quality control. It's live and producing content."
    },

    {
      triggers: ["faculty", "management", "web app", "html", "css", "crud"],
      answer: "Faculty Management System: A responsive web application built end-to-end with HTML, CSS and JavaScript using Claude Code and ChatGPT. Features full CRUD (add, edit, delete) for faculty data. Deployed live on GitHub Pages: ishpreetsuri.github.io/code-ishpreet"
    },

    {
      triggers: ["cocokart", "store", "ecommerce", "shopify", "business", "founder", "order", "sales"],
      answer: "Cocokart: I founded and ran a live Shopify e-commerce store from Nov 2025 to Jun 2026. Served 800+ orders with ₹3,00,000+ in total sales. Managed the full order lifecycle, ran Meta (Facebook/Instagram) ad campaigns with ≈₹40,000 budget, and used AI tools daily for content and analytics. Now archived at github.com/ishpreetsuri/cocokart-archive."
    },

    {
      triggers: ["education", "study", "university", "college", "degree", "btech", "gndu"],
      answer: "Education:\n• B.Tech in Computer Science — Guru Nanak Dev University, Jalandhar (2023–2027)\n• CBSE Class XII — Guru Harkishan Public School, Punjabi Bagh (2021–2022)\n• CBSE Class X — Guru Harkishan Public School, Punjabi Bagh (2019–2020)"
    },

    {
      triggers: ["intern", "available", "hire", "job", "opportunity", "open", "looking", "when"],
      answer: "Yes! I'm actively looking for internships in AI Engineering, LLM Integration, AI Automation, and Python development. I'm available immediately. Feel free to reach me at ishpreet17suri@gmail.com or +91 98999 41313."
    },

    {
      triggers: ["python", "sql", "c++", "javascript", "code", "program"],
      answer: "I program primarily in Python and SQL. I also know C++ and JavaScript. I use Python for automation, data handling and AI integrations. SQL for databases. JavaScript for web development. I build with Claude Code and ChatGPT daily to move faster."
    },

    {
      triggers: ["ai", "llm", "claude", "chatgpt", "langchain", "rag", "agent", "automation"],
      answer: "AI is my primary focus. I use Claude, Claude Code, ChatGPT and Perplexity every day for code generation, debugging, prompt engineering and building AI automation pipelines. I'm actively building toward LangChain, RAG pipelines, vector databases and AI agents. This portfolio chatbot you're using right now is one of my AI projects."
    },

    {
      triggers: ["contact", "email", "phone", "reach", "connect", "linkedin", "message"],
      answer: "Let's connect! 📧 Email: ishpreet17suri@gmail.com\n📱 Phone: +91 98999 41313\n💼 LinkedIn: linkedin.com/in/ishpreet-singh\n🐙 GitHub: github.com/ishpreetsuri"
    },

    {
      triggers: ["strength", "strong", "good at", "best", "quality"],
      answer: "My key strengths: AI-native builder • Fast learner • High ownership • Ships and iterates • Strong analytical mindset. I don't just learn tools — I build real things with them."
    },

    {
      triggers: ["language", "speak", "english", "hindi", "punjabi"],
      answer: "I'm fluent in English, Hindi and Punjabi."
    },

    {
      triggers: ["meta", "ads", "marketing", "facebook", "instagram", "digital"],
      answer: "I have hands-on digital marketing experience from running Cocokart — I managed Meta (Facebook/Instagram) ad campaigns with a ≈₹40,000 budget for paid acquisition, handled content creation using AI tools, and optimised product listings for conversions."
    },

    {
      triggers: ["github", "link", "code", "repo", "repository"],
      answer: "My GitHub: github.com/ishpreetsuri\nMy portfolio: ishpreetsuri.github.io/code-ishpreet/portfolio/\nFaculty Management System (live): ishpreetsuri.github.io/code-ishpreet\nCocokart archive: github.com/ishpreetsuri/cocokart-archive"
    }

  ],

  // Shown when no question matches
  fallback: "Good question! I'm not sure I have the answer for that here. Please email Ishpreet directly at ishpreet17suri@gmail.com — he usually replies within a day. 😊"
};

// Session management
let sessionId = localStorage.getItem("portfolio-session");
if (!sessionId) {
    sessionId = "portfolio-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("portfolio-session", sessionId);
}

// ---------- PROJECTS DATA ----------
// Ordered by engineering weight, hardest and most complete first. `rank` drives
// both display order and the index shown on each card. `featured` gets flagship
// treatment in the grid. The static Object Detection card in index.html carries
// its own rank through an inline `order` style.
const projectsData = [
    // 01 - BAROS / Gigr
    {
        rank: 1,
        featured: true,
        category: "web",
        title: "BAROS (Gigr)",
        description: `Neighborhood marketplace on Solana with on-chain escrow and PostGIS-backed local matching. Reputation is minted as compressed NFTs, so a vouch cannot be quietly edited or deleted later, and wallets are provisioned at registration to keep seed phrases out of the user's path. An AI assistant can post jobs and negotiate on the user's behalf, while disputes route to a community jury. Currently in pilot.`,
        image: "https://gigrr.vercel.app/icon.png",
        alt: "BAROS (Gigr) interface",
        tags: ["Solana", "TypeScript", "PostGIS", "AI"],
        links: [
            { href: "https://github.com/Ksschkw/BAROS", icon: "fab fa-github", text: "Code" },
            { href: "https://gigrr.vercel.app/", icon: "fas fa-external-link-alt", text: "Live" }
        ],
        delayClass: ""
    },
    // 02 - CongestIQ
    {
        rank: 2,
        featured: true,
        category: "ai",
        title: "CongestIQ",
        description: `Multi-agent reinforcement learning for adaptive TCP congestion control. The agents learn to trade throughput against fairness per flow rather than applying one fixed loss-based rule, and the policies are evaluated against standard congestion control inside ns-3 with netanim traces.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/CongestIQ-FYP",
        alt: "CongestIQ reinforcement learning simulations",
        tags: ["Reinforcement Learning", "Networking", "C++", "ns-3"],
        links: [
            { href: "https://github.com/Ksschkw/CongestIQ-FYP", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: "delay-1"
    },
    // 03 - driftlock
    {
        rank: 3,
        featured: true,
        category: "ai",
        title: "driftlock",
        description: `Commit-time gatekeeper that catches documentation drift before it lands. It parses staged diffs, detects API-surface and structural changes across languages, then either blocks the commit or rewrites the affected docs through an LLM. Ships as a standalone CLI, a pre-commit hook, and a GitHub Action, with optional anchoring of each doc-sync check to Solana for a tamper-evident audit trail.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/driftlock",
        alt: "driftlock CLI output",
        tags: ["Go", "DevTooling", "GitHub Actions", "LLM"],
        links: [
            { href: "https://github.com/Ksschkw/driftlock", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: "delay-2"
    },
    // 04 - AutoSig
    {
        rank: 4,
        featured: true,
        category: "ai",
        title: "AutoSig",
        description: `Multi-agent trading system for Solana, built for Superteam Nigeria's Agentic Wallets challenge. LLM agents propose trades, but nothing reaches the chain until it clears three independent gates: hard limits no model can override, deterministic policy checks, and a second model acting as reviewer. An adversarial test suite verifies the guardrails still hold when the proposing agent is actively trying to break them.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/AutoSig",
        alt: "AutoSig agent guardrail architecture",
        tags: ["Solana", "C#", "Agents", "Testing"],
        links: [
            { href: "https://github.com/Ksschkw/AutoSig", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: ""
    },
    // 05 - Healthcare Diagnostic API
    {
        rank: 5,
        category: "web",
        title: "Healthcare Diagnostic API",
        description: `Multi-tenant FastAPI backend for healthcare records covering patients, test requests, and lab results. Authorization follows the AWS IAM shape, where atomic permissions compose into permission sets and then into roles. Records use soft deletes to keep an auditable history, and credentials are hashed with Argon2.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/healthcare-diagnostic-api",
        alt: "Healthcare Diagnostic API structure",
        tags: ["Backend", "FastAPI", "Python", "Healthcare"],
        links: [
            { href: "https://github.com/Ksschkw/healthcare-diagnostic-api", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: "delay-1"
    },
    // 06 - LexAI
    {
        rank: 6,
        category: "ai",
        title: "LexAI",
        description: `Question answering over the Nigerian Constitution with a hybrid retriever that pairs FAISS vector search against BM25 keyword scoring, so exact statutory phrasing and paraphrased questions both retrieve the right passage.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/LexAI",
        alt: "LexAI retrieval pipeline",
        tags: ["RAG", "Python", "Legal Tech", "FAISS"],
        links: [
            { href: "https://github.com/Ksschkw/LexAI", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: "delay-2"
    },
    // 07 - kssrag
    {
        rank: 7,
        category: "ai",
        title: "kssrag",
        description: `Retrieval-augmented generation framework published to PyPI. Ingestion, chunking, embedding, and retrieval are exposed as composable pieces instead of one fixed pipeline, and the package carries its own versioned release on the index.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/kssrag",
        alt: "kssrag package",
        tags: ["RAG", "Python", "PyPI", "Library"],
        links: [
            { href: "https://github.com/Ksschkw/kssrag", icon: "fab fa-github", text: "Code" },
            { href: "https://pypi.org/project/kssrag/0.1.2/", icon: "fab fa-python", text: "PyPI" }
        ],
        delayClass: ""
    },
    // 08 - MYRAGAGENTV2
    {
        rank: 8,
        category: "ai",
        title: "MYRAGAGENTV2",
        description: `Retrieval agent built on the kssrag package, with query rewriting before search and a rejection path for questions the retrieved context cannot actually support.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/MYRAGAGENTV2",
        alt: "MYRAGAGENTV2 agent",
        tags: ["RAG", "Python", "Agents"],
        links: [
            { href: "https://github.com/Ksschkw/MYRAGAGENTV2", icon: "fab fa-github", text: "Code" },
            { href: "https://agentkosi.onrender.com/", icon: "fas fa-external-link-alt", text: "Live" }
        ],
        delayClass: "delay-1"
    },
    // 10 - MYRAGAGENT
    {
        rank: 10,
        category: "ai",
        title: "MYRAGAGENT",
        description: `Earlier retrieval agent that answers strictly from an indexed corpus. Superseded by MYRAGAGENTV2 and kept for reference.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/MYRAGAGENT",
        alt: "MYRAGAGENT agent",
        tags: ["RAG", "Python", "Agents"],
        links: [
            { href: "https://github.com/Ksschkw/MYRAGAGENT", icon: "fab fa-github", text: "Code" },
            { href: "https://agentkosi.onrender.com/", icon: "fas fa-external-link-alt", text: "Live" }
        ],
        delayClass: "delay-2"
    },
    // 11 - AI Copilot Agent
    {
        rank: 11,
        category: "ai",
        title: "AI Copilot Agent",
        description: `FastAPI service that turns a rough brief into a structured innovation challenge definition. Model output is constrained to a schema the API validates before it is stored.`,
        image: "imagesnshii/image.png",
        alt: "AI Copilot Agent service",
        tags: ["FastAPI", "Python", "Structured Output"],
        links: [
            { href: "https://github.com/Ksschkw/AI-Copilot-Agent", icon: "fab fa-github", text: "Code" },
            { href: "https://ai-copilot-agent-1.onrender.com/", icon: "fas fa-external-link-alt", text: "Live" }
        ],
        delayClass: ""
    },
    // 12 - Vybe Analytics Telegram Bot
    {
        rank: 12,
        category: "telegram",
        title: "Vybe Analytics Bot",
        description: `Telegram bot serving real-time Solana on-chain analytics through Vybe Network APIs, with responses shaped for reading on a phone.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/vybe-telegram-bot",
        alt: "Vybe Analytics Telegram bot",
        tags: ["Telegram", "API", "Python", "Solana"],
        links: [
            { href: "https://github.com/Ksschkw/vybe-telegram-bot", icon: "fab fa-github", text: "Code" },
            { href: "https://t.me/VybeVigil_bot", icon: "fab fa-telegram", text: "Bot" }
        ],
        delayClass: "delay-1"
    },
    // 13 - Bubblemaps Telegram Bot
    {
        rank: 13,
        category: "telegram",
        title: "Bubblemaps Bot",
        description: `Token analysis bot that pulls holder-cluster data from Bubblemaps and reports concentration risk on demand.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/TheBubbleSnitchBot-2",
        alt: "Bubblemaps Telegram bot",
        tags: ["Telegram", "Python", "Crypto"],
        links: [
            { href: "https://github.com/Ksschkw/TheBubbleSnitchBot-2", icon: "fab fa-github", text: "Code" },
            { href: "https://t.me/TheBubbleSnitch_bot", icon: "fab fa-telegram", text: "Bot" }
        ],
        delayClass: "delay-2"
    },
    // 14 - Kaggle dataset
    {
        rank: 14,
        category: "data",
        title: "UK Health & Environment Indicators",
        description: `Published Kaggle dataset joining PM2.5 air quality against avoidable mortality rates across 100 UK local authorities for 2022, built to make the two series directly comparable at authority level.`,
        image: "https://www.kaggle.com/static/images/site-logo.png",
        alt: "UK local authority health dataset",
        tags: ["Data Science", "Public Health", "Kaggle"],
        links: [
            { href: "https://www.kaggle.com/datasets/okaforkosisochukwujp/uk-local-authority-health-and-environment-indicators", icon: "fab fa-kaggle", text: "Dataset" }
        ],
        delayClass: ""
    },
    // 15 - HomeCredit
    {
        rank: 15,
        category: "data",
        title: "HomeCredit Data Alchemy",
        description: `Credit risk modelling on the Home Credit dataset, covering feature engineering across bureau and previous-application history through to model evaluation.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/HomeCredit-Data-Alchemy",
        alt: "HomeCredit risk model",
        tags: ["Machine Learning", "Python", "Risk"],
        links: [
            { href: "https://github.com/Ksschkw/HomeCredit-Data-Alchemy", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: "delay-1"
    },
    // 16 - Drugs RAG
    {
        rank: 16,
        category: "ai",
        title: "Drugs RAG",
        description: `Retrieval system over scraped drug monographs that answers interaction and prescribing questions by citing the source text rather than generating from memory.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/drugs",
        alt: "Drugs RAG system",
        tags: ["RAG", "Python", "Healthcare"],
        links: [
            { href: "https://github.com/Ksschkw/drugs", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: "delay-2"
    },
    // 17 - Conditions data
    {
        rank: 17,
        category: "data",
        title: "Conditions Data Pipeline",
        description: `Scraper that walks every condition page on ada.com and extracts each section heading with the content beneath it, covering symptoms and causes, then writes the result to JSON and CSV for downstream medical NLP work.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/ScrapeddashiiAlchemy",
        alt: "Conditions data pipeline",
        tags: ["Web Scraping", "Python", "Data"],
        links: [
            { href: "https://github.com/Ksschkw/ScrapeddashiiAlchemy", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: ""
    },
    // 18 - Drugs data
    {
        rank: 18,
        category: "data",
        title: "Drugs Data",
        description: `Scraper that pulls drug monographs from drugs.com into structured JSON, intended as source material for retrieval and interaction modelling.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/drugs",
        alt: "Drugs data scraper",
        tags: ["Web Scraping", "Python", "Data"],
        links: [
            { href: "https://github.com/Ksschkw/drugs", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: "delay-1"
    },
    // 19 - GRPGHT
    {
        rank: 19,
        category: "web",
        title: "GRPGHT Event Platform",
        description: `Platform for competitive FPS players entering real-world events, covering registration, brackets, and scheduling.`,
        image: "imagesnshii/gaming.png",
        alt: "GRPGHT event platform",
        tags: ["Web", "JavaScript", "API"],
        links: [
            { href: "https://github.com/Ksschkw/GRPGHT", icon: "fab fa-github", text: "Code" },
            { href: "https://grpght.onrender.com", icon: "fas fa-external-link-alt", text: "Live" }
        ],
        delayClass: "delay-2"
    },
    // 20 - AI Chat Assistant
    {
        rank: 20,
        category: "ai",
        title: "AI Chat Assistant",
        description: `Chat backend that runs a locally hosted PyTorch model by default and falls back to OpenRouter when the local path is unavailable.`,
        image: "imagesnshii/aiassistant.png",
        alt: "AI chat assistant",
        tags: ["PyTorch", "Python", "NLP"],
        links: [
            { href: "https://github.com/Ksschkw/chatbot_and_backendformywebsite", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: ""
    },
    // 21 - Multi-feature bot
    {
        rank: 21,
        category: "telegram",
        title: "Multi-Feature Bot",
        description: `Telegram bot hosting a set of small utilities and mini-apps behind a single command interface.`,
        image: "imagesnshii/telegram-bot-thumb2.jpg",
        alt: "Multi-feature Telegram bot",
        tags: ["Telegram", "Python", "API"],
        links: [
            { href: "https://github.com/Ksschkw/KosiTGBot", icon: "fab fa-github", text: "Code" },
            { href: "https://t.me/k0s1bot", icon: "fab fa-telegram", text: "Bot" }
        ],
        delayClass: "delay-1"
    },
    // 22 - Client site
    {
        rank: 22,
        category: "web",
        title: "Biochemistry Research Portfolio",
        description: `Portfolio site delivered for a biochemistry researcher, covering publications, current research, and a media gallery. Built to be edited without touching markup.`,
        image: "https://obianuju.onrender.com/gallery/justmehehe.jpeg",
        alt: "Biochemistry research portfolio site",
        tags: ["Web", "Client Work", "JavaScript"],
        links: [
            { href: "https://obianuju.onrender.com", icon: "fas fa-external-link-alt", text: "Live" }
        ],
        delayClass: "delay-2"
    },
    // 23 - Kolaborasi-Kosi
    {
        rank: 23,
        category: "web",
        title: "Kolaborasi-Kosi",
        description: `Shared drawing canvas where multiple clients paint on the same board in real time.`,
        image: "imagesnshii/kolabrasi.png",
        alt: "Kolaborasi-Kosi drawing canvas",
        tags: ["Web", "JavaScript", "Realtime"],
        links: [
            { href: "https://github.com/Ksschkw/collab-draw", icon: "fab fa-github", text: "Code" },
            { href: "https://kolaborasi-kosi.onrender.com", icon: "fas fa-external-link-alt", text: "Live" }
        ],
        delayClass: ""
    },
    // 24 - Krypto-Kosi
    {
        rank: 24,
        category: "web",
        title: "Krypto-Kosi",
        description: `Crypto price board with sorting by price and momentum, reading from a public market data API.`,
        image: "imagesnshii/kryptokosi.png",
        alt: "Krypto-Kosi price board",
        tags: ["Web", "JavaScript", "API"],
        links: [
            { href: "https://github.com/Ksschkw/KryptoKosi", icon: "fab fa-github", text: "Code" },
            { href: "https://krypto-kosi.onrender.com", icon: "fas fa-external-link-alt", text: "Live" }
        ],
        delayClass: "delay-1"
    },
    // 25 - Kosi Weather
    {
        rank: 25,
        category: "web",
        title: "Kosi Weather",
        description: `Weather lookup by city with current conditions and a short forecast.`,
        image: "imagesnshii/weather.png",
        alt: "Kosi Weather app",
        tags: ["Web", "JavaScript", "API"],
        links: [
            { href: "https://github.com/Ksschkw/weatherkosi", icon: "fab fa-github", text: "Code" },
            { href: "https://kosi-weather.onrender.com", icon: "fas fa-external-link-alt", text: "Live" }
        ],
        delayClass: "delay-2"
    },
    // 26 - MediaPipe experiments
    {
        rank: 26,
        category: "ai",
        title: "MediaPipe & OpenCV Experiments",
        description: `Computer vision exercises with MediaPipe and OpenCV covering hand pose and face mesh tracking.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/mediapipe-openCV-projects-n-stuff",
        alt: "MediaPipe and OpenCV experiments",
        tags: ["Computer Vision", "Python", "OpenCV"],
        links: [
            { href: "https://github.com/Ksschkw/mediapipe-openCV-projects-n-stuff", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: ""
    },
    // 27 - donotopen
    {
        rank: 27,
        category: "web",
        title: "donotopen",
        description: `Archive of earlier creative-coding work: fractal trees, small neural-network ecosystems, WebGL shaders, and a rule-manipulation puzzle.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/donotopen",
        alt: "Creative coding archive",
        tags: ["Creative Coding", "JavaScript", "WebGL"],
        links: [
            { href: "https://github.com/Ksschkw/donotopen", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: "delay-1"
    },
    // 28 - Previous portfolio
    {
        rank: 28,
        category: "web",
        title: "First Portfolio",
        description: `The first version of this site, kept for reference. Replaced by the current build.`,
        image: "imagesnshii/first.png",
        alt: "First portfolio site",
        tags: ["Web", "Archive"],
        links: [
            { href: "https://github.com/Ksschkw/kosip", icon: "fab fa-github", text: "Code" },
            { href: "http://okaforkosisochukwu.onrender.com", icon: "fas fa-external-link-alt", text: "Live" }
        ],
        delayClass: "delay-2"
    }
];

// ---------- FUNCTION TO RENDER PROJECTS DYNAMICALLY ----------
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const ordered = [...projectsData].sort((a, b) => (a.rank || 999) - (b.rank || 999));

    ordered.forEach(proj => {
        const card = document.createElement('article');
        card.className = `project-card fade-in ${proj.delayClass || ''}`.trim();
        card.setAttribute('data-category', proj.category);
        card.setAttribute('data-rank', proj.rank);
        card.style.order = proj.rank;
        if (proj.featured) card.classList.add('is-featured');

        // Image
        const imgDiv = document.createElement('div');
        imgDiv.className = 'project-image';
        const img = document.createElement('img');
        img.src = proj.image;
        img.alt = proj.alt;
        imgDiv.appendChild(img);

        // Content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'project-content';

        const meta = document.createElement('div');
        meta.className = 'project-meta';

        const rank = document.createElement('span');
        rank.className = 'project-rank';
        rank.textContent = String(proj.rank).padStart(2, '0');
        meta.appendChild(rank);

        if (proj.featured) {
            const flag = document.createElement('span');
            flag.className = 'project-flag';
            flag.textContent = 'Flagship';
            meta.appendChild(flag);
        }

        const title = document.createElement('h3');
        title.textContent = proj.title;

        const desc = document.createElement('p');
        desc.className = 'project-desc';
        desc.innerHTML = proj.description; // HTML allowed

        // Tags
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'project-tags';
        proj.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'project-tag';
            span.textContent = tag;
            tagsDiv.appendChild(span);
        });

        // Links
        const linksDiv = document.createElement('div');
        linksDiv.className = 'project-links';
        proj.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'project-link';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.innerHTML = `<i class="${link.icon}"></i> ${link.text}`;
            linksDiv.appendChild(a);
        });

        contentDiv.appendChild(meta);
        contentDiv.appendChild(title);
        contentDiv.appendChild(desc);

        // Long descriptions collapse so cards stay scannable. The toggle is only
        // revealed once layout proves the text actually overflows.
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'desc-toggle';
        toggle.textContent = 'Read more';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.hidden = true;

        toggle.addEventListener('click', () => {
            const collapsed = desc.classList.toggle('is-collapsed');
            toggle.textContent = collapsed ? 'Read more' : 'Read less';
            toggle.setAttribute('aria-expanded', String(!collapsed));
        });

        contentDiv.appendChild(toggle);
        contentDiv.appendChild(tagsDiv);
        contentDiv.appendChild(linksDiv);

        card.appendChild(imgDiv);
        card.appendChild(contentDiv);

        grid.appendChild(card);

        desc.classList.add('is-collapsed');
        if (desc.scrollHeight - desc.clientHeight > 2) {
            toggle.hidden = false;
        } else {
            desc.classList.remove('is-collapsed');
        }
    });
}

// PWA functionality
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installButton = document.getElementById('installButton');
const installPromptClose = document.getElementById('installPromptClose');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPrompt.classList.add('show');
    console.log('PWA installation available');
});

installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
    installPrompt.classList.remove('show');
});

installPromptClose.addEventListener('click', () => {
    installPrompt.classList.remove('show');
});

window.addEventListener('appinstalled', () => {
    installPrompt.classList.remove('show');
    deferredPrompt = null;
    console.log('PWA was installed');
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
            console.log('SW registered: ', registration);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New version available
                        showToast('New version available! Updating...', 'info');
                        // Optional: Automated update or ask user
                        // For now, we auto-update after a delay or let the user click a toast action
                        // But let's just show a toast and reload if user clicks "Update" (simulated here by reload after toast)

                        const toast = document.getElementById('toast');
                        toast.innerHTML = 'Update available! <button id="pwaUpdateBtn" style="background:transparent;border:1px solid currentColor;border-radius:4px;padding:2px 5px;cursor:pointer;">Update</button>';
                        toast.classList.add('show');

                        document.getElementById('pwaUpdateBtn').addEventListener('click', () => {
                            if (registration.waiting) {
                                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                            }
                        });
                    }
                });
            });
        }).catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
        });

        // Ensure controller change reloads page
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    });
}

// Mobile Nav Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileNavHome = document.getElementById('mobileNavHome');
    const mobileNavGames = document.getElementById('mobileNavGames');
    const mobileNavChat = document.getElementById('mobileNavChat');
    const openExperienceModalBtn = document.getElementById('openExperienceModalBtn');

    // Close modals on any mobile nav click
    document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
            document.body.style.overflow = 'auto';
        });
    });

    if (mobileNavHome) {
        mobileNavHome.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Generate active state
            document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(el => el.classList.remove('active'));
            mobileNavHome.classList.add('active');
        });
    }

    if (mobileNavGames) {
        mobileNavGames.addEventListener('click', (e) => {
            e.preventDefault();
            if (openExperienceModalBtn) {
                openExperienceModalBtn.click();
            }
            // Generate active state
            document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(el => el.classList.remove('active'));
            mobileNavGames.classList.add('active');
        });
    }

    if (mobileNavChat) {
        mobileNavChat.addEventListener('click', (e) => {
            e.preventDefault();
            const chatSection = document.getElementById('ai-assistant');
            if (chatSection) {
                chatSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const chatInput = document.getElementById('chatInput');
                    if (chatInput) chatInput.focus();
                }, 800);
            }
            // Generate active state
            document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(el => el.classList.remove('active'));
            mobileNavChat.classList.add('active');
        });
    }

    // Auto active state on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 200;

        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
                const id = sec.getAttribute('id');
                document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });

        if (window.scrollY < 100) {
            document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(el => el.classList.remove('active'));
            if (mobileNavHome) mobileNavHome.classList.add('active');
        }
    });
});

// Configure marked.js
marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function (code, lang) {
        return code;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // --- RENDER PROJECTS FIRST (before filtering) ---
    renderProjects();

    // Initialize object detection
    initObjectDetection();

    // Initialize project filtering
    initProjectFiltering();

    // Initialize puzzle game
    initPuzzleGame();

    // Initialize queens game
    initQueensGame();

    // Initialize Tic Tac Toe game
    initTicTacToeGame();

    // Initialize Memory game
    initMemoryGame();

    // Initialize CLI mode
    initCLIMode();

    // Initialize game modal (now handles both buttons)
    initGameModal();

    // Initialize skill animations
    initSkillAnimations();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize snake game
    initSnakeGame()

    // AI Chat functionality with streaming
    const chatContainer = document.getElementById('chatContainer');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');

    let isGenerating = false;

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || isGenerating) return;

        addMessage(message, 'user');
        chatInput.value = '';

        setInputState(false);

        try {
            const typingIndicator = showTypingIndicator();

            const requestBody = {
                query: message,
                session_id: sessionId
            };

            if (message.toLowerCase().includes('roast me') || message.toLowerCase().includes('roast')) {
                requestBody.query = `Generate a funny roast based on: ${message}`;
                requestBody.session_id = sessionId + '-roast';
            }

            const response = await fetch('https://p01--ragkss--qw5xhkblp8hy.code.run/stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            typingIndicator.remove();

            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message bot-message streaming-message';
            chatContainer.appendChild(messageDiv);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let buffer = '';
            let accumulatedText = '';
            let streamDone = false;

            while (!streamDone) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                let lines = buffer.split('\n');
                buffer = lines.pop();

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;

                    const payload = line.slice(6).trim();
                    if (!payload) continue;

                    let data;
                    try {
                        data = JSON.parse(payload);
                    } catch {
                        continue;
                    }

                    if (data.chunk) {
                        accumulatedText += data.chunk;
                        messageDiv.innerHTML = DOMPurify.sanitize(
                            marked.parse(accumulatedText)
                        );
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }

                    if (data.done) {
                        streamDone = true;
                        messageDiv.classList.remove('streaming-message');
                        break;
                    }
                }
            }

        } catch (error) {
            console.error('Stream error:', error);

            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) typingIndicator.remove();

            addMessage("Sorry, I'm having trouble connecting to the AI service. Please try again later.", 'bot');
        } finally {
            setInputState(true);
        }
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        chatContainer.appendChild(typingDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return typingDiv;
    }

    function setInputState(enabled) {
        isGenerating = !enabled;
        chatInput.disabled = !enabled;
        sendButton.disabled = !enabled;

        if (enabled) {
            chatInput.placeholder = "Ask me anything...";
            sendButton.innerHTML = 'Send';
        } else {
            chatInput.placeholder = "AI is thinking...";
            sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        const sanitizedHTML = DOMPurify.sanitize(marked.parse(text));
        messageDiv.innerHTML = sanitizedHTML;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isGenerating) sendMessage();
    });

    const newChatBtn = document.createElement('button');
    newChatBtn.textContent = 'New Chat Session';
    newChatBtn.className = 'btn secondary';
    newChatBtn.style.marginTop = '1rem';
    newChatBtn.addEventListener('click', () => {
        if (isGenerating) return;

        sessionId = "portfolio-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("portfolio-session", sessionId);

        chatContainer.innerHTML = '<div class="chat-message bot-message">🤖 Hello! I\'m an AI assistant powered by Kosisochukwu\'s RAG system. How can I help you today?</div>';

        showToast('New chat session started!');
    });

    document.querySelector('.chat-input-group').after(newChatBtn);

    // Form submission with RAG integration
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);

            try {
                await fetch('https://formspree.io/f/xqapzbnb', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const response = await fetch('https://p01--ragkss--qw5xhkblp8hy.code.run/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `You are working in the contact-me part of Kosi's personal website. Generate a personalized response for someone named ${name} who sent this message: ${message}.`,
                        session_id: sessionId + '-contact'
                    })
                });

                const data = await response.json();

                showToast(data.response);

                contactForm.reset();
            } catch (error) {
                showToast("Message sent successfully! I'll get back to you soon.");
                contactForm.reset();
            }
        });
    }

    // Show toast notification
    function showToast(message, type = 'default', duration = 5000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast';
        if (type !== 'default') {
            toast.classList.add(type);
        }
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);

        toast.addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => {
        elem.style.opacity = 0;
        elem.style.transition = 'opacity 0.5s ease-in-out';
        observer.observe(elem);
    });

    // Mobile menu functionality
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ?
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });

            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        }
    }

    // Project filtering
    function initProjectFiltering() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const projectCards = document.querySelectorAll('.project-card');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                projectCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Initialize skill animations
    function initSkillAnimations() {
        const skillProgresses = document.querySelectorAll('.skill-progress');
        skillProgresses.forEach(progress => {
            const level = progress.getAttribute('data-level');
            progress.style.width = `${level}%`;
        });
    }

    // Game Modal - now handles both buttons
    function initGameModal() {
        const playGameBtn = document.getElementById('playGameBtn');
        const openExperienceBtn = document.getElementById('openExperienceModalBtn');
        const gameModal = document.getElementById('gameModal');
        const closeModal = document.querySelector('.close');
        const gameOptions = document.querySelectorAll('.game-option');

        function openModal() {
            gameModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        playGameBtn.addEventListener('click', openModal);
        if (openExperienceBtn) {
            openExperienceBtn.addEventListener('click', openModal);
        }

        closeModal.addEventListener('click', () => {
            gameModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === gameModal) {
                gameModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && gameModal.style.display === 'block') {
                gameModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        gameOptions.forEach(option => {
            option.addEventListener('click', () => {
                const gameType = option.getAttribute('data-game');
                gameModal.style.display = 'none';
                document.body.style.overflow = 'auto';

                document.querySelectorAll('.game-section').forEach(section => {
                    section.classList.add('hidden');
                });

                if (gameType === 'puzzle') {
                    document.getElementById('puzzleGameSection').classList.remove('hidden');
                    document.getElementById('puzzleGameSection').scrollIntoView({ behavior: 'smooth' });
                } else if (gameType === 'queens') {
                    document.getElementById('queensGameSection').classList.remove('hidden');
                    document.getElementById('queensGameSection').scrollIntoView({ behavior: 'smooth' });
                } else if (gameType === 'tictactoe') {
                    document.getElementById('tictactoeGameSection').classList.remove('hidden');
                    document.getElementById('tictactoeGameSection').scrollIntoView({ behavior: 'smooth' });
                } else if (gameType === 'memory') {
                    document.getElementById('memoryGameSection').classList.remove('hidden');
                    document.getElementById('memoryGameSection').scrollIntoView({ behavior: 'smooth' });
                } else if (gameType === 'snake') {
                    document.getElementById('snakeGameSection').classList.remove('hidden');
                    document.getElementById('snakeGameSection').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Object Detection Code - updated to grayscale
    function initObjectDetection() {
        let net;
        let isDetecting = false;
        let frameCount = 0;
        let lastUpdate = Date.now();

        async function loadObjectDetection() {
            try {
                net = await cocoSsd.load();
                console.log('AI Model loaded successfully');
            } catch (error) {
                console.error('Error loading model:', error);
                showToast('Error loading AI model. Please try refreshing the page.');
            }
        }

        function updateFPS() {
            const now = Date.now();
            const fps = (frameCount * 1000) / (now - lastUpdate);
            document.getElementById('fpsCounter').textContent = `${fps.toFixed(1)} FPS`;
            frameCount = 0;
            lastUpdate = now;
        }

        async function detectFrame(video, canvas) {
            if (!isDetecting) return;

            try {
                frameCount++;
                const predictions = await net.detect(video);
                const ctx = canvas.getContext('2d');
                const minConfidence = parseFloat(document.getElementById('confidenceSlider').value);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
                ctx.restore();

                predictions.forEach(prediction => {
                    if (prediction.score < minConfidence) return;

                    const allowedClasses = Array.from(document.querySelectorAll('.class-filter:checked'))
                        .map(checkbox => checkbox.value);
                    if (!allowedClasses.includes(prediction.class)) return;

                    const mirroredX = canvas.width - prediction.bbox[0] - prediction.bbox[2];
                    const y = prediction.bbox[1];
                    const width = prediction.bbox[2];
                    const height = prediction.bbox[3];

                    // Grayscale colors
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(mirroredX, y, width, height);

                    ctx.fillStyle = '#000000';
                    ctx.fillRect(mirroredX, y - 20, ctx.measureText(prediction.class).width + 10, 20);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '16px monospace';
                    ctx.fillText(
                        `${prediction.class} ${(prediction.score * 100).toFixed(1)}%`,
                        mirroredX + 5,
                        y - 5
                    );
                });

                if (Date.now() - lastUpdate > 1000) updateFPS();
                requestAnimationFrame(() => detectFrame(video, canvas));
            } catch (error) {
                console.error('Detection error:', error);
                stopDetection();
            }
        }

        async function startDetection() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" }
                });
                const video = document.getElementById('webcam');
                const canvas = document.getElementById('output');

                video.srcObject = stream;

                video.onloadedmetadata = () => {
                    video.play();
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    isDetecting = true;
                    detectFrame(video, canvas);
                    document.getElementById('startButton').style.display = 'none';
                    document.getElementById('stopButton').style.display = 'inline-block';
                };
            } catch (error) {
                console.error('Webcam error:', error);
                showToast('Error accessing webcam. Please enable camera permissions.');
            }
        }

        function stopDetection() {
            isDetecting = false;
            const stream = document.getElementById('webcam').srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            document.getElementById('startButton').style.display = 'inline-block';
            document.getElementById('stopButton').style.display = 'none';
        }

        loadObjectDetection();

        document.getElementById('startButton').addEventListener('click', startDetection);
        document.getElementById('stopButton').addEventListener('click', stopDetection);

        document.getElementById('confidenceSlider').addEventListener('input', (e) => {
            document.getElementById('confidenceValue').textContent =
                `${Math.round(e.target.value * 100)}%`;
        });
    }

    // Puzzle Game
    function initPuzzleGame() {
        const puzzleBoard = document.getElementById('puzzleBoard');
        const moveCounter = document.getElementById('moveCounter');
        const timer = document.getElementById('timer');
        const newGameBtn = document.getElementById('newGameBtn');
        const undoMoveBtn = document.getElementById('undoMoveBtn');
        const checkSolutionBtn = document.getElementById('checkSolutionBtn');
        const solvePuzzleBtn = document.getElementById('solvePuzzleBtn');

        let moves = 0;
        let time = 0;
        let timerInterval;
        let tiles = [];
        let emptyIndex = 15;
        let moveHistory = [];

        function initPuzzle() {
            puzzleBoard.innerHTML = '';
            moves = 0;
            time = 0;
            moveCounter.textContent = 'Moves: 0';
            timer.textContent = 'Time: 00:00';
            moveHistory = [];

            if (timerInterval) clearInterval(timerInterval);

            tiles = Array.from({ length: 15 }, (_, i) => i + 1);
            tiles.push(null);

            shuffleTiles();
            renderTiles();
        }

        function shuffleTiles() {
            for (let i = tiles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
            }
            emptyIndex = tiles.indexOf(null);
        }

        function renderTiles() {
            tiles.forEach((tile, index) => {
                const cell = document.createElement('div');
                cell.className = 'game-cell';
                if (tile === null) {
                    cell.classList.add('empty');
                } else {
                    cell.textContent = tile;
                    cell.addEventListener('click', () => moveTile(index));
                }
                puzzleBoard.appendChild(cell);
            });
        }

        function moveTile(index) {
            const adjacentIndexes = [
                emptyIndex - 1,
                emptyIndex + 1,
                emptyIndex - 4,
                emptyIndex + 4
            ];

            if (adjacentIndexes.includes(index)) {
                moveHistory.push([...tiles]);

                [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
                emptyIndex = index;

                moves++;
                moveCounter.textContent = `Moves: ${moves}`;

                if (moves === 1) {
                    startTimer();
                }

                puzzleBoard.innerHTML = '';
                renderTiles();

                if (isPuzzleSolved()) {
                    clearInterval(timerInterval);
                    showToast('Congratulations! You solved the puzzle! Send a screenshot to claim your reward.');
                }
            }
        }

        function undoMove() {
            if (moveHistory.length > 0) {
                tiles = moveHistory.pop();
                emptyIndex = tiles.indexOf(null);
                moves--;
                moveCounter.textContent = `Moves: ${moves}`;

                puzzleBoard.innerHTML = '';
                renderTiles();
            }
        }

        function checkSolution() {
            if (isPuzzleSolved()) {
                showToast('Congratulations! The puzzle is solved correctly!');
            } else {
                showToast('Not quite right yet. Keep trying!');
            }
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                time++;
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                timer.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }

        function isPuzzleSolved() {
            for (let i = 0; i < tiles.length - 1; i++) {
                if (tiles[i] !== i + 1) return false;
            }
            return true;
        }

        function solvePuzzle() {
            clearInterval(timerInterval);
            tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
            emptyIndex = 15;
            puzzleBoard.innerHTML = '';
            renderTiles();
            moves = 0;
            moveCounter.textContent = 'Moves: 0';
            time = 0;
            timer.textContent = 'Time: 00:00';
            moveHistory = [];
            showToast('Puzzle solved! Try to solve it yourself next time!');
        }

        newGameBtn.addEventListener('click', initPuzzle);
        undoMoveBtn.addEventListener('click', undoMove);
        checkSolutionBtn.addEventListener('click', checkSolution);
        solvePuzzleBtn.addEventListener('click', solvePuzzle);

        initPuzzle();
    }

    // Queens Game
    function initQueensGame() {
        const queensBoard = document.getElementById('queensBoard');
        const queensCounter = document.getElementById('queensCounter');
        const newQueensGameBtn = document.getElementById('newQueensGameBtn');
        const checkQueensSolutionBtn = document.getElementById('checkQueensSolutionBtn');
        const solveQueensBtn = document.getElementById('solveQueensBtn');
        const boardSizeSelect = document.getElementById('boardSize');

        let boardSize = 8;
        let queens = [];
        let board = [];

        function initQueensGame() {
            boardSize = parseInt(boardSizeSelect.value);
            queens = [];
            board = Array(boardSize).fill().map(() => Array(boardSize).fill(false));

            queensCounter.textContent = `Queens placed: 0/${boardSize}`;

            renderQueensBoard();
        }

        function renderQueensBoard() {
            queensBoard.innerHTML = '';
            queensBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

            for (let row = 0; row < boardSize; row++) {
                for (let col = 0; col < boardSize; col++) {
                    const cell = document.createElement('div');
                    cell.className = `queens-cell ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                    cell.dataset.row = row;
                    cell.dataset.col = col;

                    if (board[row][col]) {
                        cell.classList.add('has-queen');
                    }

                    if (isThreatened(row, col) && !board[row][col]) {
                        cell.classList.add('threatened');
                    }

                    if (!board[row][col] && !isThreatened(row, col) && queens.length < boardSize) {
                        cell.classList.add('valid');
                    }

                    cell.addEventListener('click', () => toggleQueen(row, col));
                    queensBoard.appendChild(cell);
                }
            }
        }

        function toggleQueen(row, col) {
            if (board[row][col]) {
                board[row][col] = false;
                queens = queens.filter(q => !(q.row === row && q.col === col));
            } else {
                if (isThreatened(row, col)) {
                    showToast('Cannot place queen in a threatened position!');
                    return;
                }

                board[row][col] = true;
                queens.push({ row, col });
            }

            queensCounter.textContent = `Queens placed: ${queens.length}/${boardSize}`;
            renderQueensBoard();
        }

        function isThreatened(row, col) {
            for (const queen of queens) {
                if (queen.row === row && queen.col !== col) return true;
                if (queen.col === col && queen.row !== row) return true;
                if (Math.abs(queen.row - row) === Math.abs(queen.col - col)) return true;
            }
            return false;
        }

        function checkQueensSolution() {
            if (queens.length !== boardSize) {
                showToast(`You need to place ${boardSize} queens on the board.`);
                return;
            }

            for (const queen of queens) {
                if (isThreatened(queen.row, queen.col)) {
                    showToast('The queens are attacking each other! Try again.');
                    return;
                }
            }

            showToast('Congratulations! You solved the N-Queens problem!');
        }

        function solveQueens() {
            queens = [];
            board = Array(boardSize).fill().map(() => Array(boardSize).fill(false));

            solveQueensRecursive(0);

            queensCounter.textContent = `Queens placed: ${queens.length}/${boardSize}`;
            renderQueensBoard();

            showToast('Puzzle solved! The queens are placed without attacking each other.');
        }

        function solveQueensRecursive(col) {
            if (col >= boardSize) return true;

            for (let row = 0; row < boardSize; row++) {
                if (isSafe(row, col)) {
                    board[row][col] = true;
                    queens.push({ row, col });

                    if (solveQueensRecursive(col + 1)) return true;

                    board[row][col] = false;
                    queens.pop();
                }
            }

            return false;
        }

        function isSafe(row, col) {
            for (let i = 0; i < col; i++) {
                if (board[row][i]) return false;
            }

            for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
                if (board[i][j]) return false;
            }

            for (let i = row, j = col; i < boardSize && j >= 0; i++, j--) {
                if (board[i][j]) return false;
            }

            return true;
        }

        newQueensGameBtn.addEventListener('click', initQueensGame);
        checkQueensSolutionBtn.addEventListener('click', checkQueensSolution);
        solveQueensBtn.addEventListener('click', solveQueens);
        boardSizeSelect.addEventListener('change', initQueensGame);

        initQueensGame();
    }

    // Tic Tac Toe Game
    function initTicTacToeGame() {
        const tictactoeBoard = document.getElementById('tictactoeBoard');
        const gameStatus = document.getElementById('gameStatus');
        const newTicTacToeGameBtn = document.getElementById('newTicTacToeGameBtn');

        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        const humanPlayer = 'X';
        const aiPlayer = 'O';

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        function initTicTacToe() {
            currentPlayer = 'X';
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            gameStatus.textContent = 'Your turn (X)';
            renderTicTacToeBoard();
        }

        function renderTicTacToeBoard() {
            tictactoeBoard.innerHTML = '';

            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.className = 'ttt-cell';
                cell.dataset.index = i;

                if (gameBoard[i] === 'X') {
                    cell.textContent = 'X';
                    cell.classList.add('x');
                } else if (gameBoard[i] === 'O') {
                    cell.textContent = 'O';
                    cell.classList.add('o');
                }

                cell.addEventListener('click', () => handleCellClick(i));
                tictactoeBoard.appendChild(cell);
            }
        }

        function handleCellClick(index) {
            if (gameBoard[index] !== '' || !gameActive || currentPlayer !== humanPlayer) return;

            makeMove(index, humanPlayer);

            if (checkWin(humanPlayer)) {
                gameStatus.textContent = 'You win!';
                gameActive = false;
                highlightWinningCells(humanPlayer);
                showToast('Congratulations! You won!');
                return;
            }

            if (checkDraw()) {
                gameStatus.textContent = 'Game ended in a draw!';
                gameActive = false;
                showToast('The game ended in a draw!');
                return;
            }

            currentPlayer = aiPlayer;
            gameStatus.textContent = "Computer's turn (O)";

            setTimeout(makeAiMove, 500);
        }

        function makeMove(index, player) {
            gameBoard[index] = player;
            renderTicTacToeBoard();
        }

        function makeAiMove() {
            if (!gameActive) return;

            const bestMove = getBestMove();
            makeMove(bestMove, aiPlayer);

            if (checkWin(aiPlayer)) {
                gameStatus.textContent = 'Computer wins!';
                gameActive = false;
                highlightWinningCells(aiPlayer);
                showToast('Computer wins! Better luck next time!');
                return;
            }

            if (checkDraw()) {
                gameStatus.textContent = 'Game ended in a draw!';
                gameActive = false;
                showToast('The game ended in a draw!');
                return;
            }

            currentPlayer = humanPlayer;
            gameStatus.textContent = 'Your turn (X)';
        }

        function getBestMove() {
            let bestScore = -Infinity;
            let bestMove;

            for (let i = 0; i < 9; i++) {
                if (gameBoard[i] === '') {
                    gameBoard[i] = aiPlayer;
                    let score = minimax(gameBoard, 0, false);
                    gameBoard[i] = '';

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }
            }

            return bestMove;
        }

        function minimax(board, depth, isMaximizing) {
            if (checkWin(aiPlayer)) return 10 - depth;
            if (checkWin(humanPlayer)) return depth - 10;
            if (checkDraw()) return 0;

            if (isMaximizing) {
                let bestScore = -Infinity;

                for (let i = 0; i < 9; i++) {
                    if (board[i] === '') {
                        board[i] = aiPlayer;
                        let score = minimax(board, depth + 1, false);
                        board[i] = '';
                        bestScore = Math.max(score, bestScore);
                    }
                }

                return bestScore;
            } else {
                let bestScore = Infinity;

                for (let i = 0; i < 9; i++) {
                    if (board[i] === '') {
                        board[i] = humanPlayer;
                        let score = minimax(board, depth + 1, true);
                        board[i] = '';
                        bestScore = Math.min(score, bestScore);
                    }
                }

                return bestScore;
            }
        }

        function getRandomMove() {
            let availableSpots = [];
            for (let i = 0; i < 9; i++) {
                if (gameBoard[i] === '') {
                    availableSpots.push(i);
                }
            }
            return availableSpots[Math.floor(Math.random() * availableSpots.length)];
        }

        function checkWin(player) {
            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
                    return true;
                }
            }
            return false;
        }

        function checkDraw() {
            return !gameBoard.includes('');
        }

        function highlightWinningCells(player) {
            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
                    document.querySelector(`.ttt-cell[data-index="${a}"]`).classList.add('winning-cell');
                    document.querySelector(`.ttt-cell[data-index="${b}"]`).classList.add('winning-cell');
                    document.querySelector(`.ttt-cell[data-index="${c}"]`).classList.add('winning-cell');
                    break;
                }
            }
        }

        newTicTacToeGameBtn.addEventListener('click', initTicTacToe);
        initTicTacToe();
    }

    // Memory Game
    function initMemoryGame() {
        const memoryBoard = document.getElementById('memoryBoard');
        const movesCounter = document.getElementById('movesCounter');
        const pairsCounter = document.getElementById('pairsCounter');
        const newMemoryGameBtn = document.getElementById('newMemoryGameBtn');

        let cards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;
        let lockBoard = false;

        function initMemoryGame() {
            cards = [];
            flippedCards = [];
            matchedPairs = 0;
            moves = 0;
            lockBoard = false;

            movesCounter.textContent = 'Moves: 0';
            pairsCounter.textContent = 'Pairs found: 0/8';

            const symbols = ['🍕', '🍔', '🍎', '🍉', '🍇', '🍓', '🍦', '🍩'];
            cards = [...symbols, ...symbols];

            shuffleCards();
            renderMemoryBoard();
        }

        function shuffleCards() {
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
        }

        function renderMemoryBoard() {
            memoryBoard.innerHTML = '';

            cards.forEach((symbol, index) => {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.dataset.index = index;

                const cardInner = document.createElement('div');
                cardInner.className = 'memory-card-inner';

                const cardFront = document.createElement('div');
                cardFront.className = 'memory-card-front';

                const cardBack = document.createElement('div');
                cardBack.className = 'memory-card-back';
                cardBack.textContent = symbol;

                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);
                card.appendChild(cardInner);

                card.addEventListener('click', () => flipCard(card, index));
                memoryBoard.appendChild(card);
            });
        }

        function flipCard(card, index) {
            if (lockBoard || card.classList.contains('flipped') || flippedCards.length === 2) return;

            card.classList.add('flipped');
            flippedCards.push({ card, index });

            if (flippedCards.length === 2) {
                lockBoard = true;
                moves++;
                movesCounter.textContent = `Moves: ${moves}`;

                checkForMatch();
            }
        }

        function checkForMatch() {
            const [firstCard, secondCard] = flippedCards;

            if (cards[firstCard.index] === cards[secondCard.index]) {
                matchedPairs++;
                pairsCounter.textContent = `Pairs found: ${matchedPairs}/8`;

                flippedCards = [];
                lockBoard = false;

                if (matchedPairs === 8) {
                    showToast(`Congratulations! You completed the game in ${moves} moves!`);
                }
            } else {
                setTimeout(() => {
                    firstCard.card.classList.remove('flipped');
                    secondCard.card.classList.remove('flipped');
                    flippedCards = [];
                    lockBoard = false;
                }, 1000);
            }
        }

        newMemoryGameBtn.addEventListener('click', initMemoryGame);
        initMemoryGame();
    }

    // Snake Game
    function initSnakeGame() {
        const canvas = document.getElementById('snakeCanvas');
        if (!canvas) return; // section not present
        const ctx = canvas.getContext('2d');
        const scoreEl = document.getElementById('snakeScore');
        const highScoreEl = document.getElementById('snakeHighScore');
        const newGameBtn = document.getElementById('newSnakeGameBtn');

        let gridSize = 20; // 20x20 cells
        let cellSize = canvas.width / gridSize;
        let snake = [{ x: 10, y: 10 }];
        let direction = { x: 0, y: 0 };
        let food = {};
        let score = 0;
        let highScore = localStorage.getItem('snakeHighScore') || 0;
        let gameLoop;
        let gameActive = false;

        highScoreEl.textContent = `High Score: ${highScore}`;

        function randomFood() {
            let newFood;
            do {
                newFood = {
                    x: Math.floor(Math.random() * gridSize),
                    y: Math.floor(Math.random() * gridSize)
                };
            } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
            food = newFood;
        }

        function draw() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw snake
            ctx.fillStyle = '#fff';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize - 1, cellSize - 1);
            });

            // Draw food
            ctx.fillStyle = '#ff2d20';
            ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize - 1, cellSize - 1);
        }

        function move() {
            if (!gameActive) return;

            let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

            // Check wall collision
            if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
                gameOver();
                return;
            }

            // Check self collision
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                gameOver();
                return;
            }

            snake.unshift(head);

            // Check food
            if (head.x === food.x && head.y === food.y) {
                score++;
                scoreEl.textContent = `Score: ${score}`;
                randomFood();
            } else {
                snake.pop();
            }

            draw();
        }

        function gameOver() {
            gameActive = false;
            clearInterval(gameLoop);
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('snakeHighScore', highScore);
                highScoreEl.textContent = `High Score: ${highScore}`;
            }
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = '20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        }

        function startGame() {
            if (gameActive) clearInterval(gameLoop);
            snake = [{ x: 10, y: 10 }];
            direction = { x: 1, y: 0 }; // start moving right
            score = 0;
            scoreEl.textContent = 'Score: 0';
            randomFood();
            gameActive = true;
            draw();
            gameLoop = setInterval(move, 150);
        }

        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            if (!gameActive) return;
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (direction.y === 0) direction = { x: 0, y: -1 }; break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (direction.y === 0) direction = { x: 0, y: 1 }; break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (direction.x === 0) direction = { x: -1, y: 0 }; break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (direction.x === 0) direction = { x: 1, y: 0 }; break;
            }
        });

        // Mobile Controls
        const snakeUpBtn = document.getElementById('snakeUpBtn');
        const snakeDownBtn = document.getElementById('snakeDownBtn');
        const snakeLeftBtn = document.getElementById('snakeLeftBtn');
        const snakeRightBtn = document.getElementById('snakeRightBtn');

        if (snakeUpBtn) {
            snakeUpBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (direction.y === 0) direction = { x: 0, y: -1 };
            });
            snakeDownBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (direction.y === 0) direction = { x: 0, y: 1 };
            });
            snakeLeftBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (direction.x === 0) direction = { x: -1, y: 0 };
            });
            snakeRightBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (direction.x === 0) direction = { x: 1, y: 0 };
            });

            // Add touch support to prevent double firing or delay
            snakeUpBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (direction.y === 0) direction = { x: 0, y: -1 };
            });
            snakeDownBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (direction.y === 0) direction = { x: 0, y: 1 };
            });
            snakeLeftBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (direction.x === 0) direction = { x: -1, y: 0 };
            });
            snakeRightBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (direction.x === 0) direction = { x: 1, y: 0 };
            });
        }

        newGameBtn.addEventListener('click', startGame);

        // Initial setup
        startGame();
    }

    // CLI Mode
    // CLI Mode – Advanced Terminal Simulation
    function initCLIMode() {
        const modeToggle = document.getElementById('modeToggle');
        const cliMode = document.getElementById('cliMode');
        const cliCloseBtn = document.getElementById('cliCloseBtn');
        const cliInput = document.getElementById('cliInput');
        const cliContent = document.getElementById('cliContent');
        const cliActivePrompt = document.getElementById('cliActivePrompt');
        const cliBody = document.getElementById('cliBody');

        // Virtual filesystem
        let fs = {
            '/': {
                type: 'dir',
                children: {
                    'home': {
                        type: 'dir', children: {
                            'kss': { type: 'dir', children: {} }
                        }
                    },
                    'projects': {
                        type: 'dir', children: {
                            'object-detection.txt': { type: 'file', content: 'Real-time object detection with TensorFlow.js' },
                            'rag-agent.txt': { type: 'file', content: 'MYRAGAGENT – RAG system using kssrag' }
                        }
                    },
                    'about.txt': { type: 'file', content: 'Kosisochukwu Okafor\nSoftware Engineer. Backend, infrastructure, and AI systems.\nShips production services in Python, C#, and Go. Works across AWS and Azure.\nContact: kookafor893@gmail.com' },
                    'skills.txt': { type: 'file', content: 'AI/ML: RAG, Neural Networks, NLP, TensorFlow, PyTorch\nDevelopment: Python, JavaScript, .NET, FastAPI\nCloud: AWS, Azure, Ansible, GitHub Actions\nData: HDFS, Hadoop, Protege' }
                }
            }
        };

        let currentPath = '/home/kss';  // start in user home
        let history = [];
        let historyIndex = -1;

        function getNode(path) {
            if (path === '/') return fs['/'];
            let parts = path.split('/').filter(p => p !== '');
            let node = fs['/'];
            for (let part of parts) {
                if (node.type !== 'dir' || !node.children[part]) return null;
                node = node.children[part];
            }
            return node;
        }

        function resolvePath(inputPath) {
            if (inputPath.startsWith('/')) return inputPath;
            let parts = currentPath.split('/').filter(p => p !== '');
            let inputParts = inputPath.split('/').filter(p => p !== '');
            for (let p of inputParts) {
                if (p === '..') {
                    if (parts.length > 0) parts.pop();
                } else if (p !== '.') {
                    parts.push(p);
                }
            }
            return '/' + parts.join('/');
        }

        function listDir(path) {
            let node = getNode(path);
            if (!node || node.type !== 'dir') return null;
            return Object.keys(node.children).map(name => {
                let child = node.children[name];
                return { name, type: child.type };
            });
        }

        function addCLIOutput(text, className = 'cli-output') {
            const line = document.createElement('div');
            line.className = className;
            line.textContent = text;
            cliContent.appendChild(line);
            scrollToBottom();
        }

        function addRawHTMLOutput(html, className = 'cli-output') {
            const line = document.createElement('div');
            line.className = className;
            line.innerHTML = html;
            cliContent.appendChild(line);
            scrollToBottom();
        }

        function scrollToBottom() {
            if (cliBody) {
                cliBody.scrollTop = cliBody.scrollHeight;
            }
        }

        function updatePromptDisplay() {
            if (cliActivePrompt) {
                cliActivePrompt.textContent = `kss@portfolio:${currentPath}$`;
            }
        }

        function closeCLI() {
            cliMode.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function openCLI() {
            cliMode.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            cliContent.innerHTML = ''; // clear previous
            
            // Terminal banner
            const welcomeArt = `
 ██╗  ██╗███████╗███████╗ ██████╗██╗  ██╗██╗██╗    ██╗
 ██║ ██╔╝██╔════╝██╔════╝██╔════╝██║  ██║██║██║    ██║
 █████╔╝ ███████╗███████╗██║     ███████║██║██║ █╗ ██║
 ██╔═██╗ ╚════██║╚════██║██║     ██╔══██║██║██║███╗██║
 ██║  ██╗███████║███████║╚██████╗██║  ██║██║╚███╔███╔╝
 ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝ ╚══╝╚══╝ 
`;
            addRawHTMLOutput(`<pre style="color: var(--accent); font-weight: bold; line-height: 1.15; margin: 0 0 1rem; white-space: pre;">${welcomeArt}</pre>`);
            addCLIOutput('Kosisochukwu Okafor. Software engineer.');
            addCLIOutput('Type \'help\' for commands, \'projects\' for the ranked index.');
            addCLIOutput('');
            updatePromptDisplay();
            setTimeout(() => {
                if (cliInput) cliInput.focus();
            }, 100);
        }

        function processCommand(input) {
            const args = input.trim().split(/\s+/);
            const cmd = args[0].toLowerCase();
            const rest = args.slice(1);

            switch (cmd) {
                case 'help':
                    addCLIOutput('Built-in commands:');
                    addCLIOutput('  help                    Show this help menu');
                    addCLIOutput('  about                   Display personal background information');
                    addCLIOutput('  projects [--all]        List projects (use --all flag to list details)');
                    addCLIOutput('  skills                  View technical expertise list');
                    addCLIOutput('  contact                 Show contact card');
                    addCLIOutput('  game                    Launch the gaming modal');
                    addCLIOutput('  clear                   Clear the screen');
                    addCLIOutput('  exit                    Close terminal interface');
                    addCLIOutput('');
                    addCLIOutput('Filesystem commands:');
                    addCLIOutput('  ls [path]               List directory items');
                    addCLIOutput('  cd <path>               Change directory path');
                    addCLIOutput('  cat <file>              Output contents of a file');
                    addCLIOutput('  mkdir <dir>             Create a new directory');
                    addCLIOutput('  rm <path>               Delete file or directory');
                    addCLIOutput('  echo <text> > <file>    Write custom text to file');
                    break;
                case 'about':
                    addCLIOutput('Kosisochukwu Okafor - Software Engineer');
                    addCLIOutput('Backend, infrastructure, and AI systems.');
                    addCLIOutput('AWS Certified Generative AI Developer - Professional.');
                    addCLIOutput('');
                    addCLIOutput('Experience:');
                    addCLIOutput('  • AI/ML Cloud Intern @ Softgem.org (AWS partner)');
                    addCLIOutput('  • Software and AI Applications Engineer @ My Health Integral');
                    addCLIOutput('  • Freelance Software Engineer (Azure, Hadoop, Protege)');
                    break;
                case 'projects':
                    if (rest[0] === '--all') {
                        addCLIOutput('All projects, ranked by engineering weight:');
                        addCLIOutput('');
                        [...projectsData].sort((a, b) => (a.rank || 999) - (b.rank || 999)).forEach(p => {
                            // Strip HTML tags for clean command-line view
                            const desc = p.description.replace(/<[^>]*>/g, '');
                            addCLIOutput(`  ${String(p.rank).padStart(2, '0')}  ${p.title} [${p.category.toUpperCase()}]`);
                            addCLIOutput(`      ${desc}`);
                            if (p.links && p.links.length > 0) {
                                const linkStr = p.links.map(l => `${l.text}: ${l.href}`).join(' | ');
                                addCLIOutput(`      ${linkStr}`);
                            }
                            addCLIOutput('');
                        });
                    } else {
                        addCLIOutput('Projects, ranked. Run "projects --all" for descriptions.');
                        addCLIOutput('');
                        const ranked = [...projectsData].sort((a, b) => (a.rank || 999) - (b.rank || 999));
                        const line = p => `  ${String(p.rank).padStart(2, '0')}  ${p.title} [${p.category.toUpperCase()}]`;
                        ranked.filter(p => p.rank < 9).forEach(p => addCLIOutput(line(p)));
                        addCLIOutput('  09  Real-Time Object Detection [AI]');
                        ranked.filter(p => p.rank > 9 && p.rank <= 12).forEach(p => addCLIOutput(line(p)));
                    }
                    break;
                case 'skills':
                    addCLIOutput('Capabilities:');
                    addCLIOutput('  Systems      API and service design, data modelling, authorization, failure handling');
                    addCLIOutput('  Delivery     scoping, review, observability, cost tradeoffs, release and rollback');
                    addCLIOutput('  Applied AI   retrieval, agent guardrails, evaluation, PyTorch, TensorFlow');
                    addCLIOutput('  Cloud        AWS, Azure, Docker, GitHub Actions, configuration management');
                    addCLIOutput('  Data         PostgreSQL, PostGIS, CosmosDB, Hadoop, extraction pipelines');
                    addCLIOutput('  Languages    Python, TypeScript, C#, Go, SQL, C++');
                    break;
                case 'contact':
                    addCLIOutput('Contact details:');
                    addCLIOutput('  • Email: kookafor893@gmail.com');
                    addCLIOutput('  • Phone: +234 901 954 9473');
                    addCLIOutput('  • Github: github.com/Ksschkw');
                    addCLIOutput('  • WhatsApp: wa.me/2349019549473');
                    break;
                case 'game':
                    addCLIOutput('Launching gaming modal window...');
                    setTimeout(() => {
                        const playBtn = document.getElementById('playGameBtn');
                        if (playBtn) playBtn.click();
                    }, 300);
                    break;
                case 'clear':
                    cliContent.innerHTML = '';
                    break;
                case 'exit':
                    closeCLI();
                    break;

                // Filesystem commands
                case 'ls':
                    {
                        let target = rest[0] ? resolvePath(rest[0]) : currentPath;
                        let entries = listDir(target);
                        if (entries === null) {
                            addCLIOutput(`ls: cannot access '${rest[0] || currentPath}': No such directory`);
                        } else if (entries.length === 0) {
                            // Empty directory, do nothing
                        } else {
                            // Format list dynamically in columns with colored directories
                            let outputHTML = '';
                            entries.forEach(e => {
                                if (e.type === 'dir') {
                                    outputHTML += `<span class="cli-item-dir">${e.name}/</span>   `;
                                } else {
                                    outputHTML += `<span class="cli-item-file">${e.name}</span>   `;
                                }
                            });
                            addRawHTMLOutput(outputHTML);
                        }
                    }
                    break;
                case 'cd':
                    if (rest.length === 0) {
                        currentPath = '/home/kss';
                    } else {
                        let newPath = resolvePath(rest[0]);
                        let node = getNode(newPath);
                        if (node && node.type === 'dir') {
                            currentPath = newPath;
                        } else {
                            addCLIOutput(`cd: no such directory: ${rest[0]}`);
                        }
                    }
                    updatePromptDisplay();
                    break;
                case 'cat':
                    if (rest.length === 0) {
                        addCLIOutput('cat: missing file operand');
                    } else {
                        let filePath = resolvePath(rest[0]);
                        let node = getNode(filePath);
                        if (node && node.type === 'file') {
                            addCLIOutput(node.content);
                        } else {
                            addCLIOutput(`cat: ${rest[0]}: No such file`);
                        }
                    }
                    break;
                case 'mkdir':
                    if (rest.length === 0) {
                        addCLIOutput('mkdir: missing operand');
                    } else {
                        let dirPath = resolvePath(rest[0]);
                        let parentPath = dirPath.substring(0, dirPath.lastIndexOf('/')) || '/';
                        let dirName = dirPath.split('/').pop();
                        let parentNode = getNode(parentPath);
                        if (!parentNode || parentNode.type !== 'dir') {
                            addCLIOutput(`mkdir: cannot create directory '${rest[0]}': Parent not a directory`);
                        } else if (parentNode.children[dirName]) {
                            addCLIOutput(`mkdir: cannot create directory '${rest[0]}': File exists`);
                        } else {
                            parentNode.children[dirName] = { type: 'dir', children: {} };
                        }
                    }
                    break;
                case 'rm':
                    if (rest.length === 0) {
                        addCLIOutput('rm: missing operand');
                    } else {
                        let targetPath = resolvePath(rest[0]);
                        let parentPath = targetPath.substring(0, targetPath.lastIndexOf('/')) || '/';
                        let targetName = targetPath.split('/').pop();
                        let parentNode = getNode(parentPath);
                        if (parentNode && parentNode.type === 'dir' && parentNode.children[targetName]) {
                            delete parentNode.children[targetName];
                        } else {
                            addCLIOutput(`rm: cannot remove '${rest[0]}': No such file or directory`);
                        }
                    }
                    break;
                case 'echo':
                    if (rest.includes('>')) {
                        let gtIndex = rest.indexOf('>');
                        let text = rest.slice(0, gtIndex).join(' ');
                        let fileName = rest[gtIndex + 1];
                        if (!fileName) {
                            addCLIOutput('echo: missing file name after >');
                        } else {
                            let filePath = resolvePath(fileName);
                            let parentPath = filePath.substring(0, filePath.lastIndexOf('/')) || '/';
                            let fileNameOnly = filePath.split('/').pop();
                            let parentNode = getNode(parentPath);
                            if (parentNode && parentNode.type === 'dir') {
                                parentNode.children[fileNameOnly] = { type: 'file', content: text };
                            } else {
                                addCLIOutput(`echo: cannot create file '${fileName}': Parent not a directory`);
                            }
                        }
                    } else {
                        addCLIOutput(rest.join(' '));
                    }
                    break;
                default:
                    if (cmd) addCLIOutput(`Command not found: ${cmd}. Type 'help' for available commands.`);
            }
        }

        // Toggle CLI mode event listeners
        if (modeToggle) {
            modeToggle.addEventListener('click', () => {
                if (cliMode.style.display === 'flex') {
                    closeCLI();
                } else {
                    openCLI();
                }
            });
        }

        if (cliCloseBtn) {
            cliCloseBtn.addEventListener('click', closeCLI);
        }

        // Click anywhere in terminal body to focus input
        if (cliBody) {
            cliBody.addEventListener('click', () => {
                if (cliInput) cliInput.focus();
            });
        }

        // Esc key to close terminal
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cliMode.style.display === 'flex') {
                closeCLI();
            }
        });

        // Key events on input (Enter, ArrowUp, ArrowDown, Tab)
        if (cliInput) {
            cliInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const input = cliInput.value;
                    cliInput.value = '';
                    historyIndex = -1;

                    // Append static execution line to history log
                    const historyLine = document.createElement('div');
                    historyLine.className = 'cli-history-line';
                    historyLine.innerHTML = `<span class="cli-prompt">kss@portfolio:${currentPath}$</span> <span class="cli-command-entered">${input}</span>`;
                    cliContent.appendChild(historyLine);

                    const trimmed = input.trim();
                    if (trimmed) {
                        history.push(trimmed);
                        processCommand(trimmed);
                    }
                    
                    scrollToBottom();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (history.length === 0) return;
                    if (historyIndex === -1) {
                        historyIndex = history.length - 1;
                    } else if (historyIndex > 0) {
                        historyIndex--;
                    }
                    cliInput.value = history[historyIndex];
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (historyIndex === -1) return;
                    if (historyIndex < history.length - 1) {
                        historyIndex++;
                        cliInput.value = history[historyIndex];
                    } else {
                        historyIndex = -1;
                        cliInput.value = '';
                    }
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    const value = cliInput.value;
                    const parts = value.trim().split(/\s+/);
                    
                    // Available commands list
                    const commands = ['help', 'about', 'projects', 'skills', 'contact', 'game', 'clear', 'exit', 'ls', 'cd', 'cat', 'mkdir', 'rm', 'echo'];

                    // Case 1: autocomplete a command
                    if (parts.length <= 1 && !value.endsWith(' ')) {
                        const partialCmd = parts[0] || '';
                        const matches = commands.filter(c => c.startsWith(partialCmd.toLowerCase()));
                        if (matches.length === 1) {
                            cliInput.value = matches[0] + ' ';
                        } else if (matches.length > 1) {
                            // list options
                            addCLIOutput('');
                            addCLIOutput(matches.join('    '));
                            // restore prompt and scroll
                            scrollToBottom();
                        }
                    } 
                    // Case 2: autocomplete a path (for cd, cat, rm)
                    else if (parts.length > 1) {
                        const cmd = parts[0].toLowerCase();
                        if (['cd', 'cat', 'ls', 'rm'].includes(cmd)) {
                            const lastArg = parts[parts.length - 1];
                            const lastSlash = lastArg.lastIndexOf('/');
                            
                            let searchDir = currentPath;
                            let prefix = lastArg;
                            
                            if (lastSlash !== -1) {
                                const pathPrefix = lastArg.substring(0, lastSlash);
                                searchDir = resolvePath(pathPrefix);
                                prefix = lastArg.substring(lastSlash + 1);
                            }

                            const entries = listDir(searchDir);
                            if (entries) {
                                const matches = entries.filter(e => e.name.startsWith(prefix));
                                if (matches.length === 1) {
                                    const completed = matches[0].name + (matches[0].type === 'dir' ? '/' : '');
                                    const beforeLastArg = value.substring(0, value.lastIndexOf(lastArg));
                                    const newArg = (lastSlash !== -1 ? lastArg.substring(0, lastSlash + 1) : '') + completed;
                                    cliInput.value = beforeLastArg + newArg;
                                } else if (matches.length > 1) {
                                    addCLIOutput('');
                                    addCLIOutput(matches.map(m => m.name + (m.type === 'dir' ? '/' : '')).join('    '));
                                    scrollToBottom();
                                }
                            }
                        }
                    }
                }
            });
        }
    }
});

// AI Assistant Icon
const aiAssistantIcon = document.getElementById('ai-assistant-icon');
if (aiAssistantIcon) {
    aiAssistantIcon.addEventListener('click', () => {
        document.getElementById('ai-assistant').scrollIntoView({
            behavior: 'smooth'
        });
    });
}
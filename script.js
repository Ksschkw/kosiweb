// Session management
let sessionId = localStorage.getItem("portfolio-session");
if (!sessionId) {
    sessionId = "portfolio-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("portfolio-session", sessionId);
}

// ---------- PROJECTS DATA (all except the static Object Detection card) ----------
const projectsData = [
    // MYRAGAGENTV2
    {
        category: "ai",
        title: "MYRAGAGENTV2",
        description: "Advanced RAG agent using kssrag package with improved retrieval and generation capabilities.",
        image: "https://opengraph.githubassets.com/1/Ksschkw/MYRAGAGENTV2",
        alt: "MYRAGAGENTV2",
        tags: ["AI", "RAG", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/MYRAGAGENTV2", icon: "fab fa-github", text: "Code" },
            { href: "https://agentkosi.onrender.com/", icon: "fas fa-external-link-alt", text: "Live Demo" }
        ],
        delayClass: "delay-1"
    },
    // kssrag Package
    {
        category: "ai",
        title: "kssrag Package",
        description: "Custom RAG framework published on PyPI for building retrieval-augmented generation systems.",
        image: "https://opengraph.githubassets.com/1/Ksschkw/kssrag",
        alt: "kssrag Package",
        tags: ["AI", "RAG", "Python", "PyPI"],
        links: [
            { href: "https://github.com/Ksschkw/kssrag", icon: "fab fa-github", text: "Code" },
            { href: "https://pypi.org/project/kssrag/0.1.2/", icon: "fab fa-python", text: "PyPI" }
        ],
        delayClass: "delay-2"
    },
    // Drug Classification
    {
        category: "data",
        title: "Drugs Data",
        description: `A Script that scrapes <a href="https://drugs.com/" class="project-link">drugs.com</a> gracefully into json dictionaries.
        You can use this data to build a RAG system, A machine learning model that can detect drug interactions, and give general insights about a prescription or even prescribe for you based on you symptom(For this you will need the data from my other scraping<a href="https://github.com/Ksschkw/ScrapeddashiiAlchemy" class="project-link"> <i class="fab fa-github"></i> here) </a> and whatever you wish. I couldn't upload the data to github for now because it is too large but i wil later try to chunk it and then upload it or i wil just use hugginFace hehe`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/drugs",
        alt: "Drug Classification",
        tags: ["AI/ML", "Classification", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/drugs", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: ""
    },
    // Drug RAG
    {
        category: "ai",
        title: "Drugs RAG",
        description: `Turn the previously scraped drugs data into a RAG system.
        A RAG system that can detect drug interactions, and give general insights about a prescription or even prescribe for you based on you symptom(For this you will need the data from my other scraping<a href="https://github.com/Ksschkw/ScrapeddashiiAlchemy" class="project-link"> <i class="fab fa-github"></i> here) </a> and whatever you wish. I couldn't upload the data to github for now because it is too large but i wil later try to chunk it and then upload it or i wil just use hugginFace hehe`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/drugs",
        alt: "Drug Classification",
        tags: ["AI/ML", "Classification", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/drugs", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: ""
    },
    // ScrapeddashiiAlchemy
    {
        category: "data",
        title: "Conditions data",
        description: `Data scraping and transformation pipeline for extracting insights from complex datasets.
        scrapes all condition pages from ada.com/conditions, extracting every <"h2"> -based feature and its corresponding content blocks beneath it(symptoms,Causes,etc). The results are saved in both JSON and CSV formats, ready for analysis, modeling, or medical NLP tasks.`,
        image: "https://opengraph.githubassets.com/1/Ksschkw/ScrapeddashiiAlchemy",
        alt: "ScrapeddashiiAlchemy",
        tags: ["Data Stuff", "Web Scraping", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/ScrapeddashiiAlchemy", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: "delay-1"
    },
    // HomeCredit-Data-Alchemy
    {
        category: "data",
        title: "HomeCredit Data Alchemy",
        description: "Credit risk assessment model using machine learning to predict loan repayment capabilities.",
        image: "https://opengraph.githubassets.com/1/Ksschkw/HomeCredit-Data-Alchemy",
        alt: "HomeCredit-Data-Alchemy",
        tags: ["Data Science", "Risk Assessment", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/HomeCredit-Data-Alchemy", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: "delay-2"
    },
    // MYRAGAGENT
    {
        category: "ai",
        title: "MYRAGAGENT",
        description: "A Retrieval-Augmented Generation (RAG) Agent that provides intelligent responses.",
        image: "https://opengraph.githubassets.com/1/Ksschkw/MYRAGAGENT",
        alt: "MYRAGAGENT",
        tags: ["AI", "RAG", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/MYRAGAGENT", icon: "fab fa-github", text: "Code" },
            { href: "https://agentkosi.onrender.com/", icon: "fas fa-external-link-alt", text: "Live Demo" }
        ],
        delayClass: "delay-1"
    },
    // AI Copilot Agent
    {
        category: "ai",
        title: "AI Copilot Agent",
        description: "FastAPI-based AI Copilot Agent for defining structured innovation challenges.",
        image: "imagesnshii/image.png",
        alt: "AI Copilot Agent",
        tags: ["AI", "FastAPI", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/AI-Copilot-Agent", icon: "fab fa-github", text: "Code" },
            { href: "https://ai-copilot-agent-1.onrender.com/", icon: "fas fa-external-link-alt", text: "Live Demo" }
        ],
        delayClass: "delay-2"
    },
    // Vybe Analytics Telegram Bot
    {
        category: "telegram",
        title: "Vybe Analytics Telegram Bot",
        description: "Provides real-time on-chain insights using Vybe Network APIs.",
        image: "https://opengraph.githubassets.com/1/Ksschkw/vybe-telegram-bot",
        alt: "Vybe Analytics Telegram Bot",
        tags: ["Telegram", "API", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/vybe-telegram-bot", icon: "fab fa-github", text: "Code" },
            { href: "https://t.me/VybeVigil_bot", icon: "fab fa-telegram", text: "Try Bot" }
        ],
        delayClass: ""
    },
    // FPS Gamers Event Website (GRPGHT)
    {
        category: "web",
        title: "FPS Gamers Event Website (GRPGHT)",
        description: "Platform for FPS gamers to compete in real-world events.",
        image: "imagesnshii/gaming.png",
        alt: "FPS Gamers Event Website",
        tags: ["Web", "API", "JavaScript"],
        links: [
            { href: "https://github.com/Ksschkw/GRPGHT", icon: "fab fa-github", text: "Code" },
            { href: "https://grpght.onrender.com", icon: "fas fa-external-link-alt", text: "Live Demo" }
        ],
        delayClass: "delay-1"
    },
    // Bubblemaps Telegram Bot
    {
        category: "telegram",
        title: "Bubblemaps Telegram Bot",
        description: "Analyzes crypto tokens using Bubblemaps data with market insights.",
        image: "https://opengraph.githubassets.com/1/Ksschkw/TheBubbleSnitchBot-2",
        alt: "Bubblemaps Telegram Bot",
        tags: ["Telegram", "Crypto", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/TheBubbleSnitchBot-2", icon: "fab fa-github", text: "Code" },
            { href: "https://t.me/TheBubbleSnitch_bot", icon: "fab fa-telegram", text: "Try Bot" }
        ],
        delayClass: "delay-2"
    },
    // Previous Portfolio
    {
        category: "web",
        title: "Previous Portfolio",
        description: "My earlier portfolio website with interactive elements and project showcases.",
        image: "imagesnshii/first.png",
        alt: "Previous Portfolio",
        tags: ["Web", "HTML/CSS", "JavaScript"],
        links: [
            { href: "https://github.com/Ksschkw/kosip", icon: "fab fa-github", text: "Code" },
            { href: "http://okaforkosisochukwu.onrender.com", icon: "fas fa-external-link-alt", text: "Live Demo" }
        ],
        delayClass: ""
    },
    // School Lab Project
    {
        category: "web",
        title: "School Lab Project",
        description: "A school project hosted online to demonstrate web development skills.",
        image: "imagesnshii/lab.png",
        alt: "School Lab Project",
        tags: ["Web", "HTML/CSS", "JavaScript"],
        links: [
            { href: "https://github.com/Ksschkw/Nigeria.net", icon: "fab fa-github", text: "Code" },
            { href: "https://nigeria-net-justaschoollabproject-hostit.onrender.com", icon: "fas fa-external-link-alt", text: "Live Demo" }
        ],
        delayClass: "delay-1"
    },
    // Kosi Weather
    {
        category: "web",
        title: "Kosi Weather",
        description: "Weather forecast application allowing users to search by city.",
        image: "imagesnshii/weather.png",
        alt: "Kosi Weather",
        tags: ["Web", "API", "JavaScript"],
        links: [
            { href: "https://github.com/Ksschkw/weatherkosi", icon: "fab fa-github", text: "Code" },
            { href: "https://kosi-weather.onrender.com", icon: "fas fa-external-link-alt", text: "Live Demo" }
        ],
        delayClass: "delay-2"
    },
    // Krypto-Kosi
    {
        category: "web",
        title: "Krypto-Kosi",
        description: "Displays crypto prices with ranking by price and trend.",
        image: "imagesnshii/kryptokosi.png",
        alt: "Krypto-Kosi",
        tags: ["Web", "API", "JavaScript"],
        links: [
            { href: "https://github.com/Ksschkw/KryptoKosi", icon: "fab fa-github", text: "Code" },
            { href: "https://krypto-kosi.onrender.com", icon: "fas fa-external-link-alt", text: "Live Demo" }
        ],
        delayClass: ""
    },
    // Multi-Feature Telegram Bot
    {
        category: "telegram",
        title: "Multi-Feature Telegram Bot",
        description: "Telegram bot with integrated mini-apps for various functionalities.",
        image: "imagesnshii/telegram-bot-thumb2.jpg",
        alt: "Multi-Feature Telegram Bot",
        tags: ["Telegram", "API", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/KosiTGBot", icon: "fab fa-github", text: "Code" },
            { href: "https://t.me/k0s1bot", icon: "fab fa-telegram", text: "Try Bot" }
        ],
        delayClass: "delay-1"
    },
    // Kolaborasi-Kosi
    {
        category: "web",
        title: "Kolaborasi-Kosi",
        description: "Collaborative drawing canvas for real-time artwork.",
        image: "imagesnshii/kolabrasi.png",
        alt: "Kolaborasi-Kosi",
        tags: ["Web", "API", "JavaScript"],
        links: [
            { href: "https://github.com/Ksschkw/collab-draw", icon: "fab fa-github", text: "Code" },
            { href: "https://kolaborasi-kosi.onrender.com", icon: "fas fa-external-link-alt", text: "Live Demo" }
        ],
        delayClass: "delay-2"
    },
    // AI Chat Assistant
    {
        category: "ai",
        title: "AI Chat Assistant",
        description: "Custom-built chatbot leveraging PyTorch with OpenRouter fallback.",
        image: "imagesnshii/aiassistant.png",
        alt: "AI Chat Assistant",
        tags: ["AI", "NLP", "Python"],
        links: [
            { href: "https://github.com/Ksschkw/chatbot_and_backendformywebsite", icon: "fab fa-github", text: "Code" }
        ],
        delayClass: ""
    }
];

// ---------- FUNCTION TO RENDER PROJECTS DYNAMICALLY ----------
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    projectsData.forEach(proj => {
        const card = document.createElement('div');
        card.className = `project-card fade-in ${proj.delayClass}`;
        card.setAttribute('data-category', proj.category);

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

        const title = document.createElement('h3');
        title.textContent = proj.title;

        const desc = document.createElement('p');
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

        contentDiv.appendChild(title);
        contentDiv.appendChild(desc);
        contentDiv.appendChild(tagsDiv);
        contentDiv.appendChild(linksDiv);

        card.appendChild(imgDiv);
        card.appendChild(contentDiv);

        grid.appendChild(card);
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
        }).catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

// Configure marked.js
marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function(code, lang) {
        return code;
    }
});

document.addEventListener('DOMContentLoaded', function() {
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
        contactForm.addEventListener('submit', async function(e) {
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
        anchor.addEventListener('click', function(e) {
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
            
            tiles = Array.from({length: 15}, (_, i) => i + 1);
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

// CLI Mode
function initCLIMode() {
    const modeToggle = document.getElementById('modeToggle');
    const cliMode = document.getElementById('cliMode');
    const cliInput = document.getElementById('cliInput');
    const cliContent = document.getElementById('cliContent');
    
    modeToggle.addEventListener('click', () => {
        if (cliMode.style.display === 'block') {
            cliMode.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            cliMode.style.display = 'block';
            document.body.style.overflow = 'hidden';
            cliInput.focus();
        }
    });
    
    const commands = {
        help: () => {
            addCLIOutput('Available commands:');
            addCLIOutput('  help - Show this help message');
            addCLIOutput('  about - Learn about Kosisochukwu');
            addCLIOutput('  projects - List all projects');
            addCLIOutput('  skills - View technical skills');
            addCLIOutput('  contact - Get contact information');
            addCLIOutput('  game - Play the puzzle game');
            addCLIOutput('  clear - Clear the terminal');
            addCLIOutput('  exit - Exit CLI mode');
        },
        about: () => {
            addCLIOutput('Kosisochukwu Okafor - AI/ML Engineer & Software Developer');
            addCLIOutput('4th year Software Engineering student at Federal University of Technology Owerri');
            addCLIOutput('Passionate about AI, RAG systems, and building innovative solutions');
        },
        projects: () => {
            addCLIOutput('Projects:');
            addCLIOutput('  • Real-Time Object Detection - AI/ML, Web');
            addCLIOutput('  • MYRAGAGENT - AI, RAG, Python');
            addCLIOutput('  • AI Copilot Agent - AI, FastAPI, Python');
            addCLIOutput('  • Vybe Analytics Telegram Bot - Telegram, API, Python');
            addCLIOutput('  • FPS Gamers Event Website - Web, API, JavaScript');
            addCLIOutput('  • And many more... (type "projects --all" for full list)');
        },
        skills: () => {
            addCLIOutput('Skills:');
            addCLIOutput('  • AI/ML: RAG Systems, Neural Networks, NLP, TensorFlow, PyTorch');
            addCLIOutput('  • Development: Python, JavaScript, FastAPI, Flask, React, Vue.js');
            addCLIOutput('  • DevOps & Cloud: AWS, Docker, CI/CD, Render, Git');
        },
        contact: () => {
            addCLIOutput('Contact Information:');
            addCLIOutput('  • Email: kookafor893@gmail.com');
            addCLIOutput('  • Phone: +234 901 954 9473');
            addCLIOutput('  • GitHub: github.com/Ksschkw');
            addCLIOutput('  • WhatsApp: wa.me/2349019549473');
        },
        game: () => {
            addCLIOutput('Opening game modal...');
            setTimeout(() => {
                document.getElementById('playGameBtn').click();
            }, 500);
        },
        clear: () => {
            cliContent.innerHTML = '';
        },
        exit: () => {
            cliMode.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    cliInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = cliInput.value.trim().toLowerCase();
            cliInput.value = '';
            
            addCLIOutput(`> ${command}`, 'command');
            
            if (commands[command]) {
                commands[command]();
            } else if (command) {
                addCLIOutput(`Command not found: ${command}. Type 'help' for available commands.`);
            }
            
            cliContent.scrollTop = cliContent.scrollHeight;
        }
    });
    
    function addCLIOutput(text, type = 'output') {
        const outputDiv = document.createElement('div');
        outputDiv.className = `cli-${type}`;
        outputDiv.textContent = text;
        cliContent.appendChild(outputDiv);
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
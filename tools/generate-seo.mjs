#!/usr/bin/env node
/**
 * Generates every crawlable artefact from the single source of truth
 * (`projectsData` in script.js):
 *
 *   index.html          - the project cards, pre-rendered between the
 *                         SEO:CARDS markers, plus an ItemList between the
 *                         SEO:ITEMLIST markers
 *   projects.html       - a static hub listing every project in full
 *   projects/<slug>.html- one page per project, so each can rank on its own
 *   projects.json       - the whole portfolio as machine-readable data
 *   llms.txt            - a concise brief for AI agents and chatbots
 *   sitemap.xml         - every indexable URL
 *
 * Run after changing projectsData:
 *
 *     node tools/generate-seo.mjs
 *
 * The point of the pre-rendered cards is that crawlers which do not execute
 * JavaScript (GPTBot, ClaudeBot, PerplexityBot, and search engines on a budget)
 * would otherwise see an empty projects grid.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://kss-venv.onrender.com';
const OUT_DIR = path.join(ROOT, 'projects');
const TODAY = new Date().toISOString().slice(0, 10);

// ----------------------------------------------------------------- utilities

const esc = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const plain = (value) => String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const slugify = (value) => String(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const write = (target, contents) => {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, contents, 'utf8');
    return path.relative(ROOT, target);
};

// Read a PNG's intrinsic size straight out of the IHDR chunk, so screenshots are
// laid out from their real dimensions with no image library and no guessing.
function pngSize(file) {
    const buffer = fs.readFileSync(file);
    const isPng = buffer.length > 24 && buffer.toString('ascii', 1, 4) === 'PNG';
    if (!isPng) throw new Error(`not a PNG: ${file}`);
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

// A destination as a person would read it, not as a URL.
const prettyUrl = (href) => String(href).replace(/^https?:\/\//, '').replace(/\/$/, '');

// ------------------------------------------------------------- project data

const scriptSrc = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8');
const start = scriptSrc.indexOf('const projectsData = [');
if (start === -1) throw new Error('projectsData not found in script.js');
const end = scriptSrc.indexOf('\n];', start) + 3;
// The array is pure data, so it can be evaluated directly.
const projectsData = eval(`(() => { ${scriptSrc.slice(start, end)} return projectsData; })()`);

// Long-form copy for the individual project pages, keyed by slug.
const DETAILS = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'project-details.json'), 'utf8'));

// The live object-detection demo is markup rather than data; it belongs in the
// index and the item list all the same.
const STATIC_PROJECT = {
    rank: 14,
    category: 'ai',
    title: 'Real-Time Object Detection',
    description: 'Detection running in the browser over your webcam with TensorFlow.js and a COCO-SSD model. Class filtering and the confidence threshold are applied client side, and no frame leaves the device.',
    image: 'imagesnshii/object-detection-thumb.png',
    alt: 'Real-Time Object Detection running in the browser',
    tags: ['TensorFlow.js', 'Computer Vision', 'Client Side'],
    links: [{ href: 'https://github.com/Ksschkw/myWebsite', icon: 'fab fa-github', text: 'Code' }],
    delayClass: '',
    isStatic: true,
};

const projects = [...projectsData, STATIC_PROJECT]
    .sort((a, b) => a.rank - b.rank)
    .map((project, index) => {
        const slug = slugify(project.title);
        return {
            ...project,
            position: index + 1,
            slug,
            plainDescription: plain(project.description),
            details: DETAILS[slug] || null,
        };
    });

const missingDetails = projects.filter((project) => !project.details).map((project) => project.slug);

const CATEGORY_LABEL = {
    ai: 'AI systems',
    web: 'Backend and web',
    telegram: 'Bots',
    data: 'Data',
};

// ------------------------------------------------------------ card fragment

function cardHtml(project, { animated = true } = {}) {
    const rank = String(project.rank).padStart(2, '0');
    const live = (project.links || []).find((link) => link.text === 'Live');

    const image = `<img src="${esc(project.image)}" alt="${esc(project.alt)}" loading="lazy" decoding="async">`;
    const imageBlock = live
        ? `<a class="project-image-link" href="${esc(live.href)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(project.title)}: open the live site">${image}<span class="project-image-badge">Live</span></a>`
        : image;

    // The hub has no script.js to reveal anything, so its cards must not carry
    // the fade-in class: opacity 0 with nothing to undo it is a blank page.
    const classes = ['project-card', animated ? 'fade-in' : '', animated ? project.delayClass : '', project.featured ? 'is-featured' : '']
        .filter(Boolean).join(' ');

    const flag = project.featured
        ? `\n                                <span class="project-flag">Flagship</span>`
        : '';

    const tags = project.tags
        .map((tag) => `<span class="project-tag">${esc(tag)}</span>`)
        .join('\n                                ');

    const links = project.links
        .map((link) => `<a href="${esc(link.href)}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="${esc(link.icon)}"></i> ${esc(link.text)}</a>`)
        .join('\n                                ');

    const canonical = project.isStatic ? '' : `\n                            <a class="project-link" href="/projects/${project.slug}.html">Details</a>`;

    return `                    <article class="${classes}" data-category="${esc(project.category)}" data-rank="${project.rank}" style="order: ${project.rank};" itemscope itemtype="https://schema.org/SoftwareSourceCode">
                        <div class="project-image">${imageBlock}</div>
                        <div class="project-content">
                            <div class="project-meta">
                                <span class="project-rank">${rank}</span>${flag}
                            </div>
                            <h3 itemprop="name">${esc(project.title)}</h3>
                            <p class="project-desc" itemprop="description">${project.description}</p>
                            <button type="button" class="desc-toggle" aria-expanded="false" hidden>Read more</button>
                            <div class="project-tags">
                                ${tags}
                            </div>
                            <div class="project-links">
                                ${links}${canonical}
                            </div>
                        </div>
                    </article>`;
}

// ------------------------------------------------------------------ JSON-LD

function projectSchema(project) {
    const schema = {
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.plainDescription,
        url: `${SITE}/projects/${project.slug}.html`,
        keywords: project.tags.join(', '),
        author: { '@id': `${SITE}/#person` },
        image: project.image.startsWith('http') ? project.image : `${SITE}/${project.image}`,
    };
    const repo = (project.links || []).find((link) => link.icon.includes('github'));
    if (repo) schema.codeRepository = repo.href;
    const live = (project.links || []).find((link) => link.text === 'Live');
    if (live) schema.sameAs = [live.href];
    const download = (project.links || []).find((link) => /^(apk|download|install)$/i.test(link.text.trim()));
    if (download) schema.installUrl = download.href;
    return schema;
}

function itemListSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Projects by Kosisochukwu Okafor',
        description: 'Every project in the portfolio, ordered by engineering weight.',
        numberOfItems: projects.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: projects.map((project) => ({
            '@type': 'ListItem',
            position: project.position,
            name: project.title,
            url: `${SITE}/projects/${project.slug}.html`,
            item: projectSchema(project),
        })),
    };
}

// --------------------------------------------------------- page scaffolding

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">`;

const HEADER = `<header>
        <div class="header-pill">
            <a href="/" class="logo">
                <span class="logo-icon">KS</span>
                <span class="logo-name">kosisochukwu<span>.okafor</span></span>
            </a>
            <div class="nav-links">
                <a href="/#projects">Work</a>
                <a href="/projects.html">Index</a>
                <a href="/#contact">Contact</a>
            </div>
        </div>
    </header>`;

const FOOTER = `<footer>
        <div class="container">
            <div class="social-links">
                <a href="https://github.com/Ksschkw" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="mailto:kookafor893@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
                <a href="https://linkedin.com/in/okafor-kosisochukwu-65a256384" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="https://x.com/_Kosisochuk" target="_blank" rel="noopener" aria-label="X"><i class="fab fa-twitter"></i></a>
            </div>
            <p class="copyright">Kosisochukwu Okafor, ${new Date().getFullYear()}.</p>
        </div>
    </footer>`;

const pageShell = ({ title, description, canonical, body, jsonLd, robots = 'index, follow, max-image-preview:large' }) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#08090a">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="${robots}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE}/imagesnshii/og-card.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${SITE}/imagesnshii/og-card.jpg">
    ${FONTS}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/styles.css?v=10">
    <link rel="icon" type="image/png" href="/icons/icon-192.png">
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>
</head>

<body>
    ${HEADER}
    <main>
${body}
    </main>
    ${FOOTER}
</body>

</html>
`;

// ----------------------------------------------------------- project pages

// Screens are laid out from their real dimensions: wide captures tile at their
// own aspect ratio, phone captures line up at a shared height so a portrait
// screenshot is never stretched into a landscape box.
function screensSection(project) {
    const screens = (project.details && project.details.screens) || [];

    if (!screens.length) {
        const src = project.image.startsWith('http') ? project.image : '/' + project.image;
        return `        <section>
            <div class="container">
                <h2 class="section-title"><span class="section-index">03</span>Screens</h2>
                <div class="project-image detail-figure"><img src="${esc(src)}" alt="${esc(project.alt)}" loading="lazy" decoding="async"></div>
            </div>
        </section>`;
    }

    const measured = screens.map((screen) => {
        const { width, height } = pngSize(path.join(ROOT, screen.src));
        return { ...screen, width, height, wide: width / height >= 1.2 };
    });

    const figure = (screen) => `                    <figure class="screen">
                        <img src="/${esc(screen.src)}" alt="${esc(screen.alt)}" width="${screen.width}" height="${screen.height}" loading="lazy" decoding="async" style="aspect-ratio:${screen.width}/${screen.height}">
                        <figcaption>${esc(screen.caption || '')}</figcaption>
                    </figure>`;

    const wide = measured.filter((screen) => screen.wide);
    const tall = measured.filter((screen) => !screen.wide);

    return `        <section>
            <div class="container">
                <h2 class="section-title"><span class="section-index">03</span>Screens</h2>
${wide.length ? `                <div class="screens-wide">
${wide.map(figure).join('\n')}
                </div>
` : ''}${tall.length ? `                <div class="screens-tall">
${tall.map(figure).join('\n')}
                </div>` : ''}
            </div>
        </section>`;
}

function projectPage(project, prev, next) {
    const details = project.details || { overview: [project.plainDescription], highlights: [] };

    const overview = `        <section>
            <div class="container">
                <h2 class="section-title"><span class="section-index">01</span>Overview</h2>
                <div class="prose">
${details.overview.map((para) => `                    <p>${esc(para)}</p>`).join('\n')}
                </div>
            </div>
        </section>`;

    const highlights = details.highlights && details.highlights.length
        ? `
        <section>
            <div class="container">
                <h2 class="section-title"><span class="section-index">02</span>How it is built</h2>
                <ul class="detail-list">
${details.highlights.map((item) => `                    <li>${esc(item)}</li>`).join('\n')}
                </ul>
            </div>
        </section>`
        : '';

    // The destination, given the weight it deserves: a live product is the
    // single most useful thing a visitor can click here, and a downloadable
    // build sits beside it as the second.
    const links = project.links || [];
    const isDownload = (link) => /^(apk|download|install)$/i.test(link.text.trim());
    const live = links.find((link) => link.text === 'Live');
    const download = links.find(isDownload);

    const ctaRow = live || download
        ? `
                <div class="cta-row">${live ? `
                    <a class="live-link" href="${esc(live.href)}" target="_blank" rel="noopener noreferrer">
                        <span class="live-link-pill">Live</span>
                        <span class="live-link-url">${esc(prettyUrl(live.href))}</span>
                        <span class="live-link-go">Visit site &#8599;</span>
                    </a>` : ''}${download ? `
                    <a class="download-link" href="${esc(download.href)}" target="_blank" rel="noopener noreferrer" download>
                        <i class="${esc(download.icon)}" aria-hidden="true"></i>
                        <span class="download-link-text">
                            <span class="download-link-label">${esc(download.text)}</span>
                            <span class="download-link-file">${esc(download.detail || prettyUrl(download.href).split('/').pop())}</span>
                        </span>
                    </a>` : ''}
                </div>`
        : '';

    const body = `        <section class="hero">
            <div class="container">
                <p class="eyebrow">Project ${String(project.position).padStart(2, '0')} of ${projects.length} &middot; ${esc(CATEGORY_LABEL[project.category] || project.category)}${project.featured ? ' &middot; Flagship' : ''}</p>
                <h1>${esc(project.title)}</h1>
                <p class="hero-statement">${esc(project.plainDescription)}</p>${ctaRow}
                <div class="project-tags">
                    ${project.tags.map((tag) => `<span class="project-tag">${esc(tag)}</span>`).join('\n                    ')}
                </div>
                <div class="project-links">
${links.filter((link) => link !== live && link !== download).map((link) => `                    <a href="${esc(link.href)}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="${esc(link.icon)}"></i> ${esc(link.text)}</a>`).join('\n')}
                </div>
            </div>
        </section>

${overview}
${highlights}

${screensSection(project)}

        <section>
            <div class="container">
                <h2 class="section-title"><span class="section-index">&#8592;&#8594;</span>Keep reading</h2>
                <div class="project-links">
                    <a class="project-link" href="/projects/${prev.slug}.html">Previous: ${esc(prev.title)}</a>
                    <a class="project-link" href="/projects/${next.slug}.html">Next: ${esc(next.title)}</a>
                    <a class="project-link" href="/projects.html">All ${projects.length} projects</a>
                    <a class="project-link" href="/">Kosisochukwu Okafor</a>
                </div>
            </div>
        </section>`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            projectSchema(project),
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
                    { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE}/projects.html` },
                    { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE}/projects/${project.slug}.html` },
                ],
            },
        ],
    };

    // Prefer the long-form opening for the meta description: it says more than
    // the card blurb and is unique to this page.
    const metaDescription = (details.overview[0] || project.plainDescription).slice(0, 300);

    return pageShell({
        title: `${project.title} | Kosisochukwu Okafor, Software Engineer`,
        description: metaDescription,
        canonical: `${SITE}/projects/${project.slug}.html`,
        body,
        jsonLd,
    });
}

// ------------------------------------------------------------------ the hub

function hubPage() {
    const body = `        <section class="hero">
            <div class="container">
                <p class="eyebrow">Project index</p>
                <h1>Everything I have built</h1>
                <p class="hero-statement">${projects.length} projects, ranked by engineering weight. The same list drives the
                    portfolio page, and every entry below has its own page.</p>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="projects-grid">
${projects.map((project) => cardHtml(project, { animated: false })).join('\n')}
                </div>
            </div>
        </section>`;

    return pageShell({
        title: `All ${projects.length} projects | Kosisochukwu Okafor, Software Engineer`,
        description: `The complete project index of Kosisochukwu Okafor, a software engineer in Lagos, Nigeria: ${projects.slice(0, 6).map((p) => p.title).join(', ')} and ${projects.length - 6} more.`,
        canonical: `${SITE}/projects.html`,
        body,
        jsonLd: itemListSchema(),
    });
}

// ------------------------------------------------------ index.html injection

function injectIndex() {
    const file = path.join(ROOT, 'index.html');
    const html = fs.readFileSync(file, 'utf8');

    const CARDS = /(<!-- SEO:CARDS:BEGIN -->)[\s\S]*?(<!-- SEO:CARDS:END -->)/;
    const ITEMLIST = /(<!-- SEO:ITEMLIST:BEGIN -->)[\s\S]*?(<!-- SEO:ITEMLIST:END -->)/;
    if (!CARDS.test(html) || !ITEMLIST.test(html)) {
        throw new Error('index.html is missing its SEO:CARDS or SEO:ITEMLIST markers');
    }

    const cards = projects
        .filter((project) => !project.isStatic)
        .map(cardHtml)
        .join('\n');

    const jsonLd = `    <script type="application/ld+json">\n${JSON.stringify(itemListSchema(), null, 2)}\n    </script>`;

    const next = html
        .replace(CARDS, `$1\n${cards}\n                    $2`)
        .replace(ITEMLIST, `$1\n${jsonLd}\n    $2`);

    fs.writeFileSync(file, next, 'utf8');
    return { cards: projects.filter((p) => !p.isStatic).length };
}

// ------------------------------------------------------------------ sitemap

function sitemap() {
    const urls = [
        { loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' },
        { loc: `${SITE}/projects.html`, priority: '0.9', changefreq: 'weekly' },
        ...projects.map((project) => ({
            loc: `${SITE}/projects/${project.slug}.html`,
            priority: project.featured ? '0.8' : '0.6',
            changefreq: 'monthly',
        })),
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

// ------------------------------------------------------------------ llms.txt

function llmsTxt() {
    const lines = [];
    lines.push('# Kosisochukwu Okafor');
    lines.push('');
    lines.push('> Software engineer based in Lagos, Nigeria. Builds backend services, cloud');
    lines.push('> infrastructure and applied AI systems. Holds the AWS Certified Generative AI');
    lines.push('> Developer - Professional credential.');
    lines.push('');
    lines.push('Open to roles and contract work, remote across Nigeria (Lagos, Owerri, Anambra,');
    lines.push('Abuja) and worldwide. English and Igbo.');
    lines.push('');
    lines.push(`Contact: kookafor893@gmail.com`);
    lines.push(`Portfolio: ${SITE}/`);
    lines.push(`Project index: ${SITE}/projects.html`);
    lines.push(`Machine-readable projects: ${SITE}/projects.json`);
    lines.push('');
    lines.push('## Profiles');
    lines.push('');
    lines.push('- [GitHub](https://github.com/Ksschkw): source for the projects below');
    lines.push('- [LinkedIn](https://linkedin.com/in/okafor-kosisochukwu-65a256384)');
    lines.push('- [Credly](https://www.credly.com/users/kosisochukwu-okafor.4ba3b5f3): verified credentials');
    lines.push('');
    lines.push('## Capabilities');
    lines.push('');
    lines.push('- Systems and correctness: service and API design, data modelling, concurrency, failure behaviour, transactional integrity, testing strategy');
    lines.push('- Delivery and operations: scoping, code review, observability, cost and performance tradeoffs, release and rollback');
    lines.push('- Applied AI: retrieval over private corpora, agent tooling with hard guardrails, evaluation, hybrid vector and keyword retrieval, reinforcement learning');
    lines.push('- Platforms and data: cloud architecture, containerised deployments, release automation, relational and geospatial modelling, distributed batch processing');
    lines.push('- Security and tenancy: deny-by-default authorization, tenant isolation and row-level security, append-only audit trails, secret handling');
    lines.push('');
    lines.push('## Projects');
    lines.push('');
    for (const project of projects) {
        lines.push(`- [${project.title}](${SITE}/projects/${project.slug}.html): ${project.plainDescription}`);
    }
    lines.push('');
    return lines.join('\n');
}

// --------------------------------------------------------------------- main

const written = [];
written.push(write(path.join(ROOT, 'projects.html'), hubPage()));
fs.mkdirSync(OUT_DIR, { recursive: true });

// Drop pages for slugs that no longer exist, so renaming a project does not
// leave a stale page and a dead entry in the sitemap.
const keep = new Set(projects.map((project) => `${project.slug}.html`));
const removed = fs.readdirSync(OUT_DIR)
    .filter((file) => file.endsWith('.html') && !keep.has(file))
    .filter((file) => { fs.unlinkSync(path.join(OUT_DIR, file)); return true; });

for (const [index, project] of projects.entries()) {
    const prev = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    written.push(write(path.join(OUT_DIR, `${project.slug}.html`), projectPage(project, prev, next)));
}

written.push(write(path.join(ROOT, 'projects.json'), JSON.stringify({
    generated: TODAY,
    site: SITE,
    owner: {
        name: 'Kosisochukwu Okafor',
        role: 'Software Engineer',
        location: 'Lagos, Nigeria',
        areaServed: ['Lagos', 'Owerri', 'Anambra', 'Abuja', 'Nigeria'],
        email: 'kookafor893@gmail.com',
        url: `${SITE}/`,
        profiles: [
            'https://github.com/Ksschkw',
            'https://linkedin.com/in/okafor-kosisochukwu-65a256384',
            'https://www.credly.com/users/kosisochukwu-okafor.4ba3b5f3',
        ],
        credentials: [
            'AWS Certified Generative AI Developer - Professional',
            'AWS Certified Cloud Practitioner',
            'AWS Partner: Technical Accredited',
        ],
    },
    count: projects.length,
    projects: projects.map((project) => ({
        rank: project.rank,
        title: project.title,
        slug: project.slug,
        url: `${SITE}/projects/${project.slug}.html`,
        category: project.category,
        featured: Boolean(project.featured),
        description: project.plainDescription,
        tags: project.tags,
        links: project.links.map((link) => ({ label: link.text, url: link.href })),
        live: (project.links.find((link) => link.text === 'Live') || {}).href || null,
        download: (project.links.find((link) => /^(apk|download|install)$/i.test(link.text.trim())) || {}).href || null,
        image: project.image.startsWith('http') ? project.image : `${SITE}/${project.image}`,
        screens: ((project.details && project.details.screens) || []).map((screen) => ({
            url: `${SITE}/${screen.src}`,
            caption: screen.caption || null,
        })),
    })),
}, null, 2) + '\n'));

written.push(write(path.join(ROOT, 'llms.txt'), llmsTxt()));
written.push(write(path.join(ROOT, 'sitemap.xml'), sitemap()));

const injection = injectIndex();
console.log(`projects: ${projects.length} (${injection.cards} cards injected into index.html)`);
console.log(`files: ${written.length + 1} written`);
console.log(`  index.html (cards + ItemList)`);
for (const file of written) console.log(`  ${file}`);
if (removed.length) console.log(`removed stale pages: ${removed.join(', ')}`);
if (missingDetails.length) {
    console.log(`WARNING: no long-form details for: ${missingDetails.join(', ')}`);
} else {
    console.log(`long-form details: all ${projects.length} projects`);
}

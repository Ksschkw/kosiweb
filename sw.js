// Cache name is only a namespace for the offline fallback and for purging old
// caches. Freshness does NOT depend on bumping it: every request is
// network-first, so a deploy is picked up on the next visit. Bumping it is
// still worth doing when the pre-cache list itself changes.
const CACHE_NAME = 'kss-portfolio-v13';

const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/imagesnshii/kosii.jpeg',
  '/imagesnshii/og-card.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap',
];

self.addEventListener('install', (event) => {
  // Take over as soon as this worker is installed instead of waiting for every
  // open tab to close.
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      // allSettled, not addAll: one unreachable CDN must not fail the install
      // and leave the visitor with no worker at all.
      .then((cache) => Promise.allSettled(PRECACHE.map((url) => cache.add(url))))
      .catch(() => { })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    // Start controlling pages that are already open.
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  event.respondWith((async () => {
    try {
      // Network first. The cache is an offline fallback, never the source of
      // truth, which is what stops visitors seeing a stale build.
      const response = await fetch(request);

      if (response && response.ok && new URL(request.url).origin === self.location.origin) {
        const copy = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(request, copy))
          .catch(() => { });
      }

      return response;
    } catch (error) {
      const cached = await caches.match(request);
      if (cached) return cached;

      // A navigation that cannot reach the network still gets the app shell.
      if (request.mode === 'navigate') {
        const shell = await caches.match('/index.html');
        if (shell) return shell;
      }

      throw error;
    }
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

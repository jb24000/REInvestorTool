const CACHE = 'rei-deal-machine-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Network-first for navigations, cache-first for same-origin assets.
// Critically: ignore non-http(s) like chrome-extension:// to avoid errors.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET over http/https
  if (req.method !== 'GET') return;
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Don’t attempt to cache cross-origin extensions, etc.
  if (url.protocol === 'chrome-extension:' || url.origin.startsWith('chrome-extension://')) return;

  // For navigations, network-first
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((r) => {
        const copy = r.clone();
        caches.open(CACHE).then((c) => c.put(url.pathname || '/', copy));
        return r;
      }).catch(() => caches.match(url.pathname || '/') || caches.match('/index.html'))
    );
    return;
  }

  // For same-origin assets, cache-first
  const sameOrigin = url.origin === self.location.origin;
  if (sameOrigin) {
    event.respondWith(
      caches.match(req).then((hit) => {
        if (hit) return hit;
        return fetch(req).then((r) => {
          const copy = r.clone();
          // Only cache successful, basic responses
          if (r.ok && r.type === 'basic') {
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return r;
        });
      })
    );
  }
});

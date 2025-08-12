// public/sw.js
const CACHE = 'rei-deal-machine-v2'; // bump version to update clients

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin, http(s), GET requests within this scope
  if (req.method !== 'GET') return;
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(self.registration.scope.replace(self.location.origin, '') || '/')) return;

  // Network-first for navigations
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((r) => {
          const copy = r.clone();
          return caches.open(CACHE).then((c) =>
            // cache the app shell path only; ignore failures
            c.put(self.registration.scope, copy).catch(() => r)
          ).then(() => r);
        })
        .catch(() => caches.match(self.registration.scope) || caches.match('/index.html'))
    );
    return;
  }

  // Cache-first for same-origin assets
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((r) => {
        const copy = r.clone();
        // Only cache successful basic responses; ignore any errors
        if (r.ok && r.type === 'basic') {
          caches.open(CACHE).then((c) => c.put(req, copy).catch(() => {}));
        }
        return r;
      });
    })
  );
});

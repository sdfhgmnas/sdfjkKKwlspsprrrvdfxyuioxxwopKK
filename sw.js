// TASR BharatNext Fuel Manager — Service Worker
// Strategy:
//   - HTML: network-first, fallback to cache (so app updates work)
//   - Static assets (icons, manifest, CDN libs): cache-first
//   - Supabase API calls: always network (never cache dynamic data)
 
const CACHE_VERSION = 'tasr-fuel-v2.9';
const STATIC_CACHE  = CACHE_VERSION + '-static';
const RUNTIME_CACHE = CACHE_VERSION + '-runtime';
 
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './favicon.png',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
];
 
// INSTALL — pre-cache shell
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache =>
      // Pre-cache best-effort: if any one fails, don't break the install
      Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url).catch(()=>null)))
    )
  );
});
 
// ACTIVATE — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => !n.startsWith(CACHE_VERSION)).map(n => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});
 
// FETCH strategy
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
 
  const url = new URL(req.url);
 
  // Skip Supabase API calls — always go to network
  if (url.hostname.endsWith('.supabase.co')) return;
 
  // HTML / navigation requests: network-first
  const isHtml = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').includes('text/html');
  if (isHtml) {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(RUNTIME_CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(m => m || caches.match('./index.html')))
    );
    return;
  }
 
  // Other GETs: cache-first, fall back to network and cache the result
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
 
// Allow page to trigger immediate update
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
 

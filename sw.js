// TASR BharatNext Fuel Manager — Service Worker v5.4
// Minimal, foolproof: NO pre-cache (which was breaking fresh installs).
// Caches resources only as they're fetched. HTML always network-first.
 
const CACHE_VERSION = 'tasr-fuel-v5.4';
const CACHE_NAME = CACHE_VERSION + '-runtime';
 
// INSTALL — don't pre-fetch anything. Pre-caching was causing fresh installs
// to fail silently when even one URL 404'd or timed out on slow networks.
self.addEventListener('install', event => {
  console.log('[TASR-SW] Installing', CACHE_VERSION);
  self.skipWaiting();
});
 
// ACTIVATE — clear all old version caches, take over all open pages
self.addEventListener('activate', event => {
  console.log('[TASR-SW] Activating', CACHE_VERSION);
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names
          .filter(n => !n.startsWith(CACHE_VERSION))
          .map(n => { console.log('[TASR-SW] Deleting old cache', n); return caches.delete(n); })
      ))
      .then(() => self.clients.claim())
  );
});
 
// FETCH — never intercept Supabase calls; HTML = network-first; else = cache-first
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
 
  let url;
  try { url = new URL(req.url); } catch (e) { return; }
 
  // Never cache Supabase API — must always be live
  if (url.hostname.endsWith('.supabase.co')) return;
  // Skip chrome-extension and other non-http(s) protocols
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
 
  const isHtml = req.mode === 'navigate'
    || (req.headers.get('accept') || '').includes('text/html');
 
  if (isHtml) {
    // Network-first for HTML so updates always reach users.
    // Falls back to cache only if network fails (offline).
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(req).then(m => m || caches.match('./') || caches.match('./index.html')))
    );
    return;
  }
 
  // Other resources (JS, CSS, icons, fonts, CDN libs): cache-first
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req)
        .then(res => {
          if (res && res.ok && (res.type === 'basic' || res.type === 'cors')) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
 
// Allow page to force-skip-waiting via postMessage
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
 

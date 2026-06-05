// SM Seguros KPIs - Service Worker
const CACHE = 'sm-kpis-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Solo cachear el shell - los datos siempre desde red
self.addEventListener('fetch', e => {
  if(e.request.url.includes('supabase.co')) return; // Nunca cachear Supabase
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

const cacheName = "DefaultCompany-Test-Tranport-Mathcmaking-0.1.0";
const contentToCache = [
    "Build/4cb301595557292ac1ad7acde655c99b.loader.js",
    "Build/d9161dab8da1f4dfeb113ff4f1ca491b.framework.js",
    "Build/3322575b575c451b721e12f941ca6ef1.data",
    "Build/ce2d62e6c89be450f1185024ee713840.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});

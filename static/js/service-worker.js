const CORE = 'core-cache';
const CORE_FILES = [
    '/css/style.css',
    '/js/app.js',
    '/js/modules/serviceWorker.js',
    '/js/modules/enhanchedDetail.js'
]

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CORE).then(function(cache) {
            return cache.addAll(CORE_FILES);
        })
    )
    console.log("[serviceWorker] Installed");
})

self.addEventListener('activate', function(event) {
    console.log("[serviceWorker] Activated");
})

self.addEventListener('fetch', function(event) {
    console.log("[serviceWorker] Fetching", e.request.url);
})

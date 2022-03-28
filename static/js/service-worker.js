const CORE = 'core-cache';
const CORE_FILES = [
    '/css/style.css',
    '/js/app.js',
    '/js/modules/serviceWorker.js',
    '/js/modules/enhanchedDetail.js',
    '/font/Rijksmuseum-Normal.woff',
    '/font/Rijksmuseum-Bold.woff',
    '/'
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
    console.log('hoi')
    event.respondWith(
      caches.open(CORE).then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });
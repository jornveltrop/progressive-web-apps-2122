const CACHE_VERSION = 22;

const CORE = 'core-cache';
const CORE_FILES = [
    '/css/style.css',
    '/js/app.js',
    '/js/modules/bookmarks.js',
    '/js/modules/enhanchedDetail.js',
    '/font/Rijksmuseum-Normal.woff',
    '/font/Rijksmuseum-Bold.woff',
    '/images/rijks-library-logo.svg',
    '/images/bookmark_active.svg',
    '/images/bookmark.svg',
    '/images/empty_frame.png',
    '/offline'
]

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CORE).then(function(cache) {
            self.skipWaiting();
            return cache.addAll(CORE_FILES);
        })
    )
    console.log("[serviceWorker] Installed");
})

self.addEventListener('activate', function(event) {
    console.log("[serviceWorker] Activated");
})

self.addEventListener('fetch', function(event) {
    // console.log("[serviceWorker] Fetching", event.request.url);

    if (isCoreGetRequest(event.request)) {
        // console.log('Core get request: ', event.request.url);
        // cache only strategy
        event.respondWith(
          caches.open(CORE)
            .then(cache => cache.match(event.request.url))
        )
    } else if (isHtmlGetRequest(event.request)) {
        // console.log('html get request', event.request.url)
        // generic fallback
        event.respondWith(
        caches.open('html-cache')
            .then(cache => cache.match(event.request.url))
            .then(response => {
                if (response) {
                    event.waitUntil(
                        fetchAndCache(event.request.url, 'html-cache')
                    )
                    return response
                } else {
                    return fetchAndCache(event.request.url, 'html-cache')
                }
            })
            .catch(e => {
            return caches.open(CORE)
                .then(cache => cache.match('/offline'))
            })
        )
    } else if (isOtherGetRequest(event.request)) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    return response;
                })
                .catch(e => {
                    return caches.open(CORE)
                        .then(cache => cache.match('/offline'))
                })
        )

    }
});


// -------- HELPERS
function fetchAndCache(request, cacheName) {
    return fetch(request)
      .then(response => {
        if (!response.ok) {
          throw new TypeError('Bad response status');
        }
  
        const clone = response.clone()
        caches.open(cacheName).then((cache) => cache.put(request, clone))
        return response
      })
  }

function isHtmlGetRequest(request) {
    // console.log(getPathName(request.url));
    let paths = getPathName(request.url);
    return request.method === 'GET' && (request.headers.get('accept') !== null && request.headers.get('accept').includes('text/html')) && !(paths.includes('search'));
}

function isCoreGetRequest(request) {
    return request.method === 'GET' && CORE_FILES.includes(getPathName(request.url));
}

function isOtherGetRequest(request) {
    return request.method === 'GET' && (request.headers.get('accept') !== null && request.headers.get('accept').includes('text/html'));
}

function getPathName(requestUrl) {
    const url = new URL(requestUrl);
    return url.pathname;
}

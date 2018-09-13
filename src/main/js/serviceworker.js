import backgrounds from './backgrounds'

import createPushMessage from './createPushMessage'

const CACHE_NAME = 'memba-cache-20180908';
const urlsToCache = [
/*    '/', */
    '/fontawesome/webfonts/fa-solid-900.woff2',
    '/fontawesome/webfonts/fa-regular-400.woff2',
    '/fontawesome/webfonts/fa-brands-400.woff2',
    '/memba48x44.png',
    '/memba320x249.png',
    '/bootstrap-slate-4.1.3.min.css',
    '/fontawesome/css/all.css',
    '/jquery-3.3.1.min.js',
    '/popper-1.14.3.min.js',
    '/bootstrap-4.1.3.min.js',
    '/hammer.min.js',
    '/jquery.hammer.js',
    '/manifest.json',
];

backgrounds
    .filter(b => b.value !== "none")
    .forEach(b => urlsToCache.push("/backgrounds/" + b.value));


self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(c => c.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});

self.addEventListener('push', function (e) {
    const message = createPushMessage(e.data.json());
    e.waitUntil(
        self.registration.showNotification(message.title, message.options)
    );
});

self.skipWaiting();
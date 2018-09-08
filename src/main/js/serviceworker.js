import backgrounds from './backgrounds'

const CACHE_NAME = 'memba-cache-20180907';
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
    const options = {
        body: 'Memba Chewbacca?',
        icon: 'memba192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'explore', title: 'Action one',
                icon: 'images/checkmark.png'
            },
            {
                action: 'close', title: 'Action two',
                icon: 'images/xmark.png'
            },
        ]
    };
    e.waitUntil(
        self.registration.showNotification('Memba?', options)
    );
});
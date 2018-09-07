var CACHE_NAME = 'memba-cache';
var urlsToCache = [
    '/',
    '/fontawesome/webfonts/fa-solid-900.woff2',
    '/fontawesome/webfonts/fa-regular-400.woff2',
    '/bootstrap-slate-4.1.3.min.css',
    '/fontawesome/css/all.css',
    '/jquery-3.3.1.min.js',
    '/popper-1.14.3.min.js',
    '/bootstrap-4.1.3.min.js',
    '/hammer.min.js',
    '/jquery.hammer.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('push', function(e) {
  var options = {
    body: 'Memba Chewbacca?',
    icon: 'memba192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Memba?', options)
  );
});
var CACHE_NAME = 'static-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/login.html',
                '/inicio.html',
                '/segundo.html',
                '/css/style.css',
                '/images/Bike.png',
                '/images/Bus.png',
                '/images/Car.png',
                '/images/IconEcoe.png',
                '/images/logoEcoe.png',
                '/images/logoEcoeB.png',
                '/images/pin.png',
                '/images/ShareCar.png',
                '/images/termo.png',
                '/images/bg.jpg',
                '/manifest.json',
            ]);
        })
    )
});

self.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});
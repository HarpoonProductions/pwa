const CACHE_NAME = "site-static-v1";
const urlsToCache = [
  "/pwa/",
  "/pwa/index.html",
  "/pwa/lead-feature/index.html",
  "/pwa/second-feature/index.html",
  "/pwa/essay/index.html",
  "/pwa/water-droplet/index.html",
  "/pwa/article/index.html", // If this is duplicated, ensure to add only unique paths
  "/pwa/column/index.html",
  "/pwa/end/index.html",
  // Add other assets you want to cache, such as CSS, JavaScript, and images
];

// Install event - cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Fetch event to serve assets from cache
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

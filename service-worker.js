self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activating...");
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

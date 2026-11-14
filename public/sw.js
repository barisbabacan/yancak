// Basit service worker: ana ekrana eklenebilirlik + çevrimdışı yedek.
// Gerçek sürümde buraya "yeni duyuru" push bildirimleri eklenecek.
const CACHE = "yanicak-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["/", "/logo.webp", "/icon-192.png"])));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.mode !== "navigate") return;
  e.respondWith(fetch(e.request).catch(() => caches.match("/")));
});

self.addEventListener("push", (e) => {
  const data = e.data ? e.data.json() : { title: "Yanıcak Köyü", body: "Yeni duyuru var" };
  e.waitUntil(self.registration.showNotification(data.title, { body: data.body, icon: "/icon-192.png" }));
});

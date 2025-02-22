import { isElectron } from "utils";

export function registerServiceWorker() {
  if (isElectron()) return;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker registered!"))
      .catch((error) => console.error("Service Worker registration failed:", error));
  }
}

export function unregisterServiceWorker() {
  if (isElectron()) return;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister().then(() => console.log("Service Worker unregistered!"));
      });
    });

    // Delete cached files
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(cacheNames.map((cache) => caches.delete(cache)));
      })
      .then(() => {
        console.log("All caches deleted!");
      });
  }
}

export function withServiceWorker(include: boolean) {
  if (include) {
    registerServiceWorker();
  } else {
    unregisterServiceWorker();
  }
}

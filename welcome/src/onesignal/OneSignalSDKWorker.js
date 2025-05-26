importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');

self.addEventListener('message', function (event) {
  console.log('[Custom SW] Message received:', event.data);
});

self.addEventListener('notificationclose', function (event) {
  console.log('[Custom SW] Notification closed:', event.notification);
});
self.addEventListener('push', function(event) {
  console.log('[Custom SW] Raw push event:', event);

  if (event.data) {
    const payload = event.data.json();
    console.log('[Custom SW] Notification payload:', payload);
  } else {
    console.log('[Custom SW] Push event has no data.');
  }
});

self.addEventListener("push", function(event) {
  if (event.data) {
    const payload = event.data.json();
    const title = payload.title || "Default title";
    const options = {
      body: payload.body || "Default body",
      icon: payload.icon || "https://via.placeholder.com/128",
      data: payload.data || {},
    };
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});

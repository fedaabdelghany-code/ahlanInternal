(window as any).OneSignal = (window as any).OneSignal || [];
(window as any).OneSignal.push(() => {
  (window as any).OneSignal.SERVICE_WORKER_PATH = 'OneSignalSDKWorker.js';
  (window as any).OneSignal.SERVICE_WORKER_UPDATER_PATH = 'OneSignalSDKUpdaterWorker.js';

  (window as any).OneSignal.init({
    appId: 'YOUR-ONESIGNAL-APP-ID',
    allowLocalhostAsSecureOrigin: true,
    notifyButton: {
      enable: true,
    },
  });
});



import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { register } from 'swiper/element/bundle';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

// ✅ Register Angular's PWA service worker
if (environment.production && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('ngsw-worker.js')
    .then(registration => {
      console.log('Angular Service Worker registered:', registration.scope);
    })
    .catch(error => {
      console.error('Error registering Angular Service Worker:', error);
    });
}

register();

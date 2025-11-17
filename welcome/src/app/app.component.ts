import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MenuController, PopoverController } from '@ionic/angular';
import { ContactPopoverComponent } from './contact-popover/contact-popover.component';
import { SwUpdate } from '@angular/service-worker';

declare global {
  interface Window {
    OneSignal: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  showIntro = false;
  deferredPrompt: any;
  showInstallButton = false;
  isIos = false;
  isStandalone = false;
  showPrompt = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private popoverCtrl: PopoverController,
    private swUpdate: SwUpdate,
      private menuCtrl: MenuController,

  ) {}

  ngOnInit(): void {

    this.initApp();
    this.checkInstallSupport();
    this.handleBeforeInstallPrompt();
    this.checkForAppUpdates();
    // this.initializeOneSignal(); // ✅ Initialize OneSignal here
    console.log('[PWA] Running in standalone?', this.isRunningStandalone);
    
  }

  checkForAppUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          console.log('[PWA] New version available. Reloading...');
          this.swUpdate.activateUpdate().then(() => document.location.reload());
        }
      });
    }
  }

  checkInstallSupport() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    this.isIos = /iphone|ipad|ipod/.test(userAgent);
    this.isStandalone =
      ('standalone' in window.navigator && (window.navigator as any).standalone) ||
      window.matchMedia('(display-mode: standalone)').matches;

    const dismissedIosBanner = localStorage.getItem('dismissedIosBanner') === 'true';

    if (this.isIos && !this.isStandalone && !dismissedIosBanner) {
      this.showInstallButton = true;
    } else if (!this.isIos && !this.isStandalone) {
      this.showInstallButton = true; // For Android
    }
  }

  dismissIosBanner() {
    this.showInstallButton = false;
    localStorage.setItem('dismissedIosBanner', 'true');
  }

  handleBeforeInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.deferredPrompt = event;

      if (!this.isIos && !this.isStandalone) {
        this.showInstallButton = true;
        console.log('PWA install prompt available');
      }
    });
  }

  installPwa() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
  }

  get isRunningStandalone(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && (window.navigator as any).standalone)
    );
  }

  async initApp() {
    this.router.navigateByUrl('/splash-screen');
    await this.delay(2000);

    // First, check if we're returning from a redirect
    try {
      const result = await this.afAuth.getRedirectResult();
      if (result.user) {
        // User just signed in via redirect, navigate to tabs
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
        return; // Exit early, don't set up the authState subscription yet
      }
    } catch (error) {
      console.error('Error getting redirect result:', error);
    }

    // Now subscribe to auth state changes
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async showContactInfo(ev?: Event) {
    const popover = await this.popoverCtrl.create({
      component: ContactPopoverComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true,
      cssClass: 'contact-popover',
    });
    await popover.present();
  }
async navigateTo(path: string) {
  await this.menuCtrl.close(); // Closes the menu
  this.router.navigateByUrl(path); // Navigates to the route
}

//   // ✅ OneSignal Setup
// initializeOneSignal() {
//   window.OneSignal = window.OneSignal || [];
//   window.OneSignal.push(() => {
//     window.OneSignal.SERVICE_WORKER_PATH = 'OneSignalSDKWorker.js';
//     window.OneSignal.SERVICE_WORKER_UPDATER_PATH = 'OneSignalSDKUpdaterWorker.js';

//     window.OneSignal.init({
//       appId: 'YOUR-ONESIGNAL-APP-ID',
//       allowLocalhostAsSecureOrigin: true,
//       notifyButton: {
//         enable: true,
//       },
//     });
//   });
// }
}

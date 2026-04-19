import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    // Redirect result handling is centralized in app.component.ts.
  }

  async signInWithGoogle() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      cssClass: 'custom-loading',
      showBackdrop: false,
      translucent: true,
    });

    await loading.present();

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    let redirectStarted = false;

    try {
      // Force persistent login across app reloads/redirects.
      await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      try {
        const result = await this.afAuth.signInWithPopup(provider);
        if (result.user) {
          await this.router.navigateByUrl('/tabs', { replaceUrl: true });
        }
        return;
      } catch (popupError: any) {
        const code = popupError?.code;
        const canFallbackToRedirect =
          code === 'auth/popup-blocked' ||
          code === 'auth/operation-not-supported-in-this-environment';

        if (canFallbackToRedirect) {
          redirectStarted = true;
          await this.afAuth.signInWithRedirect(provider);
          return;
        }

        throw popupError;
      }
    } catch (error: any) {
      await this.handleAuthError(error);
    } finally {
      if (!redirectStarted) {
        await loading.dismiss();
      }
    }
  }

  private async handleAuthError(error: any) {
    let message = 'Unable to sign in with Google. Please try again.';

    if (error.code) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          message = 'The sign-in was closed before completing.';
          break;
        case 'auth/cancelled-popup-request':
          message = 'Multiple sign-in attempts detected. Please try again.';
          break;
        case 'auth/network-request-failed':
          message = 'Network error. Check your connection and try again.';
          break;
        case 'auth/unauthorized-domain':
          message = 'This domain is not authorized for OAuth operations.';
          break;
        case 'auth/operation-not-allowed':
          message = 'Google sign-in is not enabled. Please contact support.';
          break;
      }
    }

    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'bottom',
    });

    await toast.present();
  }
}

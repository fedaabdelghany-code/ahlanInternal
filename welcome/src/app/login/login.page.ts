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
    // Handle redirect result when user returns from Google sign-in
    // This is handled in app.component.ts to avoid race conditions
    // Keeping this here as a fallback
    try {
      const result = await this.afAuth.getRedirectResult();
      if (result.user) {
        // User successfully signed in, navigate to main app
        // Using replaceUrl to prevent back button issues
        this.router.navigateByUrl('tabs/tab1', { replaceUrl: true });
      }
    } catch (error: any) {
      // Handle any errors from the redirect
      if (error.code) {
        this.handleAuthError(error);
      }
    }
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

    try {
      // Use redirect instead of popup for better Safari and mobile compatibility
      await this.afAuth.signInWithRedirect(provider);
      // Note: The page will redirect away, so loading won't be dismissed here
      // It will be handled when the user returns
    } catch (error: any) {
      loading.dismiss();
      this.handleAuthError(error);
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

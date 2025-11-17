import { Component } from '@angular/core';
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
export class LoginPage {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

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

    this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        loading.dismiss();
        this.router.navigateByUrl('tabs/tab1', { replaceUrl: true });
      })
      .catch(async (error) => {
        loading.dismiss();

        let message = 'Unable to sign in with Google. Please try again.';
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            message = 'The sign-in popup was closed before completing.';
            break;
          case 'auth/cancelled-popup-request':
            message = 'Multiple sign-in attempts detected. Please try again.';
            break;
          case 'auth/network-request-failed':
            message = 'Network error. Check your connection and try again.';
            break;
        }

        const toast = await this.toastCtrl.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'bottom',
        });

        await toast.present();
      });
  }
}

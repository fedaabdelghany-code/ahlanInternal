import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async login() {
const loading = await this.loadingCtrl.create({
  spinner: 'crescent',
  cssClass: 'custom-loading',
  showBackdrop: false,
  translucent: true,
});

    await loading.present();

    this.afAuth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        loading.dismiss();
        this.router.navigateByUrl('tabs/tab1', { replaceUrl: true });
      })
      .catch(async (error) => {
        loading.dismiss();

        let message = 'An unexpected error occurred. Please try again.';
        switch (error.code) {
          case 'auth/invalid-email':
            message = 'The email address is invalid.';
            break;
          case 'auth/user-disabled':
            message = 'This account has been disabled.';
            break;
          case 'auth/user-not-found':
            message = 'No user found with this email.';
            break;
          case 'auth/wrong-password':
            message = 'Incorrect password.';
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

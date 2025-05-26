// import { Injectable } from '@angular/core';

// declare global {
//   interface Window {
//     OneSignal: any;
//   }
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class OneSignalService {
//   private OneSignal: any;

//   constructor() {
//     this.OneSignal = window.OneSignal || [];
//   }

//   initOneSignal() {
//     this.OneSignal.push(() => {
//       this.OneSignal.init({
//         appId: 'ca918f5d-7fc2-4660-8c22-bc55bbee4f91',
//         safari_web_id: 'YOUR-SAFARI-WEB-ID', // optional
//         notifyButton: {
//           enable: true, // disable default button
//         },
//         autoRegister: true, // disable auto-prompting
//         allowLocalhostAsSecureOrigin: true,
//       });

//       this.OneSignal.on('subscriptionChange', (isSubscribed: boolean) => {
//         console.log('User subscription state is now:', isSubscribed);
//         if (isSubscribed) {
//           this.OneSignal.getUserId().then((userId: string) => {
//             console.log('OneSignal user ID:', userId);
//             // Optionally send userId to backend
//           });
//         }
//       });
//     });
//   }

//   async isPushEnabled(): Promise<boolean> {
//     return new Promise((resolve) => {
//       this.OneSignal.push(async () => {
//         const enabled = await this.OneSignal.isPushNotificationsEnabled();
//         resolve(enabled);
//       });
//     });
//   }

//   async getPermissionStatus(): Promise<string> {
//     return Notification.permission; // 'default', 'granted', 'denied'
//   }

//   async promptForNotifications(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       this.OneSignal.push(async () => {
//         try {
//           await this.OneSignal.showSlidedownPrompt();
//           resolve();
//         } catch (error) {
//           console.error('Notification prompt failed', error);
//           reject(error);
//         }
//       });
//     });
//   }
// }

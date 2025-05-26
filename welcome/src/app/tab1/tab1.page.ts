import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ExchangeService } from '../exchange.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
// import { OneSignalService } from '../one-signal.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {
  temperature: number | null = null;
  condition: string = '';
  city: string = 'Cairo';
  iconUrl: string = '';
  exchangeRates: { [key: string]: number } = {};
  firstName: string = '';
email: string = '';
  showEnableButton = false;
  showPrompt= false;


selectedDate: string = this.formatDate(new Date());


formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // "YYYY-MM-DD"
}
private emailCountryMap: { [email: string]: string } = {
  // Switzerland
  'patrick.ebeling@holcim.com': 'Switzerland',
  'manoj.chhura@holcim.com': 'Switzerland',
  'david.fauvet@holcim.com': 'Switzerland',
  'moumita.chakraborty@holcim.com': 'Switzerland',
  'daniel.reiser@holcim.com': 'Switzerland',
  'jorge.gamarra@holcim.com': 'Switzerland',
  'andreas.lochmann@holcim.com': 'Switzerland',
  'milosz.milojevic@holcim.com': 'Switzerland',
  'luc.fermin@holcim.com': 'Switzerland',
  'leonard.luzieux@holcim.com': 'Switzerland',
  'mohamed.ali@geocycle.com':'Switzerland',

  // United Arab Emirates
  'arshad.rasheed@lafargeholcim.com': 'United Arab Emirates',
  'rajaa.ramakrishnan@lafargeholcim.com': 'United Arab Emirates',
  'khaled.farrag@lafargeholcim.com': 'United Arab Emirates',

  // Morocco
  'elmostafa.zaimi@lafargeholcim.com': 'Morocco',
  'mohammed.bensouda@lafargeholcim.com': 'Morocco',
  'chakib.eloudghiri@lafargeholcim.com': 'Morocco',
  'salma.tahri@lafargeholcim.com': 'Morocco',
  'adil.hamimaz@lafargeholcim.com': 'Morocco',
  'hamid.zadim@lafargeholcim.com': 'Morocco',
  'mohamed.kharraki@lafargeholcim.com': 'Morocco',
  'najib.ribi@lafargeholcim.com':'Morocco',
  

  // Philippines
  'mario.gereis@holcim.com': 'Philippines',
  'luningning.donato@holcim.com': 'Philippines',

  // Bangladesh
  'amitav.singh@lafargeholcim.com': 'Bangladesh',

  // France
  'mohamed.jouhari@holcim.com': 'France',
  'sorin.chiriac@holcim.com': 'France',
  'mohamed.badr@holcim.com':'France',

  // Cameroon
  'simon.ndo@holcim.com': 'Cameroon',
  'amine.derridj@holcim.com': 'Cameroon',

  'emily.elias@lafarge.com':'Macedonia',

  // China
  'liyuan.song@lafargeholcim.com': 'China',
  'hua-hong.sun@lafargeholcim.com': 'China',
  'jian-chao.yang@lafargeholcim.com': 'China',
  'yuhui.yang@lafargeholcim.com': 'China',

  // Jordan
  'ayman.al-leimoon@lafarge.com': 'Jordan',

  // Algeria
  'mounir.benmebarek@lafarge.com': 'Algeria',
  'redouane.djazairi@lafargeholcim.com': 'Algeria',
  'abdeli.abdelkarim@lafarge.com': 'Algeria',
  'mohamed.benarmas@lafarge.com': 'Algeria',

  // UK
  'bhogendra.mishra@holcim.com': 'UK',

  // Iraq
  'meran.akram@lafarge.com': 'Iraq',
  'lava.mohamed@lafarge.com': 'Iraq',

  // Azerbaijan
  'ali.huseynov@holcim.com': 'Azerbaijan',

  // Nigeria
  'milad.hanna@lafarge.com': 'Nigeria',
  'philip.anaobi@lafarge.com': 'Nigeria',
  'y.srinivasarao@lafarge.com': 'Nigeria',

  // Lebanon
  'samer.mehtar@holcim.com': 'Lebanon',

  // India
  'gaurav.patel@holcim.com': 'India'
};

 country = this.emailCountryMap[this.email] || 'Egypt';






scheduleData: { [date: string]: {
  speaker: any;
  description: any;
  time: string;
  title: string;
  location: string;
  color: string;
}[] } = {
    '2025-05-19': [
{
  "time": "20:00 - 22:00",
  "title": "Welcome Dinner in Cucina Restaurant",
  "location": "Cucina Restaurant",
  "color": "schedule-grey",
  "speaker": "N/A",
  "description": "Join us for a warm dinner at Cucina Restaurant—an opportunity to connect with fellow guests in a relaxed and elegant setting."
}
  ]


};


constructor(
  private weatherService: WeatherService,
  private exchangeService: ExchangeService,
  private afAuth: AngularFireAuth,
  private firestore: AngularFirestore,
  // private oneSignalService: OneSignalService
) {}

ngOnInit() {
  console.log('[ngOnInit] Initializing...');
  this.loadWeather();
  this.loadExchangeRates();
  this.loadUserData(); // ✅ Safe here
    setInterval(() => {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }, 4000); // change every 4 seconds

}


// async ionViewDidEnter() {
//   this.oneSignalService.initOneSignal();
//   this.updateButtonVisibility();
// }

// async updateButtonVisibility() {
//   try {
//     const permission = await this.oneSignalService.getPermissionStatus();
//     const subscribed = await this.oneSignalService.isPushEnabled();

//     this.showEnableButton = permission !== 'granted' || !subscribed;

//     console.log(`[updateButtonVisibility] Permission: ${permission}, Subscribed: ${subscribed}`);
//   } catch (error) {
//     console.error('[updateButtonVisibility] Failed to update button visibility:', error);
//     this.showEnableButton = true; // fallback to visible
//   }
// }

// async enableNotifications() {
//   console.log('[enableNotifications] Button clicked');

//   try {
//     if (Notification.permission === 'default') {
//       const permission = await Notification.requestPermission();
//       console.log(`[enableNotifications] Native permission result: ${permission}`);

//       if (permission !== 'granted') {
//         console.warn('User denied notification permission.');
//         return;
//       }
//     }

//     await this.oneSignalService.promptForNotifications();
//     console.log('[enableNotifications] OneSignal prompt shown');
//   } catch (error) {
//     console.error('[enableNotifications] Error during prompt:', error);
//   }

//   await this.updateButtonVisibility();
// }

images = [
  { src: 'assets/sokhna.jpg', alt: 'Sokhna Plant', title: 'Welcome to Sokhna Plant' },
  { src: 'assets/pyramids.png', alt: 'Second View', title: 'Welcome to Sokhna Plant' },
  { src: 'assets/cairo.png', alt: 'Third View', title: 'Welcome to Sokhna Plant' }
];

currentImageIndex = 0;



  loadWeather() {
    console.log('[loadWeather] Fetching weather for city:', this.city);
    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: (data) => {
        console.log('[loadWeather] Weather data received:', data);
        this.temperature = data.current.temp_c;
        this.condition = data.current.condition.text;
        this.iconUrl = 'https:' + data.current.condition.icon;
      },
      error: (err) => {
        console.error('[loadWeather] Failed to load weather:', err);
      },
    });
  }

  expandedIndex: number | null = null;

toggleCard(index: number) {
  this.expandedIndex = this.expandedIndex === index ? null : index;
}


  loadExchangeRates() {
    console.log('[loadExchangeRates] Loading exchange rates...');
    const foreignCurrencies = ['USD', 'EUR', 'CHF'];
    foreignCurrencies.forEach((currency) => {
      this.exchangeService.getExchangeRates(currency).subscribe({
        next: (data) => {
          console.log(`[loadExchangeRates] ${currency} to EGP:`, data.conversion_rates['EGP']);
          this.exchangeRates[currency] = data.conversion_rates['EGP'];
        },
        error: (err) => {
          console.error(`[loadExchangeRates] Error loading ${currency} rate:`, err);
        },
      });
    });
  }

loadUserData() {
  console.log('[loadUserData] Attempting to load user data');

  this.afAuth.authState.subscribe(user => {
    if (!user) {
      console.warn('[loadUserData] No authenticated user found');
      this.firstName = 'Visitor';
      return;
    }

    this.email = user.email ?? '';

    // Update country AFTER setting email
    this.country = this.emailCountryMap[this.email] || 'Egypt';

    // Special case override
    if (this.email.toLowerCase() === 'y.srinivasarao@lafarge.com') {
      this.firstName = 'Yadagani';
      return;
    }

  // Default fallback
  this.firstName = this.getFirstNameFromEmail(this.email);


});



}
getFirstNameFromEmail(email: string): string {
  if (!email) return '';

  const namePart = email.split('@')[0]; // e.g., "hua-hong.sun"
  let firstName = namePart.split('.')[0]; // e.g., "hua-hong"

  // Remove hyphens and capitalize parts
  firstName = firstName
    .split('-')               // ["hua", "hong"]
    .map(this.capitalize)     // ["Hua", "Hong"]
    .join('');                // "Huahong"

  return firstName;
}

capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

formatDateDisplay(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  return `${day}/${month}`;
}

getGreetingByCountry(country: string): string {
  switch (country.toLowerCase()) {
    case 'morocco':
    case 'algeria':
      return 'Azul';
    
    case 'united arab emirates':
    case 'iraq':
    case 'lebanon':
    case 'jordan':
    case 'egypt':
      return 'Ahlan';

    case 'france':
      return 'Bonjour';

    case 'switzerland':
      return 'Grüezi'; // Swiss German
      // You could also use "Bonjour" or "Buongiorno" depending on region

    case 'philippines':
      return 'Kumusta';

    case 'bangladesh':
      return 'Nomoskar'; // Bengali greeting

    case 'cameroon':
      return 'Bonjour'; // French-speaking region

    case 'china':
      return 'Nǐ hǎo';

    case 'uk':
      return 'Hello';

    case 'azerbaijan':
      return 'Salam';

    case 'macedonia':
      return 'Zdravo';

    case 'nigeria':
      return 'Hello';

    case 'india':
      return 'Namaste';

    default:
      return 'Ahlan';
  }
}



}


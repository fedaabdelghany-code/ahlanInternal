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

getScheduleHeaderText(): string {
  switch (this.selectedDate) {
    case '2025-05-27':
      return "It's People & Purpose Day!";
    case '2025-05-28':
      return "It's Performance Day!";
    default:
      return "Today's Schedule";
  }
}

private emailCountryMap: { [email: string]: string } = {
  'carmen.diaz@holcim.com': 'Spain'
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
  "2025-05-26": [
    {
      "time": "19:00",
      "title": "Arrival to Marriott MENA House",
      "location": "Marriott MENA House",
      "color": "schedule-green",
      "speaker": "N/A",
      "description": "Check-in and settle at Marriott MENA House."
    },
    {
      "time": "19:30 - 20:30",
      "title": "Meet Country Leadership Team & Strategy",
      "location": "Marriott MENA House",
      "color": "schedule-blue",
      "speaker": "Country Leadership Team",
      "description": "Strategic discussion with the local leadership team."
    },
    {
      "time": "20:30 - 22:00",
      "title": "Dinner with the Leadership Team by the Pyramids",
      "location": "Marriott MENA House - Outdoor Venue",
      "color": "schedule-darkBlue",
      "speaker": "N/A",
      "description": "Dinner in a scenic setting by the Pyramids with the leadership team."
    },
    {
      "time": "22:00 - 22:50",
      "title": "Check-In at Dusit Thani Hotel",
      "location": "Dusit Thani Hotel",
      "color": "schedule-grey",
      "speaker": "N/A",
      "description": "Late-night check-in and rest at Dusit Thani Hotel."
    }
  ],
  "2025-05-27": [
    {
      "time": "08:00",
      "title": "Move to Lafarge Egypt HQ",
      "location": "Cairo",
      "color": "schedule-grey",
      "speaker": "N/A",
      "description": "Transfer to Lafarge Egypt HQ."
    },
    {
      "time": "08:15 - 08:30",
      "title": "Arrival to Lafarge Egypt HQ & Meet K.D",
      "location": "Lafarge Egypt HQ",
      "color": "schedule-green",
      "speaker": "K.D",
      "description": "Welcome to the HQ and meet with K.D."
    },
    {
      "time": "08:30 - 09:30",
      "title": "Our People Journey: People & Comms Strategy and Roadmap",
      "location": "Lafarge Egypt HQ",
      "color": "schedule-blue",
      "speaker": "People & Comms Team",
      "description": "Presentation of the People & Communications strategic roadmap."
    },
    {
      "time": "09:30 - 10:00",
      "title": "Meet GROW & STEP-IN",
      "location": "Lafarge Egypt HQ",
      "color": "schedule-darkBlue",
      "speaker": "Program Leaders",
      "description": "Introduction to the GROW and STEP-IN programs."
    },
    {
      "time": "10:30 - 11:30",
      "title": "Leading the way for Her: A Mentorship talk with our CPO",
      "location": "Lafarge Egypt HQ",
      "color": "schedule-green",
      "speaker": "Chief People Officer",
      "description": "Mentorship session focusing on gender inclusion and leadership."
    },
    {
      "time": "11:30 - 12:00",
      "title": "Country Sustainability Strategy & Overview",
      "location": "Lafarge Egypt HQ",
      "color": "schedule-blue",
      "speaker": "Sustainability Team",
      "description": "Presentation on Egypt’s sustainability approach."
    },
    {
      "time": "12:00 - 12:30",
      "title": "Country HSE Overview",
      "location": "Lafarge Egypt HQ",
      "color": "schedule-darkBlue",
      "speaker": "HSE Lead",
      "description": "Overview of HSE initiatives and achievements."
    },
    {
      "time": "12:30 - 12:50",
      "title": "Floor walkthrough and engagement with HQ people",
      "location": "Lafarge Egypt HQ",
      "color": "schedule-green",
      "speaker": "N/A",
      "description": "Walkthrough the facility and engage with team members."
    },

    {
      "time": "12:50 - 13:05",
      "title": "From HQ to Dusit Thani Hotel",
      "location": "Cairo",
      "color": "schedule-blue",
      "speaker": "N/A",
      "description": "Return transfer to Dusit Thani Hotel."
    },
    {
      "time": "13:05 - 14:50",
      "title": "Break & Lunch",
      "location": "Dusit Thani Hotel",
      "color": "schedule-darkBlue",
      "speaker": "N/A",
      "description": "Lunch and downtime at the hotel."
    },
    {
      "time": "14:50 - 16:50",
      "title": "People Talk: Nurturing Future Leaders",
      "location": "Dusit Thani Hotel",
      "color": "schedule-green",
      "speaker": "C.D, B.K, K.D.",
      "description": "Leadership discussion around talent development and succession."
    },
{
  "time": "14:50 - 16:50",
  "title": "People Talk: Nurturing Future Leaders",
  "location": "Dusit Thani Hotel",
  "color": "schedule-green",
  "speaker": "C.D, B.K, K.D.",
  "description": "Leadership discussion around talent development and succession."
},
{
  "time": "16:50 - 17:35",
  "title": "Video Call with Miljan",
  "location": "Dusit Thani Hotel",
  "color": "schedule-blue",
  "speaker": "Miljan",
  "description": "Virtual check-in with Miljan."
},
{
  "time": "17:35 - 18:00",
  "title": "Break",
  "location": "Dusit Thani Hotel",
  "color": "schedule-grey",
  "speaker": "N/A",
  "description": "Short break before the evening program."
},
{
  "time": "18:00 - 19:00",
  "title": "Move from Dusit to Nile Cruise",
  "location": "Cairo",
  "color": "schedule-darkBlue",
  "speaker": "N/A",
  "description": "Transport to the Nile cruise venue."
},
{
  "time": "19:00 - 21:30",
  "title": "Dinner with the People Team - Nile Cruise",
  "location": "Nile River",
  "color": "schedule-green",
  "speaker": "N/A",
  "description": "Dinner cruise with the People Team."
}

  ],
  "2025-05-28": [
    {
      "time": "07:45 - 08:45",
      "title": "Check-Out & move from Dusit Thani Hotel to SOK Plant",
      "location": "From Dusit to SOK Plant",
      "color": "schedule-grey",
      "speaker": "N/A",
      "description": "Morning transfer to SOK Plant."
    },
    {
      "time": "08:00",
      "title": "HSE Virtual Induction (on the road)",
      "location": "In Transit",
      "color": "schedule-darkBlue",
      "speaker": "HSE Team",
      "description": "Virtual HSE induction during transport."
    },
    {
      "time": "08:45 - 09:00",
      "title": "Welcome to SOK Plant",
      "location": "SOK Plant",
      "color": "schedule-green",
      "speaker": "Plant Team",
      "description": "Arrival and welcome session at the SOK Plant."
    },
    {
      "time": "09:00 - 09:15",
      "title": "Change into PPEs",
      "location": "SOK Plant",
      "color": "schedule-blue",
      "speaker": "N/A",
      "description": "Preparation for plant tour with safety gear."
    },
    {
      "time": "09:15 - 10:30",
      "title": "Plant Tour",
      "location": "SOK Plant",
      "color": "schedule-darkBlue",
      "speaker": "Operations Team",
      "description": "Tour through Maintenance, Warehouse, Platform, Geocycle, CCR, Lab, and Smart Room."
    },
    {
      "time": "10:30 - 11:00",
      "title": "Meet Plant Excom & Sr. Managers - (SOK Plant & Geocycle Overview)",
      "location": "SOK Plant",
      "color": "schedule-green",
      "speaker": "Plant Excom",
      "description": "Strategic overview and introduction by plant leaders."
    },
    {
      "time": "11:00 - 12:00",
      "title": "SOK Plant to Sarai RMX BP",
      "location": "Cairo",
      "color": "schedule-blue",
      "speaker": "N/A",
      "description": "Transfer from SOK Plant to Sarai RMX BP."
    },
    {
      "time": "12:00 - 13:00",
      "title": "Sarai RMX BP Tour",
      "location": "Sarai RMX BP",
      "color": "schedule-darkBlue",
      "speaker": "Site Team",
      "description": "Site visit and operational tour at RMX BP."
    },
    {
      "time": "13:00 - 13:30",
      "title": "Sarai RMX BP to Le Meridien Hotel at CAI Airport",
      "location": "Cairo",
      "color": "schedule-green",
      "speaker": "N/A",
      "description": "Travel to Le Meridien Hotel near the airport."
    },
    {
      "time": "13:30 - 14:15",
      "title": "Wrap Up - Coffee",
      "location": "Le Meridien Hotel",
      "color": "schedule-blue",
      "speaker": "CD, BK, KD",
      "description": "Closing discussion and coffee session."
    },
    {
      "time": "14:30",
      "title": "Arrival at CAI Airport",
      "location": "CAI Airport",
      "color": "schedule-darkBlue",
      "speaker": "N/A",
      "description": "CD arrives at Cairo Airport for departure."
    }
  ]
}
;


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
  
    case 'spain':
      return 'Hola';

    default:
      return 'Ahlan';
  }
}



}


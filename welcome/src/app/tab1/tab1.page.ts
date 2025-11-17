import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ExchangeService } from '../exchange.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom, take } from 'rxjs';
import firebase from 'firebase/compat/app';
import { environment } from '../../environments/environment';

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
  safetyInductionCompleted: boolean | null = null;
  safetyInductionLink: string = '';
  userBatch: 'IC' | 'FINANCE' | 'NONE' = 'NONE';

  selectedDate: string = this.formatDate(new Date());

  // Email batch definitions
  icEmails = [
    'mounir.ajaha@lafargeholcim.com',
    'fatima-zahra.elalami@lafargeholcim.com',
    'yulia.zhelobaeva@holcim.com',
    'amina.khelfa@lafarge.com',
    'fahd.bakalem@lafarge.com',
    'abdelhadi.lardjane@lafarge.com',
    'yuan-yuan.zhang@holcim.com',
    'iqra.ashraf@lafargeholcim.com',
    'mukesh.bhojwani@holcim.com',
    'neha.padaval@holcim.com',
    'abdallah.khashashneh@lafarge.com',
    'shvan.migdad@lafarge.com',
    'tereze.kandah@lafarge.com',
    'preeti.rohera@holcim.com',
    'amr.elmouafy@lafarge.com',
    'adannaya.duru@lafarge.com',
    'mohammad.nofal@lafarge.com',
    'feda.abdelghany@lafarge.com',
  ];

  financeEmails = [
'steffen.kindler@holcim.com',
'rajesh.surana@holcim.com',
'madeleine.you@holcim.com',        
'emily.elias@lafarge.com',


  ];

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getScheduleHeaderText(): string {
    if (this.userBatch === 'IC') {
      return "IC Workshop Schedule";
    } else if (this.userBatch === 'FINANCE') {
      return "Egypt Visit Schedule";
    }
    return "Today's Schedule";
  }

  private emailCountryMap: { [email: string]: string } = {
    'carmen.diaz@holcim.com': 'Spain'
  };

  country = this.emailCountryMap[this.email] || 'Egypt';
  // Get the appropriate schedule based on user batch
  get scheduleData() {
    if (this.userBatch === 'IC') {
      return this.icScheduleData;
    } else if (this.userBatch === 'FINANCE') {
      return this.financeScheduleData;
    }
    return {};
  }

  get scheduleDates() {
    return Object.keys(this.scheduleData);
  }

  images = [
    { src: 'assets/sokhna.jpg', alt: 'Sokhna Plant', title: 'Welcome to Sokhna Plant' },
    { src: 'assets/pyramids.png', alt: 'Second View', title: 'Welcome to Sokhna Plant' },
    { src: 'assets/cairo.png', alt: 'Third View', title: 'Welcome to Sokhna Plant' }
  ];

  currentImageIndex = 0;

  constructor(
    private weatherService: WeatherService,
    private exchangeService: ExchangeService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {}

  async ngOnInit() {
    console.log('[ngOnInit] Initializing...');
    this.loadWeather();
    this.loadExchangeRates();
    await this.loadUserData();
    this.determineBatch();
    this.checkSafetyInductionStatus();
  }

  determineBatch() {
    const normalizedEmail = this.email.toLowerCase();
    if (this.icEmails.map(e => e.toLowerCase()).includes(normalizedEmail)) {
      this.userBatch = 'IC';
    } else if (this.financeEmails.map(e => e.toLowerCase()).includes(normalizedEmail)) {
      this.userBatch = 'FINANCE';
    } else {
      this.userBatch = 'NONE';
    }
    console.log('[determineBatch] User batch:', this.userBatch, 'for email:', this.email);
  }

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

  async loadUserData(): Promise<void> {
    const user = await firstValueFrom(this.afAuth.authState.pipe(take(1)));
    if (!user) {
      this.firstName = 'Visitor';
      return;
    }

    this.email = user.email ?? '';
    this.country = this.emailCountryMap[this.email] || 'Egypt';

    this.firstName = this.email.toLowerCase() === 'y.srinivasarao@lafarge.com'
      ? 'Yadagani'
      : this.getFirstNameFromEmail(this.email);
  }

  async checkSafetyInductionStatus() {
    console.log('[checkSafetyInductionStatus] Checking safety induction status...');
    console.log('[checkSafetyInductionStatus] Email used for query:', this.email);

    if (!this.email) {
      console.warn('[checkSafetyInductionStatus] Email is empty. Skipping Firestore query.');
      this.safetyInductionCompleted = null;
      return;
    }

    const normalizedEmail = this.email.toLowerCase();

    // Check if the HSE app is already initialized
    let hseApp;
    if (!firebase.apps.some(app => app.name === 'HSEApp')) {
      const hsefirebaseConfig = environment.hsefirebaseConfig;
      hseApp = firebase.initializeApp(hsefirebaseConfig, 'HSEApp');
    } else {
      hseApp = firebase.app('HSEApp');
    }

    const hseFirestore = hseApp.firestore();

    try {
      const userDoc = await hseFirestore
        .collection('userProgress')
        .where('email', '==', normalizedEmail)
        .get();

      if (!userDoc.empty) {
        const userData = userDoc.docs[0].data();
        this.safetyInductionCompleted = userData['questionnairePassed'];
        this.safetyInductionLink = this.safetyInductionCompleted
          ? 'https://mea-hseegyptonboarding-prod.web.app/congratulations.html'
          : 'https://mea-hseegyptonboarding-prod.web.app/';
        console.log('[checkSafetyInductionStatus] Status loaded:', this.safetyInductionCompleted);
      } else {
        console.warn('[checkSafetyInductionStatus] No user data found for email:', this.email);
        this.safetyInductionCompleted = false;
        this.safetyInductionLink = 'https://mea-hseegyptonboarding-prod.web.app/';
      }
    } catch (error) {
      console.error('[checkSafetyInductionStatus] Error fetching safety induction status:', error);
      this.safetyInductionCompleted = null;
    }
  }

  getFirstNameFromEmail(email: string): string {
    if (!email) return '';

    const namePart = email.split('@')[0];
    let firstName = namePart.split('.')[0];

    firstName = firstName
      .split('-')
      .map(this.capitalize)
      .join('');

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

  getDayTitle(date: string): string {
    switch(date) {
      case '2025-11-17':
        return 'Day 0 – Monday, November 17, 2025: Arrival';
      case '2025-11-18':
        return this.userBatch === 'IC' 
          ? 'Day 1 – Tuesday, November 18, 2025: Internal Control Meeting'
          : 'Day 1 – Tuesday, November 18, 2025: Sokhna Plant Visit';
      case '2025-11-19':
        return this.userBatch === 'IC'
          ? 'Day 2 – Wednesday, November 19, 2025: SOK Plant & GEM Tour'
          : 'Day 2 – Wednesday, November 19, 2025: RMX & Customer Visit';
      case '2025-11-20':
        return 'Day 3 – Thursday, November 20, 2025: Meeting with HSBC & SCB & Visit Wrap';
      case '2025-11-21':
        return 'Day 4 – Friday, November 21, 2025: Departure';
      default:
        return date;
    }
  }

  
  // IC Schedule Data
  icScheduleData: { [date: string]: {
    speaker: string,
    description: string,
    time: string;
    title: string;
    location: string;
    color: string;
  }[] } = {
    "2025-11-18": [
      {
        "time": "07:30 - 07:50",
        "title": "Coffee Break",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Morning refreshments."
      },
      {
        "time": "07:50 - 08:00",
        "title": "Safety Induction",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-darkBlue",
        "speaker": "HSE Team",
        "description": "Safety briefing and induction."
      },
      {
        "time": "08:00 - 08:15",
        "title": "Steffen KINDLER Speech",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-blue",
        "speaker": "Steffen Kindler",
        "description": "Opening speech by Steffen Kindler."
      },
      {
        "time": "08:15 - 08:30",
        "title": "Rajesh SURANA Speech",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-blue",
        "speaker": "Rajesh Surana",
        "description": "Speech by Rajesh Surana."
      },
      {
        "time": "08:30 - 08:45",
        "title": "Egypt CEO Speech",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-blue",
        "speaker": "Egypt CEO",
        "description": "Address by the Egypt CEO."
      },
      {
        "time": "08:45 - 09:30",
        "title": "Regional Head of IC Speech – 2025 Initiatives/Achievements",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-darkBlue",
        "speaker": "Regional Head of IC",
        "description": "Presentation on 2025 Internal Control initiatives and achievements."
      },
      {
        "time": "09:30 - 09:50",
        "title": "Coffee Break",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Short break and refreshments."
      },
      {
        "time": "09:50 - 11:00",
        "title": "Atilla PARS & Federico EBERHARDT",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-blue",
        "speaker": "Atilla Pars & Federico Eberhardt",
        "description": "Presentation session."
      },
      {
        "time": "11:00 - 12:00",
        "title": "MCS 58 - Secure Payment Means",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-orange",
        "speaker": "IC Team",
        "description": "Discussion on secure payment means control."
      },
      {
        "time": "12:00 - 12:30",
        "title": "Presenting the Action Plan",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-blue",
        "speaker": "IC Team",
        "description": "Action plan presentation and review."
      },
      {
        "time": "12:30 - 13:15",
        "title": "Lunch",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Lunch break."
      },
      {
        "time": "13:15 - 14:15",
        "title": "MCS 12 User Access Review/Cross SOD & MCS 34/35 Inventory/Cross SOD - TIS to ERP",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-orange",
        "speaker": "IC Team",
        "description": "Review of user access controls and inventory management systems."
      },
      {
        "time": "14:15 - 15:00",
        "title": "Presenting the Action Plan + Q&A/Comments",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-blue",
        "speaker": "IC Team",
        "description": "Action plan presentation with Q&A session."
      },
      {
        "time": "15:00 - 15:15",
        "title": "Short Break",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Quick refreshment break."
      },
      {
        "time": "15:15 - 16:15",
        "title": "MCS 57 - Cash Collection & Cash Deposit",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-orange",
        "speaker": "IC Team",
        "description": "Discussion on cash collection without Group treasury approval and cash deposit controls."
      },
      {
        "time": "16:15 - 17:00",
        "title": "Action Plan Presentation + Q&A/Comments",
        "location": "JW Marriott Meeting Room",
        "color": "schedule-blue",
        "speaker": "IC Team",
        "description": "Final action plan presentation with questions and comments."
      },
      {
        "time": "17:00 - 18:00",
        "title": "Transfer to Restaurant",
        "location": "Cairo",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Transportation to dinner venue."
      },
      {
        "time": "18:00 - 21:00",
        "title": "Dinner by the Nile",
        "location": "Nile River Restaurant",
        "color": "schedule-green",
        "speaker": "N/A",
        "description": "Dinner at a restaurant by the Nile."
      },
      {
        "time": "21:00 - 22:00",
        "title": "Transfer to Hotel",
        "location": "Cairo",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Return transfer to JW Marriott Hotel."
      }
    ],
    "2025-11-19": [
      {
        "time": "07:30 - 08:45",
        "title": "Transfer from JW to SOK Plant",
        "location": "Cairo to Sokhna",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Morning transfer to Sokhna Plant."
      },
      {
        "time": "08:45 - 09:00",
        "title": "Refreshments",
        "location": "SOK Plant",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Welcome refreshments at the plant."
      },
      {
        "time": "09:00 - 10:00",
        "title": "Countries' Best Practices & Upcoming Projects",
        "location": "SOK Plant",
        "color": "schedule-blue",
        "speaker": "Regional Teams",
        "description": "Presentation on international best practices and future projects."
      },
      {
        "time": "10:00 - 11:00",
        "title": "Wrap Up - Q&A",
        "location": "SOK Plant",
        "color": "schedule-darkBlue",
        "speaker": "IC Leadership",
        "description": "Summary session with questions and answers."
      },
      {
        "time": "11:00 - 11:30",
        "title": "Refreshments – PPEs",
        "location": "SOK Plant",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Break and preparation with personal protective equipment."
      },
      {
        "time": "11:30 - 13:00",
        "title": "Plant Tour",
        "location": "SOK Plant",
        "color": "schedule-darkBlue",
        "speaker": "Plant Operations",
        "description": "Comprehensive tour of the Sokhna Plant facilities."
      },
      {
        "time": "13:00 - 14:45",
        "title": "Transfer to Mena House",
        "location": "Cairo",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Transfer from plant to Mena House Hotel."
      },
      {
        "time": "14:45 - 18:00",
        "title": "Dinner at Mena House",
        "location": "Marriott Mena House",
        "color": "schedule-green",
        "speaker": "N/A",
        "description": "Dinner at the historic Mena House by the Pyramids."
      },
      {
        "time": "18:00 - 18:15",
        "title": "Transfer from Mena House to Grand Egyptian Museum",
        "location": "Cairo",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Short transfer to the Grand Egyptian Museum."
      },
      {
        "time": "18:15 - 20:30",
        "title": "GEM Tour",
        "location": "Grand Egyptian Museum",
        "color": "schedule-purple",
        "speaker": "N/A",
        "description": "Guided tour of the Grand Egyptian Museum."
      }
    ]
  };

  // Finance Schedule Data
  financeScheduleData: { [date: string]: {
    time: string;
    title: string;
    location: string;
    color: string;
  }[] } = {
    "2025-11-17": [
      {
        "time": "18:40",
        "title": "Arrival - Flight LX 4194",
        "location": "CAI Airport",
        "color": "schedule-grey",
      },
      {
        "time": "19:30",
        "title": "Arrival to JW Marriott",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      },
      {
        "time": "20:30 - 22:30",
        "title": "Dinner with the Country Leadership Team in Steakhouse JW Marriott",
        "location": "JW Marriott Hotel - Steakhouse",
        "color": "schedule-green",
      }
    ],
    "2025-11-18": [
      {
        "time": "08:00 - 08:15",
        "title": "Steffen Kindler Speech at the Opening of Internal Control Meeting",
        "location": "JW Marriott Hotel",
        "color": "schedule-blue",
      },
      {
        "time": "08:15 - 08:30",
        "title": "Rajesh Surana Speech",
        "location": "JW Marriott Hotel",
        "color": "schedule-blue",
      },
      {
        "time": "08:30 - 08:45",
        "title": "Khaled El Dokkani Speech",
        "location": "JW Marriott Hotel",
        "color": "schedule-blue",
      },
      {
        "time": "09:30",
        "title": "Departure from JW Marriott",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      },
      {
        "time": "10:45 - 11:00",
        "title": "Coffee & PPEs",
        "location": "SOK Plant",
        "color": "schedule-grey",
      },
      {
        "time": "11:00 - 13:00",
        "title": "SOK Plant Tour",
        "location": "SOK Plant",
        "color": "schedule-darkBlue",
      },
      {
        "time": "13:00 - 14:00",
        "title": "Lunch",
        "location": "SOK Plant",
        "color": "schedule-grey",
      },
      {
        "time": "14:00 - 15:00",
        "title": "SOK Plant Projects",
        "location": "SOK Plant",
        "color": "schedule-blue",
      },
      {
        "time": "15:00 - 16:00",
        "title": "Cement Commercial Projects",
        "location": "SOK Plant",
        "color": "schedule-blue",
      },
      {
        "time": "16:15 - 17:00",
        "title": "Business Review for Geocycle & Sustainability",
        "location": "SOK Plant",
        "color": "schedule-darkBlue",
      },
      {
        "time": "17:00",
        "title": "Departure from SOK Plant",
        "location": "SOK Plant",
        "color": "schedule-grey",
      },
      {
        "time": "18:10",
        "title": "Arrival at JW Marriott",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      },
      {
        "time": "19:00 - 20:30",
        "title": "Dinner with the CFO and N-1",
        "location": "JW Marriott Hotel",
        "color": "schedule-green",
      }
    ],
    "2025-11-19": [
      {
        "time": "08:00",
        "title": "Pick up from JW Marriott",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      },
      {
        "time": "08:30",
        "title": "Arrival at Sarai RMX BP",
        "location": "Sarai RMX BP",
        "color": "schedule-grey",
      },
      {
        "time": "08:30 - 09:30",
        "title": "Sarai RMX BP Tour",
        "location": "Sarai RMX BP",
        "color": "schedule-darkBlue",
      },
      {
        "time": "09:30 - 10:30",
        "title": "RMX Strategy",
        "location": "Sarai RMX BP",
        "color": "schedule-blue",
      },
      {
        "time": "10:30",
        "title": "Departure Sarai RMX BP",
        "location": "Sarai RMX BP",
        "color": "schedule-grey",
      },
      {
        "time": "11:30",
        "title": "Arrival at Customer Visit",
        "location": "Customer Site",
        "color": "schedule-grey",
      },
      {
        "time": "11:30 - 13:30",
        "title": "Commercial Customer Visit",
        "location": "Customer Site",
        "color": "schedule-green",
      },
      {
        "time": "14:30",
        "title": "Arrival to JW Marriott Hotel",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      },
      {
        "time": "14:30 - 15:30",
        "title": "Break",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      },
      {
        "time": "15:30 - 16:45",
        "title": "Move from JW Marriott to the Grand Egyptian Museum (GEM)",
        "location": "Cairo",
        "color": "schedule-grey",
      },
      {
        "time": "16:45 - 18:00",
        "title": "Touring the GEM",
        "location": "Grand Egyptian Museum",
        "color": "schedule-purple",
      },
      {
        "time": "18:30 - 21:00",
        "title": "Dinner on the Nile with the Finance Team",
        "location": "Nile River",
        "color": "schedule-green",
      },
      {
        "time": "21:00 - 21:45",
        "title": "Arrival at JW Marriott Hotel",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      }
    ],
    "2025-11-20": [
      {
        "time": "08:00",
        "title": "Pick up from JW Marriott",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      },
      {
        "time": "08:30",
        "title": "Arrival to Lafarge Egypt HQ",
        "location": "Lafarge Egypt HQ",
        "color": "schedule-grey",
      },
      {
        "time": "08:30 - 10:00",
        "title": "Meeting with Finance N-1 & Digital Team",
        "location": "Lafarge Egypt HQ",
        "color": "schedule-blue",
      },
      {
        "time": "10:00 - 11:00",
        "title": "Meeting with Standard Chartered Bank",
        "location": "Lafarge Egypt HQ",
        "color": "schedule-orange",
      },
      {
        "time": "11:00 - 11:30",
        "title": "Coffee Break",
        "location": "Lafarge Egypt HQ",
        "color": "schedule-grey",
      },
      {
        "time": "11:30 - 13:00",
        "title": "Special Edition Town Hall: Meeting with Group CFO & Regional CFO",
        "location": "Lafarge Egypt HQ",
        "color": "schedule-darkBlue",
      },
      {
        "time": "13:00 - 14:00",
        "title": "Lunch with Finance N-1",
        "location": "Lafarge Egypt HQ",
        "color": "schedule-green",
      },
      {
        "time": "14:30 - 15:30",
        "title": "Debrief with KD & AZ",
        "location": "Lafarge Egypt HQ",
        "color": "schedule-blue",
      },
      {
        "time": "15:40",
        "title": "Move from Lafarge Egypt HQ",
        "location": "Lafarge Egypt HQ",
        "color": "schedule-grey",
      },
      {
        "time": "16:00 - 18:00",
        "title": "Break",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      },
      {
        "time": "18:30 - 21:00",
        "title": "Dinner with HSBC Bank",
        "location": "Restaurant",
        "color": "schedule-orange",
      },
      {
        "time": "21:30",
        "title": "Arrive at JW Marriott",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      }
    ],
    "2025-11-21": [
      {
        "time": "10:30",
        "title": "Check Out & Pick up from JW Marriott",
        "location": "JW Marriott Hotel",
        "color": "schedule-grey",
      },
      {
        "time": "11:00",
        "title": "Arrival at CAI Airport",
        "location": "CAI Airport",
        "color": "schedule-grey",
      },
      {
        "time": "13:00",
        "title": "Departure Flight LX 239",
        "location": "CAI Airport",
        "color": "schedule-grey",
      }
    ]
  };


}


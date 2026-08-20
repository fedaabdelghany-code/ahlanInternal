import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ExchangeService } from '../exchange.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom, take } from 'rxjs';
import firebase from 'firebase/compat/app';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SafetyInductionModalComponent } from './safety-induction-modal/safety-induction-modal.component';
import { ParticipantService } from '../participant.service';

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
  userBatch: 'LD' | 'FINANCE' | 'NONE' = 'NONE';

  // Dual-site safety induction tracking
  safetyInductions = {
    sokhnaplant: { completed: false, link: 'https://mea-hseegyptonboarding-prod.web.app/sokhnaplant' },
    rmx: { completed: false, link: 'https://mea-hseegyptonboarding-prod.web.app/RMX' }
  };
  totalInductionsRequired = 2;
  completedInductionsCount: number = 0;

  selectedDate: string = this.formatDate(new Date());

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getScheduleHeaderText(): string {
    if (this.userBatch === 'LD') {
      return "L&D Workshop Schedule";
    } else if (this.userBatch === 'FINANCE') {
      return "Egypt Visit Schedule";
    }
    return "Today's Schedule";
  }

  country = 'Egypt';
  // Get the appropriate schedule based on user batch
  get scheduleData() {
    if (this.userBatch === 'LD') {
      return this.ldScheduleData;
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
  private safetyInductionUnsubscribe?: () => void;

  constructor(
    private weatherService: WeatherService,
    private exchangeService: ExchangeService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private modalController: ModalController,
    private participantService: ParticipantService
  ) {}

  async ngOnInit() {
    console.log('[ngOnInit] Initializing...');
    const isAuthenticated = await this.loadUserData();
    if (!isAuthenticated) {
      await this.router.navigateByUrl('/login', { replaceUrl: true });
      return;
    }

    this.loadWeather();
    this.loadExchangeRates();
    this.determineBatch();

    // Always query HSE progress for authenticated users.
    // Batch assignment controls schedule visibility only.
    setTimeout(() => {
      this.listenToSafetyInductionStatus();
    }, 500);
  }

  determineBatch() {
    this.userBatch = this.participantService.getBatch(this.email);
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

  async loadUserData(): Promise<boolean> {
    const user = await firstValueFrom(this.afAuth.authState.pipe(take(1)));
    if (!user) {
      this.firstName = 'Visitor';
      this.email = '';
      return false;
    }

    this.email = user.email ?? '';
    const participant = this.participantService.findByEmail(this.email);
    this.country = participant?.country || 'Egypt';

    this.firstName = participant?.displayName || (this.email.toLowerCase() === 'y.srinivasarao@lafarge.com'
      ? 'Yadagani'
      : this.getFirstNameFromEmail(this.email));

    return true;
  }

  async listenToSafetyInductionStatus() {
    if (!this.email) return;

    const normalizedEmail = this.email.toLowerCase();
    const emailVariants = Array.from(new Set([this.email, normalizedEmail]));

    // Initialize HSE Firebase app
    let hseApp;
    if (!firebase.apps.some(app => app.name === 'HSEApp')) {
      hseApp = firebase.initializeApp(environment.hsefirebaseConfig, 'HSEApp');
    } else {
      hseApp = firebase.app('HSEApp');
    }

    const hseFirestore = hseApp.firestore();

    const updateInductionStatus = (docData?: any) => {
      if (!docData) {
        // User doesn't exist yet
        this.safetyInductions.sokhnaplant.completed = false;
        this.safetyInductions.rmx.completed = false;
      } else {
        // Support both legacy and current key naming from HSE project.
        const sokhnaPlantData = docData['sokhnaPlant'] || docData['sokhnaplant'] || {};
        const rmxData = docData['RMX'] || docData['rmx'] || {};

        this.safetyInductions.sokhnaplant.completed = sokhnaPlantData.questionnairePassed === true;
        this.safetyInductions.rmx.completed = rmxData.questionnairePassed === true;
      }

      // Update count of completed inductions
      this.completedInductionsCount = Object.values(this.safetyInductions).filter(s => s.completed).length;
      console.log('[SafetyInduction] Updated status - Sokhna:', this.safetyInductions.sokhnaplant.completed, 'RMX:', this.safetyInductions.rmx.completed, 'Total:', this.completedInductionsCount);
    };

    const userProgressCollection = hseFirestore.collection('userProgress');
    const baseQuery =
      emailVariants.length > 1
        ? userProgressCollection.where('email', 'in', emailVariants)
        : userProgressCollection.where('email', '==', normalizedEmail);

    // Initial fetch
    try {
      const snapshot = await baseQuery.get();

      if (!snapshot.empty) {
        updateInductionStatus(snapshot.docs[0].data());
      } else {
        // No document found
        updateInductionStatus();
      }
    } catch (err) {
      const code = (err as any)?.code;
      if (code === 'permission-denied' || code === 'firestore/permission-denied') {
        console.warn('[SafetyInduction] Access denied for userProgress; using default onboarding link.');
      } else {
        console.error('[SafetyInduction] Initial fetch error:', err);
      }
      updateInductionStatus(); // fallback to incomplete
      return;
    }

    // Real-time listener
    this.safetyInductionUnsubscribe = baseQuery.onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            updateInductionStatus(snapshot.docs[0].data());
          } else {
            updateInductionStatus(); // no document yet
          }
        },
        error => {
          const code = (error as any)?.code;
          if (code === 'permission-denied' || code === 'firestore/permission-denied') {
            console.warn('[SafetyInduction] Live updates disabled due to permission rules.');
            updateInductionStatus();
            if (this.safetyInductionUnsubscribe) {
              this.safetyInductionUnsubscribe();
              this.safetyInductionUnsubscribe = undefined;
            }
            return;
          }

          console.error('[SafetyInduction] Snapshot error:', error);
        }
      );
  }

ngOnDestroy() {
  if (this.safetyInductionUnsubscribe) {
    this.safetyInductionUnsubscribe();
    this.safetyInductionUnsubscribe = undefined;
  }
}

  /**
   * Get dynamic button text based on induction completion status
   */
  getSafetyInductionButtonText(): string {
    if (this.completedInductionsCount === this.totalInductionsRequired) {
      return 'View Completed';
    }

    if (!this.safetyInductions.sokhnaplant.completed) {
      return 'Start Sokhna Plant';
    }

    if (!this.safetyInductions.rmx.completed) {
      return 'Continue RMX';
    }

    return 'Start Sokhna Plant';
  }

  /**
   * Get the next incomplete induction site
   */
  getNextIncompleteInduction(): 'sokhnaplant' | 'rmx' | null {
    if (!this.safetyInductions.sokhnaplant.completed) {
      return 'sokhnaplant';
    }
    if (!this.safetyInductions.rmx.completed) {
      return 'rmx';
    }
    return null;
  }

  /**
   * Get the appropriate link based on induction state
   */
  getSafetyInductionLink(): string {
    const nextIncomplete = this.getNextIncompleteInduction();

    if (this.completedInductionsCount === this.totalInductionsRequired) {
      // Both completed - show congratulations for the last one completed
      return this.safetyInductions.rmx.completed
        ? 'https://mea-hseegyptonboarding-prod.web.app/RMX/congratulations.html'
        : 'https://mea-hseegyptonboarding-prod.web.app/sokhnaplant/congratulations.html';
    }

    if (nextIncomplete === 'sokhnaplant') {
      return this.safetyInductions.sokhnaplant.link;
    }

    if (nextIncomplete === 'rmx') {
      return this.safetyInductions.rmx.link;
    }

    return 'https://mea-hseegyptonboarding-prod.web.app/';
  }

  /**
   * Open modal to show induction details and progress
   */
  async openSafetyInductionModal() {
    const modal = await this.modalController.create({
      component: SafetyInductionModalComponent,
      componentProps: {
        safetyInductions: this.safetyInductions,
        completedCount: this.completedInductionsCount,
        totalRequired: this.totalInductionsRequired
      },
      cssClass: 'safety-induction-modal'
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    // If user clicked a site button, navigate to it
    if (data?.site) {
      const link = data.site === 'sokhnaplant'
        ? this.safetyInductions.sokhnaplant.link
        : this.safetyInductions.rmx.link;
      window.open(link, '_blank');
    }
  }

  /**
   * Handle safety induction card click
   */
  async onSafetyInductionCardClick() {
    if (this.completedInductionsCount === this.totalInductionsRequired) {
      // Both completed - open modal to show progress
      await this.openSafetyInductionModal();
    } else {
      // Navigate to next incomplete induction
      const link = this.getSafetyInductionLink();
      window.open(link, '_blank');
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
      case 'france':
        return 'Bonjour';
      case 'india':
        return 'Namaste';
      case 'cameroon':
      case 'ivory coast':
        return 'Bonjour';
      case 'china':
        return 'Ni Hao';
      case 'egypt':
      case 'iraq':
      case 'qatar':
        return 'Ahlan';
      case 'azerbaijan':
        return 'Salam';
      case 'philippines':
        return 'Mabuhay';
      default:
        return 'Ahlan';
    }
  }

  getDayTitle(date: string): string {
    switch(date) {
      case '2026-08-23':
        return this.userBatch === 'LD'
          ? 'Day 1 – Sunday, August 23, 2026: Orientation & Leadership Kick-Off'
          : 'Day 1 – Sunday, August 23, 2026: Arrival';
      case '2026-08-24':
        return this.userBatch === 'LD'
          ? 'Day 2 – Monday, August 24, 2026: Sokhna Plant Visit & Digital Journey'
          : 'Day 2 – Monday, August 24, 2026: Plant Visit';
      case '2026-08-25':
        return this.userBatch === 'LD'
          ? 'Day 3 – Tuesday, August 25, 2026: NextGen Leadership & Team Effectiveness'
          : 'Day 3 – Tuesday, August 25, 2026: Workshop';
      case '2026-08-26':
        return this.userBatch === 'LD'
          ? 'Day 4 – Wednesday, August 26, 2026: Leading NextGen Performance & Coaching'
          : 'Day 4 – Wednesday, August 26, 2026: Workshop';
      case '2026-08-27':
        return this.userBatch === 'LD'
          ? 'Day 5 – Thursday, August 27, 2026: Vision Presentations, Feedback & Closure'
          : 'Day 5 – Thursday, August 27, 2026: Closure';
      default:
        return date;
    }
  }


  // L&D Schedule Data (AMEA NextGen Plant Manager Program - Cohort 2)
  ldScheduleData: { [date: string]: {
    speaker: string,
    description: string,
    time: string;
    title: string;
    location: string;
    color: string;
  }[] } = {
    "2026-08-23": [
      {
        "time": "08:00 - 08:30",
        "title": "Welcome, Agenda & Expectation Setting",
        "location": "Hotel Venue",
        "color": "schedule-blue",
        "speaker": "Rohit Singh / Mounia",
        "description": "Opening kick-off session and agenda walkthrough."
      },
      {
        "time": "08:30 - 10:00",
        "title": "Cement Manufacturing Strategy & Performance",
        "location": "Hotel Venue",
        "color": "schedule-darkBlue",
        "speaker": "Najib Ribi",
        "description": "Overview of manufacturing strategy and operational performance."
      },
      {
        "time": "10:00 - 11:30",
        "title": "Plant Challenges ",
        "location": "Hotel Venue",
        "color": "schedule-orange",
        "speaker": "Participants",
        "description": "Participant introductions and overview of plant challenges."
      },
      {
        "time": "11:30 - 13:00",
        "title": "People Strategy & Way Forward",
        "location": "Hotel Venue",
        "color": "schedule-blue",
        "speaker": "B K Mishra",
        "description": "Strategic direction for people management and future roadmap."
      },
      {
        "time": "13:00 - 14:00",
        "title": "Lunch Break",
        "location": "Hotel Restaurant",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Midday lunch break."
      },
      {
        "time": "14:00 - 17:00",
        "title": "GALLUP: Kick Off Leadership Session",
        "location": "Hotel Venue",
        "color": "schedule-purple",
        "speaker": "Gallup Trainer",
        "description": "CliftonStrengths 34 Results:\n• Breakdown of the Report & Getting the Most Out of It\n• Putting a Name to your strengths & Claiming Your Power and Edge\n• Aiming your strengths at Plant Leadership"
      },
      {
        "time": "18:00 - 21:00",
        "title": "Outdoor Activity & Official Dinner ",
        "location": "Venue TBD",
        "color": "schedule-green",
        "speaker": "N/A",
        "description": "Team bonding outdoor activity followed by official dinner."
      }
    ],
    "2026-08-24": [
      {
        "time": "08:00 - 09:00",
        "title": "Travel to Sokhna Plant",
        "location": "Sokhna ",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Departure to Sokhna Plant with RMX Plant Visit included."
      },
      {
        "time": "09:00 - 09:30",
        "title": "Welcome to Sokhna Plant",
        "location": "Sokhna Plant",
        "color": "schedule-darkBlue",
        "speaker": "N/A",
        "description": "Welcome session at Sokhna Plant by Egypt Team."
      },
      {
        "time": "09:30 - 13:00",
        "title": "Sokhna Plant Tour & Operational Visit",
        "location": "Sokhna Plant",
        "color": "schedule-darkBlue",
        "speaker": "Egypt Team",
        "description": "Comprehensive guided tour of Sokhna Plant facilities."
   
     },
      
      {
        "time": "13:00 - 14:00",
        "title": "Lunch Break",
        "location": "Sokhna Plant",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Lunch break at Sokhna Plant."
      },
      {
        "time": "14:00 - 15:30",
        "title": "Plant Challenge Progress Review",
        "location": "Sokhna Plant",
        "color": "schedule-orange",
        "speaker": "Participants",
        "description": "4 participant presentations (20 minutes per participant)."
     },
     {
        "time": "15:30 - 16:30",
        "title": "Egypt Team Best Practices & Digital Journey",
        "location": "Sokhna Plant",
        "color": "schedule-blue",
        "speaker": "Egypt Local Team",
        "description": "Focusing on Digital Topics and Industrial Director Journey."
      },
    ],
    "2026-08-25": [
      {
        "time": "08:00 - 13:00",
        "title": "GALLUP: Building NextGen Leaders Competence & Capability",
        "location": "Hotel Venue",
        "color": "schedule-purple",
        "speaker": "Gallup Trainer",
        "description": "• What is great leadership?\n• Connecting CliftonStrengths reports & creating leadership development plans\n• Improving listening skills & receiving/giving feedback\n• Role of Communication in shaping & defining your leadership"
      },
      {
        "time": "13:00 - 14:00",
        "title": "Lunch Break",
        "location": "Hotel Restaurant",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Midday lunch break."
      },
      {
        "time": "14:00 - 16:00",
        "title": "GALLUP: Leadership Team Effectiveness",
        "location": "Hotel Venue",
        "color": "schedule-blue",
        "speaker": "Gallup Trainer",
        "description": "Leading with Holcim Spirit (People, Purpose, Performance):\n• What is required to lead a team to deliver results & drive execution excellence\n• Key learnings from top Plant Managers in Holcim\n• Your Strengths & Leadership Team Effectiveness & Creating a Vision for your Plant"
      },
      {
        "time": "16:00 - 17:30",
        "title": "Plant Challenge Progress Review",
        "location": "Hotel Venue",
        "color": "schedule-orange",
        "speaker": "Participants",
        "description": "4 participant presentations (20 minutes per participant)."
      }
    ],
    "2026-08-26": [
      {
        "time": "08:00 - 13:00",
        "title": "GALLUP: Leading NextGen Performance",
        "location": "Hotel Venue",
        "color": "schedule-purple",
        "speaker": "Gallup Trainer",
        "description": "• Leading the modern workforce & managing your strengths as you lead\n• Becoming a coach & ongoing coaching\n• Coaching conflict & performance-oriented coaching\n• Next steps and commitments"
      },
      {
        "time": "13:00 - 14:00",
        "title": "Lunch Break",
        "location": "Hotel Restaurant",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Midday lunch break."
      },
      {
        "time": "14:00 - 16:00",
        "title": "GALLUP: Coaching Essentials & Practice",
        "location": "Hotel Venue",
        "color": "schedule-blue",
        "speaker": "Gallup Trainer",
        "description": "• Coaching essentials and practical practice\n• Building a strengths-based team\n• Plant placement practice coaching call (15:15 - 15:45)"
      },
      {
        "time": "16:00 - 17:30",
        "title": "Plant Challenge Progress Review",
        "location": "Hotel Venue",
        "color": "schedule-orange",
        "speaker": "Participants",
        "description": "4 participant presentations (20 minutes per participant)."
      },
      {
        "time": "18:00 - 21:00",
        "title": "Official Dinner ",
        "location": "Venue TBD",
        "color": "schedule-green",
        "speaker": "N/A",
        "description": "Evening official dinner."
      }
    ],
    "2026-08-27": [
      {
        "time": "08:00 - 11:30",
        "title": "GALLUP: Participant Vision Presentations (x16)",
        "location": "Hotel Venue",
        "color": "schedule-purple",
        "speaker": "Gallup Trainer / Panel",
        "description": "2 or 3 groups of participants presenting visions based on Holcim Plant Scenarios to a panel made up of course observers, Holcim L&D, and Gallup."
      },
      {
        "time": "11:30 - 13:00",
        "title": "GALLUP: Culture of Engagement & Case Study",
        "location": "Hotel Venue",
        "color": "schedule-blue",
        "speaker": "Gallup Trainer",
        "description": "• Building and Sustaining a Culture of Engagement\n• Holcim Engagement Case Study"
      },
      {
        "time": "13:00 - 14:00",
        "title": "Lunch Break",
        "location": "Hotel Restaurant",
        "color": "schedule-grey",
        "speaker": "N/A",
        "description": "Midday lunch break."
      },
      {
        "time": "14:00 - 16:00",
        "title": "Plant Challenge Progress Review",
        "location": "Hotel Venue",
        "color": "schedule-orange",
        "speaker": "Participants",
        "description": "4 participant presentations (20 minutes per participant)."
      },
      {
        "time": "16:00 - 17:00",
        "title": "Feedback, Way Forward & Closure",
        "location": "Hotel Venue",
        "color": "schedule-darkBlue",
        "speaker": "Rohit Singh / Mounia",
        "description": "Program wrap-up, final feedback, and closing remarks."
      }
    ]
  };

  // Finance Schedule Data
  financeScheduleData: { [date: string]: {
    time: string;
    title: string;
    location: string;
    color: string;
    speaker?: string;
    description?: string;
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


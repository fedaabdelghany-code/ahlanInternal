import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

// In your component.ts
  userEmail: string = '';
  userBatch: 'IC' | 'FINANCE' | 'NONE' = 'NONE';
  
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
    'feda.abdelghany@lafarge.com'

  ];

  financeEmails = [
    'rajesh.sunar@holcim.com',
    'steffen.kindler@holcim.com',
        'emily.elias@lafarge.com',
        'madeleine.you@holcim.com',

  ];

  constructor(private afAuth: AngularFireAuth) {}

  async ngOnInit() {
    await this.loadUserData();
    this.determineBatch();
  }

  async loadUserData(): Promise<void> {
    const user = await firstValueFrom(this.afAuth.authState.pipe(take(1)));
    if (user && user.email) {
      this.userEmail = user.email.toLowerCase();
    }
  }

  determineBatch() {
    const normalizedEmail = this.userEmail.toLowerCase();
    if (this.icEmails.map(e => e.toLowerCase()).includes(normalizedEmail)) {
      this.userBatch = 'IC';
    } else if (this.financeEmails.map(e => e.toLowerCase()).includes(normalizedEmail)) {
      this.userBatch = 'FINANCE';
    } else {
      this.userBatch = 'NONE';
    }
    console.log('[determineBatch] User batch:', this.userBatch, 'for email:', this.userEmail);
  }

  // IC Schedule Data
  icScheduleData: { [date: string]: {
    time: string;
    title: string;
    color: string;
  }[] } = {
    "2025-11-18": [
      { "time": "07:30 - 07:50", "title": "Coffee Break", "color": "schedule-grey" },
      { "time": "07:50 - 08:00", "title": "Safety Induction", "color": "schedule-darkBlue" },
      { "time": "08:00 - 08:15", "title": "Steffen KINDLER Speech", "color": "schedule-blue" },
      { "time": "08:15 - 08:30", "title": "Rajesh SURANA Speech", "color": "schedule-blue" },
      { "time": "08:30 - 08:45", "title": "Egypt CEO Speech", "color": "schedule-blue" },
      { "time": "08:45 - 09:30", "title": "Regional Head of IC Speech – 2025 Initiatives/Achievements", "color": "schedule-darkBlue" },
      { "time": "09:30 - 09:50", "title": "Coffee Break", "color": "schedule-grey" },
      { "time": "09:50 - 11:00", "title": "Atilla PARS & Federico EBERHARDT", "color": "schedule-blue" },
      { "time": "11:00 - 12:00", "title": "MCS 58 - Secure Payment Means", "color": "schedule-orange" },
      { "time": "12:00 - 12:30", "title": "Presenting the Action Plan", "color": "schedule-blue" },
      { "time": "12:30 - 13:15", "title": "Lunch", "color": "schedule-grey" },
      { "time": "13:15 - 14:15", "title": "MCS 12 User Access Review/Cross SOD & MCS 34/35 Inventory/Cross SOD - TIS to ERP", "color": "schedule-orange" },
      { "time": "14:15 - 15:00", "title": "Presenting the Action Plan + Q&A/Comments", "color": "schedule-blue" },
      { "time": "15:00 - 15:15", "title": "Short Break", "color": "schedule-grey" },
      { "time": "15:15 - 16:15", "title": "MCS 57 - Cash Collection & Cash Deposit", "color": "schedule-orange" },
      { "time": "16:15 - 17:00", "title": "Action Plan Presentation + Q&A/Comments", "color": "schedule-blue" },
      { "time": "17:00 - 18:00", "title": "Transfer to Restaurant", "color": "schedule-grey" },
      { "time": "18:00 - 21:00", "title": "Dinner by the Nile", "color": "schedule-green" },
      { "time": "21:00 - 22:00", "title": "Transfer to Hotel", "color": "schedule-grey" }
    ],
    "2025-11-19": [
      { "time": "07:30 - 08:45", "title": "Transfer from JW to SOK Plant", "color": "schedule-grey" },
      { "time": "08:45 - 09:00", "title": "Refreshments", "color": "schedule-grey" },
      { "time": "09:00 - 10:00", "title": "Countries' Best Practices & Upcoming Projects", "color": "schedule-blue" },
      { "time": "10:00 - 11:00", "title": "Wrap Up - Q&A", "color": "schedule-darkBlue" },
      { "time": "11:00 - 11:30", "title": "Refreshments – PPEs", "color": "schedule-grey" },
      { "time": "11:30 - 13:00", "title": "Plant Tour", "color": "schedule-darkBlue" },
      { "time": "13:00 - 14:45", "title": "Transfer to Mena House", "color": "schedule-grey" },
      { "time": "14:45 - 18:00", "title": "Dinner at Mena House", "color": "schedule-green" },
      { "time": "18:00 - 18:15", "title": "Transfer from Mena House to Grand Egyptian Museum", "color": "schedule-grey" },
      { "time": "18:15 - 20:30", "title": "GEM Tour", "color": "schedule-purple" }
    ]
  };

  // Finance Schedule Data
  financeScheduleData: { [date: string]: {
    time: string;
    title: string;
    color: string;
  }[] } = {
    "2025-11-17": [
      { "time": "18:40", "title": "Arrival - Flight LX 4194", "color": "schedule-grey" },
      { "time": "19:30", "title": "Arrival to JW Marriott", "color": "schedule-grey" },
      { "time": "20:30 - 22:30", "title": "Dinner with the Country Leadership Team in Steakhouse JW Marriott", "color": "schedule-green" }
    ],
    "2025-11-18": [
      { "time": "8:00 - 8:15", "title": "Steffen Kindler Speech at the Opening of Internal Control Meeting", "color": "schedule-blue" },
      { "time": "8:15 - 8:30", "title": "Rajesh Surana Speech", "color": "schedule-blue" },
      { "time": "8:30 - 8:45", "title": "Khaled El Dokkani Speech", "color": "schedule-blue" },
      { "time": "9:30", "title": "Departure from JW Marriott", "color": "schedule-grey" },
      { "time": "10:45 - 11:00", "title": "Coffee & PPEs", "color": "schedule-grey" },
      { "time": "11:00 - 13:00", "title": "SOK Plant Tour", "color": "schedule-darkBlue" },
      { "time": "13:00 - 14:00", "title": "Lunch", "color": "schedule-grey" },
      { "time": "14:00 - 15:00", "title": "SOK Plant Projects", "color": "schedule-blue" },
      { "time": "15:00 - 16:00", "title": "Cement Commercial Projects", "color": "schedule-blue" },
      { "time": "16:15 - 17:00", "title": "Business Review for Geocycle & Sustainability", "color": "schedule-darkBlue" },
      { "time": "17:00", "title": "Departure from SOK Plant", "color": "schedule-grey" },
      { "time": "18:10", "title": "Arrival at JW Marriott", "color": "schedule-grey" },
      { "time": "19:00 - 20:30", "title": "Dinner with the CFO and N-1", "color": "schedule-green" }
    ],
    "2025-11-19": [
      { "time": "8:00", "title": "Pick up from JW Marriott", "color": "schedule-grey" },
      { "time": "8:30", "title": "Arrival at Sarai RMX BP", "color": "schedule-grey" },
      { "time": "8:30 - 9:30", "title": "Sarai RMX BP Tour", "color": "schedule-darkBlue" },
      { "time": "9:30 - 10:30", "title": "RMX Strategy", "color": "schedule-blue" },
      { "time": "10:30", "title": "Departure Sarai RMX BP", "color": "schedule-grey" },
      { "time": "11:30", "title": "Arrival at Customer Visit", "color": "schedule-grey" },
      { "time": "11:30 - 13:30", "title": "Commercial Customer Visit", "color": "schedule-green" },
      { "time": "14:30", "title": "Arrival to JW Marriott Hotel", "color": "schedule-grey" },
      { "time": "14:30 - 15:30", "title": "Break", "color": "schedule-grey" },
      { "time": "15:30 - 16:45", "title": "Move from JW Marriott to the Grand Egyptian Museum (GEM)", "color": "schedule-grey" },
      { "time": "16:45 - 18:00", "title": "Touring the GEM", "color": "schedule-purple" },
      { "time": "18:30 - 21:00", "title": "Dinner on the Nile with the Finance Team", "color": "schedule-green" },
      { "time": "21:00 - 21:45", "title": "Arrival at JW Marriott Hotel", "color": "schedule-grey" }
    ],
    "2025-11-20": [
      { "time": "8:00", "title": "Pick up from JW Marriott", "color": "schedule-grey" },
      { "time": "8:30", "title": "Arrival to Lafarge Egypt HQ", "color": "schedule-grey" },
      { "time": "8:30 - 10:00", "title": "Meeting with Finance N-1 & Digital Team", "color": "schedule-blue" },
      { "time": "10:00 - 11:00", "title": "Meeting with Standard Chartered Bank", "color": "schedule-orange" },
      { "time": "11:00 - 11:30", "title": "Coffee Break", "color": "schedule-grey" },
      { "time": "11:30 - 13:00", "title": "Special Edition Town Hall: Meeting with Group CFO & Regional CFO", "color": "schedule-darkBlue" },
      { "time": "13:00 - 14:00", "title": "Lunch with Finance N-1", "color": "schedule-green" },
      { "time": "14:30 - 15:30", "title": "Debrief with KD & AZ", "color": "schedule-blue" },
      { "time": "15:40", "title": "Move from Lafarge Egypt HQ", "color": "schedule-grey" },
      { "time": "16:00 - 18:00", "title": "Break", "color": "schedule-grey" },
      { "time": "18:30 - 21:00", "title": "Dinner with HSBC Bank", "color": "schedule-orange" },
      { "time": "21:30", "title": "Arrive at JW Marriott", "color": "schedule-grey" }
    ],
    "2025-11-21": [
      { "time": "10:30", "title": "Check Out & Pick up from JW Marriott", "color": "schedule-grey" },
      { "time": "11:00", "title": "Arrival at CAI Airport", "color": "schedule-grey" },
      { "time": "13:00", "title": "Departure Flight LX 239", "color": "schedule-grey" }
    ]
  };

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

  getDayTitle(date: string): string {
    if (this.userBatch === 'IC') {
      switch(date) {
        case '2025-11-18':
          return 'Day 1 – Tuesday, November 18, 2025: Internal Control Meeting';
        case '2025-11-19':
          return 'Day 2 – Wednesday, November 19, 2025: SOK Plant & GEM Tour';
        default:
          return date;
      }
    } else {
      switch(date) {
        case '2025-11-17':
          return 'Day 0 – Monday, November 17, 2025: Arrival';
        case '2025-11-18':
          return 'Day 1 – Tuesday, November 18, 2025: Sokhna Plant Visit';
        case '2025-11-19':
          return 'Day 2 – Wednesday, November 19, 2025: RMX & Customer Visit';
        case '2025-11-20':
          return 'Day 3 – Thursday, November 20, 2025: Meeting with HSBC & SCB & Visit Wrap';
        case '2025-11-21':
          return 'Day 4 – Friday, November 21, 2025: Departure';
        default:
          return date;
      }
    }
  }
}



import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom, take } from 'rxjs';
import { ParticipantService } from '../participant.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  // In your component.ts
  userEmail: string = '';
  userBatch: 'LD' | 'FINANCE' | 'NONE' = 'NONE';

  constructor(
    private afAuth: AngularFireAuth,
    private participantService: ParticipantService
  ) { }

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
    this.userBatch = this.participantService.getBatch(this.userEmail);
    console.log('[determineBatch] User batch:', this.userBatch, 'for email:', this.userEmail);
  }

  // L&D Itinerary Data (High-level summary headings & short descriptions)
  ldScheduleData: {
    [date: string]: {
      time: string;
      title: string;
      description?: string;
      speaker?: string;
      color: string;
    }[]
  } = {
    "2026-08-23": [
      {
        "time": "Day 1 – Sunday",
        "title": "Program Start & Gallup Kick-Off",
        "description": "Program starts at 8:00 a.m. in the Hotel Venue. Includes expectation setting, strategy overview, and CliftonStrengths kick-off.",
        "color": "schedule-blue"
      },
      {
        "time": "Evening",
        "title": "Outdoor Activity & Official Dinner ",
        "description": "Team bonding outdoor activity followed by the official opening dinner.",
        "color": "schedule-green"
      }
    ],
    "2026-08-24": [
      {
        "time": "Day 2 – Monday",
        "title": "Sokhna Plant & RMX Visit",
        "description": "Operational plant tour at Sokhna and RMX facility. Please bring your PPE including safety boots.",
        "color": "schedule-darkBlue"
      }
    ],
    "2026-08-25": [
      {
        "time": "Day 3 – Tuesday",
        "title": "Building NextGen Leaders & Team Effectiveness",
        "description": "Gallup leadership competence session, CliftonStrengths development plan, and team effectiveness.",
        "color": "schedule-purple"
      },
      {
        "time": "Afternoon",
        "title": "Gallup Assessment & Leadership Activity",
        "description": "Please bring a printed copy of your Gallup assessment report and connect with your assigned team members.",
        "color": "schedule-orange"
      }
    ],
    "2026-08-26": [
      {
        "time": "Day 4 – Wednesday",
        "title": "Leading NextGen Performance & Coaching",
        "description": "Gallup coaching essentials, building a strengths-based workforce, and performance management.",
        "color": "schedule-purple"
      },
      {
        "time": "Evening",
        "title": "Official Dinner ",
        "description": "Official evening dinner with cohort participants.",
        "color": "schedule-green"
      }
    ],
    "2026-08-27": [
      {
        "time": "Day 5 – Thursday",
        "title": "Performance Challenge & Vision Presentations",
        "description": "Participant vision presentations (2–3 slides covering Objectives, Milestones & Progress), followed by feedback and program closure.",
        "color": "schedule-darkBlue"
      }
    ]
  };

  // Finance Schedule Data
  financeScheduleData: {
    [date: string]: {
      time: string;
      title: string;
      description?: string;
      color: string;
    }[]
  } = {
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

  getDayTitle(date: string): string {
    if (this.userBatch === 'LD') {
      switch (date) {
        case '2026-08-23':
          return 'Day 1 – Sunday, August 23, 2026';
        case '2026-08-24':
          return 'Day 2 – Monday, August 24, 2026';
        case '2026-08-25':
          return 'Day 3 – Tuesday, August 25, 2026';
        case '2026-08-26':
          return 'Day 4 – Wednesday, August 26, 2026';
        case '2026-08-27':
          return 'Day 5 – Thursday, August 27, 2026';
        default:
          return date;
      }
    } else {
      switch (date) {
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



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hse',
  templateUrl: './hse.page.html',
  styleUrls: ['./hse.page.scss'],
  standalone:false
})
export class HsePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

highlights: { title: string; icon: string; texts: string[] }[] = [

 {
    "title": "Critical Risks",
    "icon": "alert-circle-outline",
    "texts": [
      "PSM",
      "82 Closed Findings ",
      ">1.750 MCHF Total Spent since 2022",
      "Zero Overdue Findings",
      "426 Closed on Time",
      "100% Verifications",
      "71% Compliant",
      "119 Critical Controls"
    ]
  },
   {
    "title": "ENGAGEMENT",
    "icon": "people-outline",
    "texts": [
      "BOOTS ON GROUND",
      "1.62 TIFr – 12 Month TIFr Above Target",
    "Actions Identified: 847 (2022) → 6432 (2023) → 9318 (2024)",
    "Consequence Mgmt: 70 (2022) → 760 (2023) → 1796 (2024)",
    "TREASURE HUNT",
    "2 Ranked Teams Worldwide",
    "4000 Observations Resolved",
    "GLOBAL HSE DAYS 2024",
    "1200 Persons"
    ]
  },
  
  {
    "title": "TRAINING",
    "icon": "school-outline",
    "texts": [
      "TRAINING HOURS",
      "3,800 (2022) -> 7,978 (2023) -> 23,966 (2024)",
      "12941 Training Hours for Contractors",
      "12 New Internal Trainers Certified",
      "18 Co-champions Certified (Lifting and WAH)",
      "HSE School at Sokhna Plant"
    ]
  },
  
    {
    "title": "Medical & Health",
    "icon": "medkit-outline",
    "texts": [
      "COMING IN FROM ZERO IN 2022",
      "1206 General Medical Checks",
      "Early Detection & Recovery of: 15 Critical Cases, 140 Moderate, 200 Minor",
      "2181 Specific Medical Checks (Audiometry, Occupational, Respiratory)",
      "2487 Fit-to-Access Tests",
      "14 AEDs Distributed on All Sites",
      "Clinic Rehabilitation – 2nd Tier"
    ]
  },

{
  "title": "ENVIRONMENT",
  "icon": "leaf-outline",
  "texts": [
    "ACROSS 7 PROJECTS",
    "6000 m³ Water Discharge Reduction / Year – Equivalent to 2.5 Olympic-sized Pools",
    "72 tCO₂ Emission Reduction / Year – Equivalent to 1305 Cars Running for a Year",
    "150 T Hazardous Waste Reduction / Year – Equivalent to 2 Fully Loaded Trucks"
  ]
}, 
  {
    "title": "ENERGY ISOLATION",
    "icon": "flash-off-outline",
    "texts": [
      "1808 EI Procedures",
      "18 Training Sessions",
      "2M EGP Budget set for 2025",
      "Prototype EI Booth 2-Year Action Plan Set"
    ]
  },

   {
    "title": "Contractor Management",
    "icon": "briefcase-outline",
    "texts": [
      "4041 Contractors Assessed (50% Rejected)",
      "696 Violations",
      "65 Corrective Actions Identified",
      "37 Post-Job Evaluations"
    ]
  },

];

smartOpsCard = {
  title: "Smart Operations",
  icon: "analytics-outline",
  texts: [
    "59 critical equipment units monitored under M-Predict supervision",
    "Smart Operations Room aggregating POT products",
    "31 Deployed POT products"
  ],
  expanded: false
};

toggleSmartOpsCard() {
  this.smartOpsCard.expanded = !this.smartOpsCard.expanded;
}

didYouKnow: { title: string; icon: string; texts: string[] }[] = [

 {
    "title": "HSE School",
    "icon": "alert-circle-outline",
    "texts": [
      "PSM",
"Broaden training scope to cover diverse competencies",
"Elevate training quality through updated curricula and expert facilitation",
"Integrate hands-on practical training to reinforce skill application" 
    ]
  },
   {
    "title": "AI Violation Detection",
    "icon": "people-outline",
    "texts": [
"Smart Camera safety violations tracker.","Inside cam  for drivers behavior.",
"HSE training platform.",
"HSE performance dashboard."
  ]
  },
  

]

expandedDidYouIndex: number | null = null;
expandedHighlightIndex: number | null = null;

toggleDidYouCard(index: number) {
  this.expandedDidYouIndex = this.expandedDidYouIndex === index ? null : index;
}

toggleHighlightCard(index: number) {
  this.expandedHighlightIndex = this.expandedHighlightIndex === index ? null : index;
}

images = [
  { src: 'assets/sokhna.jpg', alt: 'Sokhna Plant', title: 'Health, Safety & Environment' },
  { src: 'assets/sokhna2.JPG', alt: 'Second View', title: 'Health, Safety & Environment' },
  // { src: 'assets/sokhna3.JPG', alt: 'Third View', title: 'Welcome to Sokhna Plant' }
];

currentImageIndex = 0;


}



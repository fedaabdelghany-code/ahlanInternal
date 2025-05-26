import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sustainability',
  templateUrl: './sustainability.page.html',
  styleUrls: ['./sustainability.page.scss'],
  standalone:false
})
export class SustainabilityPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
didYouKnow: { title: string; icon: string; texts: string[] }[] = [

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
  

];

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


expandedDidYouIndex: number | null = null;
expandedHighlightIndex: number | null = null;

toggleDidYouCard(index: number) {
  this.expandedDidYouIndex = this.expandedDidYouIndex === index ? null : index;
}

toggleHighlightCard(index: number) {
  this.expandedHighlightIndex = this.expandedHighlightIndex === index ? null : index;
}

images = [
  { src: 'assets/sokhna.jpg', alt: 'Sokhna Plant', title: 'Sustainability Starts with Geocycle' },
  { src: 'assets/sokhna2.JPG', alt: 'Second View', title: 'Sustainability Starts with Geocycle' },
];

geocycleScenes = [
  {
    image: 'assets/Sustainabiliy Commitee.JPG',
    title: 'Sustainability Committee',
    caption: 'A quarterly initiative led by Adham El Mahdy to align teams, share updates, and drive unified sustainability efforts across functions.'
  },
  {
    image: 'assets/Nile Clean-up.jpg',
    title: 'Nile Clean-Up',
    caption: 'Geocycle’s commitment to protecting the Nile through organized waste collection, awareness campaigns, and sustainable action in Egypt’s lifeline river.'
  },
  {
    image: 'assets/AUC talk.jpg',
    title: 'AUC Sustainability Talk',
    caption: 'An impactful session by Adham El Mahdy at the American University in Cairo, empowering students with real-world sustainability practices and environmental action.'
  },
  {
    image: 'assets/school.png',
    title: 'School Initiatives',
    caption: 'Educational outreach programs designed to instill awareness about sustainability and waste management among the younger generation.'
  },
   {
    image: 'assets/app.png', 
    title: 'Geocycle B2C App',
    caption: 'Currently in its testing phase, this is a sneak peek of our upcoming recycling app! Users earn points for recycling and help us turn waste into energy — sustainability made rewarding.'
  }
];


currentImageIndex = 0;


}

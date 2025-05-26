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
  "title": "Climate (Decarbonization)",
  "icon": "leaf-outline",
  "texts": [
    "Clinker Factor: Reduced from 83.5% to 71% (−12%) in 4 years",
    "EcoPlant Products: Growth from 11% (2024) to 25% target (2030)",
    "TSR: Increased from 11% to 35% in 4 years",
    "AF Consumption: 425 kt (2024), targeting 550 kt (2025)"
  ]
},

{
  "title": "Climate (Scope 2)",
  "icon": "sunny-outline",
  "texts": [
    "SEEC Reduction: 8.5 kWh/t over 4 years (from 107.6 in 2021 to 99.1 by 2025)",
    "Solar Energy: 17 MWh by End 2027",
    "Waste Heat Recovery (WHR): 22 MWh by End 2028"
  ]
}
,
  {
    "title": "Circular Economy",
    "icon": "sync-outline",
    "texts": [
      "EPR: Awareness building for regulation implementation",
      "10KT successful trial of producing color controlled Calcined Clay in 2024 to scale up to 50 KT in 2025",
      "CDM Trial: 10% aggregate substitution in RMX"
    ]
  },
  {
    "title": "Energy Transition",
    "icon": "flash-outline",
    "texts": [
      "Solar Energy: 17 MW capacity",
      "WHR Capacity: 22 MW",
      "TSR Strategy: 32% (2024) → 72% (2030)"
    ]
  },
  {
    "title": "Nature & People",
    "icon": "people-circle-outline",
"texts": [
  "Bird feeding initiative for migratory birds – The birds you see in the banner above are locally known as Abo Erdan, lovingly nicknamed the farmer's friend!",
  "There is a chicken and duck farm to promote biodiversity on site.",
  "We dont use any fresh water in our Sokhna plant",
  "HSE Programs in Focus",
  "Commitment to Human Rights"
]
  }


];

highlights: { title: string; icon: string; texts: string[] }[] = [

 {
    "title": "CO₂ Reduction",
    "icon": "alert-circle-outline",
    "texts": [
      "17% reduction in emissions — from 720 kg CO₂/t.cm in 2021 to a target of 593 kg CO₂/t.cm by 2025."
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
  { src: 'assets/aboerdan.jpg', alt: 'Sokhna Plant', title: 'Sustainability' },
  { src: 'assets/aboerdan.jpg', alt: 'Second View', title: 'Sustainability' },
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
  },
    {
    image: 'assets/solarLens.jpg',
    title: 'Solar Lenses',
    caption: 'We are exploring solar lenses as a more efficient alternative to traditional solar cells. This could reduce material use and costs while enhancing solar energy capture in compact or specialized setups.'
  },
  
];


currentImageIndex = 0;


}

import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
  
})
export class Tab2Page  {
  showMap = true;

  constructor() {}

  showMapAndInitMap() {
  this.showMap = true;

  // Wait for DOM to render before accessing the map container
}

didYouKnowFacts: { title: string; icon: string; texts: string[] }[] = [

  {
    title: "Plant Equipment",
    icon: "construct-outline",
    texts: [
      "2 crushing lines, each with a capacity of 1300 tph",
      "4 raw mills – total capacity 480 tph",
      "1 pet-coke mill – capacity 100 tph",
      "5 kilns, average output of 5000 tpd",
            "7 cement mills – capacity 1150 tph",
      "14 packing machines – each 100 tph",
      "6 Bulk cement spouts each 100 tph"

    ]
  },
  {
    title: "Plant Capacity",
    icon: "bar-chart-outline",
    texts: [
      "Clinker Production Capacity: 7.5 million tons",
      "Cement Production Capacity: 9.5 million tons",
      "Cement portfolio consisting of 7 products"
    ]
  },
  
  {
    title: "Infrastructure",
    icon: "hardware-chip-outline",
    texts: [
      "10 water wells (37 km from plant)",
      "9 reverse osmosis (RO) units",
      "2 wastewater treatment units (200 m³/day each)",
      "3 transformers, each rated at 90 MVA and 220/11 kV"

    ]

  },
  
  {
    title: "Facilities",
    icon: "business-outline",
    texts: [
      "Four accommodation buildings with 355 rooms for shift workers and daily use.",
      "Plant clinic with a doctor available 24/7 to support employee health and safety",

    ]
  },

  {
  title: "Accreditations",
  icon: "ribbon-outline",
  texts: [
    "ISO 9001:2015 certified for Quality Management Systems",
    "ISO 14001:2015 certified for Environmental Management Systems",
    "ISO 45001:2018 certified for Occupational Health & Safety Management",
    "EPD : Environmental product declaration for all cement products"
  ]
}



 
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

toggleDidYouCard(index: number) {
  this.expandedDidYouIndex = this.expandedDidYouIndex === index ? null : index;
}

images = [
  { src: 'assets/sokhna.jpg', alt: 'Sokhna Plant', title: 'Welcome to Sokhna Plant' },
  { src: 'assets/sokhna2.JPG', alt: 'Second View', title: 'Welcome to Sokhna Plant' },
  // { src: 'assets/sokhna3.JPG', alt: 'Third View', title: 'Welcome to Sokhna Plant' }
];

currentImageIndex = 0;


}

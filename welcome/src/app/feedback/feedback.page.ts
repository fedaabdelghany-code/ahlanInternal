import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  standalone: false
})
export class FeedbackPage {
  data: any[] = [];
  showModal = false;
  selectedImage: string | null = null;
  searchQuery: string = '';

  imageOnlyCards: string[] = [
  'assets/talentSustain2.png',
  'assets/talentSustain1.png'
];


  constructor() {
    this.data = [
  //      {
  //   category: "Industrial",
  //   department: "Maintenance",
  //   creation_date: "2024-03-12",
  //   email: "ahmed.yakout@lafarge.com",
  //   owner: {
  //     name: "Hossam Hassan",
  //     email: "hossam.ibrahim@lafarge.com",
  //     mobile: "01286123806",
  //     image: "assets/mainBurnerOwner.png"
  //   },
  //   bp_name: "RE- Main Burner Outer Pipe",
  //   description: "All main burner spares are sourced from the OEM, but we’ve begun identifying local suppliers that match the original quality and chemical composition.",
  //   solution_steps: [
  //     "Obtained the OEM drawing, engaged multiple suppliers, and conducted site visits to explore local alternatives",
  //     "Ensure local supplier matches OEM quality and composition"
  //   ],
  //   images: [
  //     "assets/mainBurner.png",
  //     "assets/mainBurner2.png"
  //   ],
  //   kpi_impacted: "Cost Reduction",
  //   kpi_units: "Cost Saving",
  //   impact_value: "50 KCHF",
  //   classification: "Reverse Engineering"
  // },
   
]
;


  }

  hasMatches(): boolean {
  for (const department of this.departmentKeys) {
    const filtered = this.groupedData[department].filter(item =>
      item.bp_name.toLowerCase().includes(this.searchQuery?.toLowerCase() || '')
    );
    if (filtered.length > 0) return true;
  }
  return false;
}


  enlargeImage(image: string) {
    this.selectedImage = image;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedImage = null;
  }
  groupedData: { [key: string]: any[] } = {};

ngOnInit() {
  this.groupedData = this.groupByDepartment(this.data);
}

get departmentKeys(): string[] {
  return Object.keys(this.groupedData);
}


groupByDepartment(data: any[]): { [key: string]: any[] } {
  return data.reduce((acc, item) => {
    const dept = item.department || 'Other';
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(item);
    return acc;
  }, {});
}

}

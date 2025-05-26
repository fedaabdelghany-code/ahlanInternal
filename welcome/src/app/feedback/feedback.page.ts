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
{
  "category": "HSE",
  "department": "HSE",
  "creation_date": "2025-05-26",
  "bp_name": "Medical Emergency Response and Health Agenda",
  "description": "Addressing the challenges of limited emergency medical readiness at remote sites through facility upgrades and organizational restructuring.",
  "solution_steps": [
    "Rehabilitated clinic facilities to include physician accommodations for 24/7 onsite support",
    "Provisioned Tier 2 medical equipment to enhance treatment capabilities",
    "Restructured the medical support organization to ensure better response coordination"
  ],
  "images": [
    "assets/medical1.png",
    "assets/medical2.png",
    "assets/medical3.png"
  ],
  "kpi_impacted": "Emergency Medical Readiness",
  "kpi_units": "Coverage & Response Time",
  "impact_value": "24/7 medical coverage, reduced intervention time, expanded support across remote sites",
  "classification": "Health Infrastructure & Emergency Response"
},

{
  "category": "HSE",
  "department": "HSE",
  "creation_date": "2025-05-26",
  "bp_name": "HSE Competency & Qualifications",
  "description": "Standardizing and enhancing HSE competency through comprehensive training, onboarding, and qualification programs for staff and contractors.",
  "solution_steps": [
    "Delivered 23,966 training hours across teams and contractors",
    "Onboarded 12 new internal trainers",
    "Certified 18 co-champions with international credentials",
    "Launched a new HSE onboarding program",
    "Initiated an HSE training school combining theoretical and hands-on training"
  ],
  "images": [
    "assets/qualif1.png",
    "assets/qualif2.png",
    "assets/qualif3.png"
  ],
  "kpi_impacted": "HSE Competency & Training Effectiveness",
  "kpi_units": "Training Hours & Certifications",
  "impact_value": "Enhanced safety culture, improved onboarding consistency, and upskilled workforce",
  "classification": "Training & Development"
},

{
  "category": "HSE",
  "department": "HSE",
  "creation_date": "2025-05-26",
  "bp_name": "Critical Control Management",
  "description": "Boosting compliance and assessor capability within the Critical Control Management (CCM) program to manage high-risk exposures effectively.",
  "solution_steps": [
    "Invested 1.75 M CHF over 24 months targeting Structural Collapse, Machinery, Hot Materials, and other Potentially Uncontrolled Events (PUEs)",
    "Conducted 10 capability workshops sponsored by CEO and EXCO",
    "Implemented country-wide cross verifications to standardize assessments",
    "Installed 5KM of guards, 2KM of rope switches, and 3KM of handrailing",
    "Replaced bypass cooling tower and Main Stack 2 tertiary ducts"
  ],
  "images": [
    "assets/critical1.png",
    "assets/critical2.png",
    "assets/critical3.png",
    "assets/critical4.png"
  ],
  "kpi_impacted": "Critical Risk Compliance & Assessor Capability",
  "kpi_units": "CHF Invested, Physical Controls Installed",
  "impact_value": "Improved compliance, clarified process ownership, and enhanced accountability",
  "classification": "Critical Risk Control"
}



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

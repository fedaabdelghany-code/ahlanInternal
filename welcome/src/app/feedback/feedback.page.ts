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
// Define in your component

scale = 1;
lastScale = 1;
startX = 0;
startY = 0;
moveX = 0;
moveY = 0;

transform = 'scale(1) translate(0px, 0px)';
transition = '';

enlargeImage(img: string) {
  this.selectedImage = img;
  this.showModal = true;
  this.resetZoom();
}

closeModal() {
  this.showModal = false;
  this.resetZoom();
}

resetZoom() {
  this.scale = this.lastScale = 1;
  this.moveX = this.moveY = 0;
  this.updateTransform(true);
}

startTouch(event: TouchEvent) {
  if (event.touches.length === 2) {
    this.transition = '';
    this.lastScale = this.scale;
  } else if (event.touches.length === 1) {
    const touch = event.touches[0];
    this.startX = touch.pageX - this.moveX;
    this.startY = touch.pageY - this.moveY;
  }
}

moveTouch(event: TouchEvent) {
  event.preventDefault();

  if (event.touches.length === 2) {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    const currentDistance = Math.hypot(
      touch2.pageX - touch1.pageX,
      touch2.pageY - touch1.pageY
    );
    const initialDistance = 200; // arbitrary baseline
    this.scale = Math.min(3, Math.max(1, this.lastScale * currentDistance / initialDistance));
    this.updateTransform();
  } else if (event.touches.length === 1) {
    const touch = event.touches[0];
    this.moveX = touch.pageX - this.startX;
    this.moveY = touch.pageY - this.startY;
    this.updateTransform();
  }
}

endTouch(event: TouchEvent) {
  this.lastScale = this.scale;
}

updateTransform(smooth = false) {
  this.transform = `scale(${this.scale}) translate(${this.moveX}px, ${this.moveY}px)`;
  this.transition = smooth ? 'transform 0.3s ease' : '';
}


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
},

{
  "category": "HSE",
  "department": "HSE",
  "creation_date": "2025-05-26",
  "bp_name": "Scope 2 CO2 Emission Reduction - Solar Power Station",
  "description": "Reduction of Scope 2 CO2 emissions through installation of an off-grid photovoltaic solar station for the Learning & Development building at Sokhna Plant.",
  "solution_steps": [
    "Identified the opportunity to reduce Scope 2 emissions at the Sokhna Plant",
    "Designed and planned a 154 KWp off-grid solar PV system",
    "Installed the system to power the Learning & Development building",
    "Commissioned and integrated the solar station into plant operations"
  ],
  "images": [
    "assets/solar.png",
    "assets/solar2.png",
  ],
  "kpi_impacted": "CO2 Emissions Reduction",
  "kpi_units": "Tons of CO2/year",
  "impact_value": "70 tons/year CO2 reduction; 6-year payback on 4.5 MEGP investment",
  "classification": "Sustainability - Energy Transition"
},

{
  "category": "HSE",
  "department": "HSE",
  "creation_date": "2025-05-26",
  "bp_name": "CCM Compliance Journey - Sokhna",
  "description": "Improved Critical Control Management (CCM) compliance in Sokhna by restructuring ownership, conducting assessments, building capabilities, and implementing risk mitigation actions.",
  "solution_steps": [
    "Started year with 64% CCM compliance and identified the need for transformation",
    "Reviewed PUE owners’ organization and developed capabilities via 8 extensive workshops",
    "Conducted country-wide CCM gap assessment and identified necessary corrective actions",
    "Collected financial data and set required budgets for key risk areas",
    "Established monthly follow-up governance with sponsors",
    "Reviewed and updated more than 60 procedures",
    "Implemented validation checks for all verifications",
    "Held ExCO HSE workshop with country leadership team",
    "Executed 3 cross-country CCM audits"
  ],
  "images": [
    "assets/ccm1.png",
    "assets/ccm2.png",
    "assets/ccm3.png",
    "assets/ccm4.png",
    "assets/ccm5.png",
    "assets/ccm6.png",
    

  ],
  "kpi_impacted": "CCM Compliance",
  "kpi_units": "Compliance %, Man-days, Actions Closed",
  "impact_value": "96% compliance (from 64%) – 50 people, 270 man-days, 216 actions closed. Structural Collapse (30mEGP): Cooling tower & Elbow K3&4 replaced, 3 stacks reinforced, Tertiary duct at K4 replaced. Hazardous Energy (5.8mEGP): 5800m guards, 8000 clamps, 85 rope switches over 2000m. Fall from Height (4.6mEGP): 3000m mesh, 481 ladder doors, 1500m handrails, 14 life wires. Hot Meal (4.5mEGP), Liquid Fuel Fire (2.7mEGP), Mobile Equipment (2.4mEGP).",
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

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
    category: "Industrial",
    department: "Maintenance",
    creation_date: "2024-03-12",
    email: "ahmed.yakout@lafarge.com",
    owner: {
      name: "Hossam Hassan",
      email: "hossam.ibrahim@lafarge.com",
      mobile: "01286123806",
      image: "assets/mainBurnerOwner.png"
    },
    bp_name: "RE- Main Burner Outer Pipe",
    description: "All main burner spares are sourced from the OEM, but we’ve begun identifying local suppliers that match the original quality and chemical composition.",
    solution_steps: [
      "Obtained the OEM drawing, engaged multiple suppliers, and conducted site visits to explore local alternatives",
      "Ensure local supplier matches OEM quality and composition"
    ],
    images: [
      "assets/mainBurner.png",
      "assets/mainBurner2.png"
    ],
    kpi_impacted: "Cost Reduction",
    kpi_units: "Cost Saving",
    impact_value: "50 KCHF",
    classification: "Reverse Engineering"
  },
   {
    category: "Industrial",
    department: "Maintenance",
    creation_date: "2025-01-21",
    email: "ahmed.yakout@lafarge.com",
    owner: {
      name: "Hossam Hassan",
      email: "hossam.ibrahim@lafarge.com",
      mobile: "01286123806",
      image: "assets/mainBurnerOwner.png"
    },
    bp_name: "RE- Dip tube plates for cyclone 2",
    description: "Worn dip tube plates requiring immediate replacement to avoid downtime.",
    solution_steps: [
      "Initiated campaign to identify certified local suppliers",
      "Obtained OEM drawing and conducted site visits"
    ],
    images: [
      "assets/diptube1.png",
      "assets/diptube2.png"
    ],
    kpi_impacted: "Cost Reduction",
    kpi_units: "Yearly",
    impact_value: "25 KCHF",
    classification: "Reverse Engineering"
  },

  {
    category: "Industrial",
    department: "Maintenance",
    creation_date: "2025-03-10",
    email: "ahmed.yakout@lafarge.com",
    owner: {
      name: "Hossam Hassan",
      email: "hossam.ibrahim@lafarge.com",
      mobile: "01286123806",
      image: "assets/mainBurnerOwner.png"
    },
    bp_name: "RE- lances for GCT Condition Tower",
    description: "Efforts to identify local suppliers for water lances.",
    solution_steps: [
      "Obtained OEM drawing, engaged suppliers, and visited sites",
      "Ensure local supplier matches OEM quality and compatibility"
    ],
    images: [
      "assets/lances1.png",
      "assets/lances2.png"
    ],
    kpi_impacted: "Cost Reduction",
    kpi_units: "Yearly",
    impact_value: "58 KCHF",
    classification: "Reverse Engineering"
  },
  {
    category: "Industrial",
    department: "Maintenance",
    creation_date: "2025-03-09",
    email: "ahmed.yakout@lafarge.com",
    owner: {
      name: "Ayman Nasser",
      email: "ayman.elmaazawy@lafarge.com",
      mobile: "01203132111",
      image: ""
    },
    bp_name: "RE- Packing for Tertiary Air duct",
    description: "Efforts to source TAD packing locally due to its criticality.",
    solution_steps: [
      "OEM drawing obtained, suppliers engaged, site visits done",
      "Third party testing for material"
    ],
    images: [
      "assets/tertiaryAirDuct1.png",
      "assets/tertiaryAirDuct2.png"
    ],
    kpi_impacted: "Cost Reduction",
    kpi_units: "Cost 78%",
    impact_value: "35 KCHF",
    classification: "Reverse Engineering"
  },
  // {
  //   category: "Industrial",
  //   department: "Production",
  //   creation_date: "2024-10-20",
  //   email: "badawy.ahmed@lafarge.com",
  //   owner: {
  //     name: "Badawy Ahmed",
  //     email: "badawy.ahmed@lafarge.com",
  //     mobile: "01279495017",
  //     image: ""
  //   },
  //   bp_name: "PPE for Hot material management",
  //   description: "To comply with requirement for hot material management our patroller must have his own thermal suite from supplier that provide this requirement",
  //   solution_steps: [
  //     "Determine Iso code and requirement for suite",
  //     "Select supplier which have this thermal suite.",
  //     "Pursue thermal suite from provided company",
  //     "Give personal suite to everyone from patroller"
  //   ],
  //   images: [
  //     "https://drive.google.com/open?id=154wdkVL_V2ny-PC4tTeP4muux0yVPHuY",
  //     "https://drive.google.com/open?id=1nFlOfPSqxiVYVDb6ouBluIh9xL9IN0r6"
  //   ],
  //   kpi_impacted: "Improve Safety",
  //   kpi_units: "Zero incident",
  //   impact_value: null,
  //   classification: "Reverse Engineering"
  // },
  
  {
    category: "Industrial",
    department: "Maintenance",
    creation_date: "2025-03-04",
    email: "ahmed.yakout@lafarge.com",
    owner: {
      name: "Mohamed Elzyatte",
      email: "Mohamed.elzyatte@lafarge.com",
      mobile: "01207771038",
      image: "assets/blowBarOwner.png"
    },
    bp_name: "RE- Blow Bar of Impact Crusher",
    description: "Seeking local suppliers for critical impact crusher spares.",
    solution_steps: [
      "Obtained OEM specs and drawings",
      "Identified suppliers with required metallurgy capabilities",
      "Prototyping and testing under supervision"
    ],
    images: [
      "assets/blowBar1.png",
      "assets/blowBar2.png"
    ],
    kpi_impacted: "Cost Reduction",
    kpi_units: "Annual",
    impact_value: "40 KCHF",
    classification: "Reverse Engineering"
  },

  {
  category: "Industrial",
  department: "Maintenance",
  creation_date: "2025-02-11",
  email: "ahmed.yakout@lafarge.com",
  owner: {
    name: "Mohamed Elbasha",
    email: "mohamed.elbasha@lafarge.com",
    mobile: "01283872555",
    image: "assets/bagHouseMemOwner.png"
  },
  bp_name: "RE- Bag House Membranes",
  description: "Due to the long lead time and fluctuating consumption of bag filter membranes, we obtained the OEM drawing and initiated a search for local suppliers. The goal is to secure alternatives with matching quality, reduced lead time, and better local availability to meet operational demands.",
  solution_steps: [
    "We obtained the OEM drawing, engaged multiple suppliers, and conducted site visits to explore local alternatives, ensuring feasibility and quality compliance",
    "The local supplier will provide spares that match the original in both quality and chemical composition, ensuring reliable performance and compatibility."
  ],
  images: [
    "assets/bagHouseMem1.png",
    "assets/bagHouseMem2.png",
    "assets/bagHouseMem3.png"
  ],
  kpi_impacted: "Cost Reduction",
  kpi_units: "Yealy",
  impact_value: "44 KCHF",
  classification: "Reverse Engineering"
},
  // {
  //   category: "Industrial",
  //   department: "Performance & Digital",
  //   creation_date: "2025-03-12",
  //   email: "mohamed.mosa@lafarge.com",
  //   owner: {
  //     name: "Mohamed Ramadan",
  //     email: "mohamed.mosa@Lafarge.com",
  //     mobile: "01275591227",
  //     image: "https://drive.google.com/open?id=1RyyAWuP4DzHxm7U2qtEQJ5geBUMnU61l"
  //   },
  //   bp_name: "EL Sokhna CM5 Fineness prediction",
  //   description: "Fineness Prediction for CEM IV type for Cement Mill No. 5",
  //   solution_steps: [
  //     "Gathering Historical Data for 2 years hourly",
  //     "Train the model and choose the appropriate model with lower error",
  //     "Deploy the model on the EDGE and connected with the TIS"
  //   ],
  //   images: [
  //     "https://drive.google.com/open?id=1s8lZm4xSTrM_dKD2VHLoeqc-yT-OtOtC",
  //     "https://drive.google.com/open?id=1UXQiMX6cq2ozHmH8Y2sFOZBGDymGNTbP"
  //   ],
  //   kpi_impacted: "Product Quality control",
  //   kpi_units: "150 KCHF cost avoidance",
  //   impact_value: null,
  //   classification: "New Innovation"
  // },
 {
    category: "Industrial",
    department: "Maintenance",
    creation_date: "2025-03-13",
    email: "ahmed.yakout@lafarge.com",
    owner: {
      name: "Mohamed Elzyatte",
      email: "Mohamed.elzyatte@lafarge.com",
      mobile: "01207771038",
      image: "assets/blowBarOwner.png"
    },
    bp_name: "RE- Upper Bush For Dynamic Separator",
    description: "Frequent incidents of high wear on the upper bush of the dynamic separator have caused misalignment, affecting its operation. Due to the long OEM delivery time (over six months), we stopped the separator, obtained its drawing, and engaged multiple suppliers. Site visits were conducted to explore local alternatives, ensuring feasibility and quality compliance",
    solution_steps: [
      "We obtained the OEM drawing, engaged multiple suppliers, and conducted site visits to explore local alternatives, ensuring feasibility and quality compliance",
      "The local supplier will provide spares that match the original in both quality and chemical composition, ensuring reliable performance and compatibility."
    ],
    "images": [
      "assets/upperBush1.png",
      "assets/upperBush2.png"
    ],
    kpi_impacted: "Cost Reduction",
    kpi_units: "Yearly",
    impact_value: "3.8 KCHF",
    classification: "Reverse Engineering"
  },
  

  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2024-11-19",
    "email": "ahmed.yakout@lafarge.com",
    "owner": {
      "name": "Hossam Hassan",
      "email": "hossam.ibrahim@lafarge.com",
      "mobile": "01286123806",
      "image": "assets/mainBurnerOwner.png"
    },
    "bp_name": "RE- Poldos expansion joints",
    "description": "Due to the long delivery time and high cost for new expansion joints for poldos (kiln feed) from the OEM, we successfully fabricate it locally with a new design of ST.ST below and it is in operation for more than 6 months",
    "solution_steps": [
      "Fabricate poldos expansion joints locally.",
      "Avoid any effect of Kiln feed",
      "Prevent any unplanned shutdown",
      "Ensured the continued safe and reliable operation of the Kiln feeding"
    ],
    "images": [
      "assets/poldos1.png",
      "assets/poldos2.png",
      "assets/poldos3.png"
    ],
    "kpi_impacted": "Cost Reduction",
    "kpi_units": "Yearly",
    "impact_value": "36 KCHF",
    "classification": "Reverse Engineering"
  },
  
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2025-02-03",
    "email": "ahmed.yakout@lafarge.com",
    "owner": {
      "name": "Hossam Hassan",
      "email": "hossam.ibrahim@lafarge.com",
      "mobile": "01286123806",
      "image": "assets/mainBurnerOwner.png"
    },
    "bp_name": "RE- Trough Chain Sprocket for RDF",
    "description": "The Trough Chain Sprocket has always been sourced from OEM Schenck, but long lead times and lack of technical data have been ongoing issues. After supplying it once and creating our own drawings, we began searching for local suppliers with shorter lead times and matching quality to prevent RDF line stoppages.",
    "solution_steps": [
      "We obtained the OEM drawing, engaged multiple suppliers, and conducted site visits to explore local alternatives, ensuring feasibility and quality compliance",
      "The local supplier will provide spares that match the original in both quality and chemical composition, ensuring reliable performance and compatibility"
    ],
    "images": [
      "assets/troughChain1.png",
      "assets/troughChain2.png"
    ],
    "kpi_impacted": "Cost Reduction",
    "kpi_units": "Unit",
    "impact_value": "14 KCHF",
    "classification": "Reverse Engineering"
  },
   {
    category: "Industrial",
    department: "Maintenance",
    creation_date: "2024-02-13",
    email: "ahmed.yakout@lafarge.com",
    owner: {
      name: "Ayman Nasser",
      email: "ayman.elmaazawy@lafarge.com",
      mobile: "01203132111",
      image: ""
    },
    bp_name: "RE- Kiln Inlet Seal",
    description: "The kiln inlet seal prevents cold air infiltration, reducing fuel costs while accommodating kiln movement. Persistent issues with material spillage and false air have increased STEC for the plant. Initially a CAPEX item supplied annually by the OEM, we developed our own drawings and began searching for local suppliers with shorter lead times and equivalent quality to ensure uninterrupted operation across four production lines",
    solution_steps: [
      "We obtained the OEM drawing, engaged multiple suppliers, and conducted site visits to explore local alternatives, ensuring feasibility and quality compliance",
      "The local supplier will provide spares that match the original in both quality and chemical composition, ensuring reliable performance and compatibility"
    ],
    images: [
      "assets/kilnSeal1.png",
      "assets/kilnSeal2.png"
    ],
    kpi_impacted: "STEC",
    kpi_units: "Yearly",
    impact_value: "45 KCHF",
    classification: "Reverse Engineering"
  },
  {
  category: "Industrial",
  department: "Maintenance",
  creation_date: "2025-03-17",
  email: "ahmed.yakout@lafarge.com",
  owner: {
    name: "Mohamed Elzyatte",
    email: "Mohamed.elzyatte@lafarge.com",
    mobile: "01207771038",
    image: "assets/blowBarOwner.png"
  },
  bp_name: "RE- Blower Drive Shaft Bushing",
  description: "Hibon, the OEM supplier for Hibon blowers, is now obsolete, yet over 20 units remain in service. After developing our own drawings, we launched a search for local suppliers with shorter lead times and equivalent quality to prevent blower failures and ensure uninterrupted operation across four production lines",
  solution_steps: [
    "We obtained the OEM drawing, engaged multiple suppliers, and conducted site visits to explore local alternatives, ensuring feasibility and quality compliance",
    "The local supplier will provide spares that match the original in both quality and chemical composition, ensuring reliable performance and compatibility."
  ],
  images: [
    "assets/shaftBushing1.png",
    "assets/shaftBushing2.png"
  ],
  kpi_impacted: "Cost Reduction",
  kpi_units: "Yearly",
  impact_value: "18 KCHF",
  classification: "Reverse Engineering"
}
,
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2025-01-15",
    "email": "ahmed.yakout@lafarge.com",
    "owner": {
      "name": "Mohamed Elzyatte",
      "email": "Mohamed.elzyatte@lafarge.com",
      "mobile": "01207771038",
      "image": "assets/blowBarOwner.png"
    },
    "bp_name": "RE- Impact Bar of Belts Damping",
    "description": "Impact Bars for belt discharge chutes have traditionally been sourced from OEM Tip Top, but long lead times and limited technical data have caused challenges. After supplying them once and developing our own drawings, we initiated a search for local suppliers with shorter lead times and equivalent quality to prevent conveyor belt cuts in the crusher area, avoiding stoppages in two production lines",
    "solution_steps": [
      "We obtained the OEM drawing, engaged multiple suppliers, and conducted site visits to explore local alternatives, ensuring feasibility and quality compliance",
      "The local supplier will provide spares that match the original in both quality and chemical composition, ensuring reliable performance and compatibility."
    ],
    "images": [
      "assets/impactBar1.png",
      "assets/impactBar2.png"
    ],
    "kpi_impacted": "Cost Reduction",
    "kpi_units": "Yearly",
    "impact_value": "11 KCHF",
    "classification": "Reverse Engineering"
  },
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2025-01-01",
    "email": "ahmed.yakout@lafarge.com",
    "owner": {
      "name": "Abd El-Aziz Ali",
      "email": "abdelaziz.ali@lafarge.com",
      "mobile": "01282006801",
      "image": "assets/sealCementMillsOwner.png"
    },
    "bp_name": "RE- Intel Y - Seal of Cement Mills",
    "description": "Y Seal has traditionally been sourced from the OEM, but efforts are now underway to identify local suppliers that can match its original quality and chemical composition. Given its critical role in Cement Mill operations and its low replacement rate due to sensitivity, securing a reliable local alternative is essential",
    "solution_steps": [
      "We obtained the OEM drawing, engaged multiple suppliers, and conducted site visits to explore local alternatives, ensuring feasibility and quality compliance",
      "The local supplier will provide spares that match the original in both quality and chemical composition, ensuring reliable performance and compatibility."
    ],
    "images": [
      "assets/sealCementMills1.png",
      "assets/sealCementMills2.png",

    ],
    "kpi_impacted": "Cost Reduction",
    "kpi_units": "Yearly",
    "impact_value": "16 KCHF",
    "classification": "Reverse Engineering"
  },
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2025-01-08",
    "email": "ahmed.yakout@lafarge.com",
    "owner": {
      "name": "Abd El-Aziz Ali",
      "email": "abdelaziz.ali@lafarge.com",
      "mobile": "01282006801",
      "image": "assets/sealCementMillsOwner.png"
    },
    "bp_name": "RE- Intel Expansion Joint of Ibau Pump",
    "description": "The Expansion Joint of the Ibau Pump for the coal mill was sourced from the OEM, but we are now seeking local suppliers with matching quality and composition to ensure reliability",
    "solution_steps": [
      "We obtained the OEM drawing, engaged multiple suppliers, and conducted site visits to explore local alternatives, ensuring feasibility and quality compliance",
      "The local supplier will provide spares that match the original in both quality and chemical composition, ensuring reliable performance and compatibility."
    ],
    "images": [
      "assets/ibauPump.png",
    ],
    "kpi_impacted": "Cost Reduction",
    "kpi_units": "Yearly",
    "impact_value": "13 KCHF",
    "classification": "Reverse Engineering"
  },
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2024-06-11",
    "email": "ahmed.yakout@lafarge.com",
    "owner": {
      "name": "Ahmed Yakout",
      "email": "ahmed.yakout@lafarge.com",
      "mobile": "01229198700",
      "image": "assets/notifOwner.png"
    },
    "bp_name": "MMS- Aging Notification",
    "description": "Aging Notification is one of the performance indicators for maintenance and impacts IPB. This KPI focuses on a critical gap in the maintenance process: no work order is created, and notifications remain open for more than 10 days without action. Notifications are triggered but not acted upon.",
    "solution_steps": [
      "Notifications via Weekly Dashboards and the Mean Time Between Failures (MTBF)",
      "Weekly review of unconverted notifications",
      "Continuous Improvement for the maintenance performance"
    ],
    "images": [
      "assets/notif1.png",
    ],
    "kpi_impacted": "MTBF",
    "kpi_units": "Daily",
    "impact_value": "Increase MTBF",
    "classification": "Reverse Engineering"
  },
   {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2025-01-01",
    "email": "ahmed.yakout@lafarge.com",
    "owner": {
      "name": "Amr Attia",
      "email": "amr.attia@lafarge.com",
      "mobile": "01288803366",
      "image": "assets/workOrderQualityOwner.png"
    },
    "bp_name": "MMS- Work Order Quality Tracking",
    "description": "Weekly dashboard for Maintenance Work Order (WO) Quality Tracking to ensuring that your maintenance orders quality and the effectiveness of it",
    "solution_steps": [
      "Ensure high quality of maintenance execution",
      "Improves Planning and Scheduling Accuracy",
      "Improves Communication Between Maintenance & Other Departments",
      "Key Metrics to Track on a WO Quality Dashboard",
      "Work order description",
      "Work order function location",
      "Location",
      "Wo Scheduling",
      "Wo Priority"
    ],
    "images": [
      "assets/workOrderQuality1.png",
      "assets/workOrderQuality2.png"
    ],
    "kpi_impacted": "MTBF",
    "kpi_units": "Weekly",
    "impact_value": "Improve MTBF",
    "classification": "New Inovation"
  },

  {
  "category": "Industrial",
  "department": "Maintenance",
  "creation_date": "2024",
  "email": "ibrahim.aboghanima@lafarge.com",
  "owner": {
    "name": "Ibrahim Abo Ghanima",
    "email": "ibrahim.aboghanima@lafarge.com",
    "mobile": "01206668270",
    "image": "assets/shutdownMaintOwner.png"
  },
  "bp_name": "Shutdown Management",
  "description": "Implementing Shutdown Management Process by encompassing five phases: Shutdown Definition, Planning to After Action Review), ensure that shutdowns are managed effectively, reducing risks and maximizing operational efficiency.\n\nTo ensure effective execution and continuous improvement, each shutdown is approached as a project, managed with the Project Management Approach (PMA) tool, thereby fostering structured planning, accountability, and comprehensive post-shutdown analysis",
  "solution_steps": [
    "Clearly define shutdown's purpose, scope, and success criteria to align expectations and guide planning.",
    "Develop a detailed work plan, secure resources, assess risks, and schedule all shutdown activities to ensure safe and efficient execution.",
    "Carry out shutdown tasks according to plan while monitoring safety, quality, and progress.",
    "Controlled Cold run process, functional checks, and process validation before startup.",
    "Evaluate shutdown performance, lessons learned, and improve future shutdown processes through structured feedback."
  ],
  "images": [
    "assets/shutdownMaint1.png", "assets/shutdownMaint2.png"
  ],
  "kpi_impacted": "MTBF, NAI",
  "kpi_units": "",
  "impact_value": " MTBF of Kilns 820 Hrs, NAI of Kilns 92% ",
  "classification": ""
}
,

{
  "category": "Industrial",
  "department": "Maintenance",
  "creation_date": "May-2025",
  "email": "ramy.mostafa@lafarge.com",
  "owner": {
    "name": "Ramy Mostafa",
    "email": "ramy.mostafa@lafarge.com",
    "mobile": "01282901373",
    "image": "assets/groupAwardedOwner.png"
  },
  "bp_name": "Group Awarded: Security Safe Substations",
  "description": "Address the inefficient access control to our 26 electrical substations which was based on manual key access and with no real-time monitoring or fire safety integration.",
  "solution_steps": ["Introduced a digital access system controlled via smartphone app.",
"Unique access tokens with push notifications for administrators.",
"Added environmental monitoring and fire alarm integration."],
  "images": ["assets/groupAwarded.png"],
  "kpi_impacted": "HSE Standards",
  "kpi_units": "",
  "impact_value": "Digital access, Environmental monitoring",
  "classification": ""
},

  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2025-04-15",
    "email": "amr.abdelghany@lafarge.com",
    "owner": {
      "name": "Ramy Mostafa",
      "email": "ramy.mostafa@lafarge.com",
      "mobile": "01282901373",
      "image": "assets/groupAwardedOwner.png"
    },
    "bp_name": "Electrical Rooms Digital Access Control",
    "description": "Control the access control rooms for authorized electricians and electrical engineers, monitor status of electrical rooms and follow up all events and access registers through online monitoring and mobile access",
    "solution_steps": [
      "Access control magnetic locks installation",
      "Remote tool accessibility for assigned authorized electrical engineers",
      "Temperature and humidity monitoring system through digital tool"
    ],
    "images": [
      "assets/digitalAccess1.png",
      "assets/digitalAccess2.png",
      "assets/digitalAccess3.png",
      "assets/digitalAccess4.png",

    ],
    "kpi_impacted": "electrical work safe place",
    "kpi_units": "",
    "impact_value": "zero violations",
    "classification": "New Inovation"
  },
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2025-05-01",
    "email": "amr.abdelghany@lafarge.com",
    "owner": {
      "name": "Amr Abdelghany",
      "email": "amr.abdelghany@lafarge.com",
      "mobile": "01206668268",
      "image": "assets/hvOwner1.png"
    },
    "bp_name": "Zone Energy Isolation Stations",
    "description": "Build energy isolation station for kiln and RM area for major equipment that simplify the process of energy isolation, optimize usage of padlocks, organized place for EI tools and control of group isolation and more focus on how to use the locks onsite",
    "solution_steps": [
      "Select suitable location to locate the station",
      "Usage of old caravan and rehabilitate to be suitable for the station",
      "Install padlock boxes and learning posters",
      "Identify each padlock for specific equipment which will be isolated",
      "Control issue of Equipment padlocks"
    ],
    "images": [
      "assets/zoneEnergy1.png",
      "assets/zoneEnergy2.png",
      "assets/zoneEnergy3.png",
      "assets/zoneEnergy4.png"
    ],
    "kpi_impacted": "World class Level (400 padlock consumption/year)",
    "kpi_units": "",
    "impact_value": "2100 chf",
    "classification": "New Inovation"
  },

  {
  "category": "Industrial",
  "department": "Maintenance",
  "creation_date": "2025-04-01",
  "email": "amr.abdelghany@lafarge.com",
  "owner": {
    "name": "Amr Abdelghany, Amr El Fouly",
    "email": "amr.abdelghany@lafarge.com, amr.fouly@lafarge.com",
    "mobile": "01206668268, 01282040512",
    "image": "assets/hvOwner2.png"
  },
  "bp_name": "HV Arc Flash Elimination",
  "description": "Risk of arc flash during rackin/rackout MV circuit breakers inside electrical room as the operation are done opposite directly to the MV circuit breakers. The solution is to build remote start/stop inside the electrical room but away from confronting the circuit breakers.",
  "solution_steps": [
    "Build start/stop control through HMI operation in a place away from the circuit breaker",
    "Create SOP to operate the CBs from the new HMI",
    "Opportunity to operate CBs from mobile devices from inside the electrical room as a second remote solution",
    "Full monitoring for the CB operation from the HMI"
  ],
  "images": [
    "assets/hv1.png",
    "assets/hv2.png",
    "assets/hv3.png",
    "assets/hv4.png"
  ],
  "kpi_impacted": "Decrease LTIFR due to electrical arc flash incidents",
  "kpi_units": "",
  "impact_value": "Zero Incident",
  "classification": "HSE Standards"
}
,
  {
    category: "Industrial",
    department: "Maintenance",
    creation_date: "2025-05-14",
    email: "mohamed.nasr@lafarge.com",
    owner: {
      name: "Mohamed Ahmed Abdelrazek",
      email: "mohamed.nasr@lafarge.com",
      mobile: "01093458924",
      image: "assets/dewPointOwner.png"
    },
    bp_name: "Dew Point Measure - Portable Solution",
    description: "As part of our digital transformation strategy, we developed a portable, user-friendly dew point monitoring device with real-time data logging and analytics. This solution enhances compressed air quality control and supports predictive maintenance. It addresses recurring issues such as moisture ingress and frequent PDP sensor failures—previously caused by silica gel degradation—helping avoid annual replacement costs of 55 KCHF and reducing downtime across 10 dryers.",
    solution_steps: [
      "Design of electronic circuit and PCB.",
      "Development of embedded firmware.",
      "Development of offline-accessible web-page interface for real-time monitoring.",
      "Assembly of all hardware components.",
      "Functional testing of the complete device.",
      "Accuracy validation and sensor calibration.",
      "User testing for portability and ease of installation."
    ],
    images: [
      "assets/dewPoint1.png",
      "assets/dewPoint2.png",
      "assets/dewPoint3.png",
    ],
    kpi_impacted: "Cost Reduction",
    kpi_units: "KCHF",
    impact_value: "55",
    classification: "New Innovation"
  },
{
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2024-10-01",
    "email": "mohamed.nasr@lafarge.com",
    "owner": {
      "name": "Mohamed Ahmed Abdelrazek",
      "email": "mohamed.nasr@lafarge.com",
      "mobile": "01093458924",
      "image": "assets/falseAirOwner.png"
    },
    "bp_name": "False Air Detection-Solution",
    "description": "As part of our energy saving strategy, we developed an advanced O₂ measurement system to detect false air in process lines. With real-time monitoring and CCR integration, the system optimizes combustion, reducing fuel consumption by 2–3% for every 1% of false air detected. This delivers significant energy savings while improving clinker quality, lowering emissions, and enhancing operational efficiency.",
    "solution_steps": [
      "Design of custom PCB.",
      "Selection of precise components including the Siemens chemical cell for accurate O₂ detection.",
      "Embedded Programming of microcontroller.",
      "Assembly of all electronic components.",
      "Parallel testing with an existing industrial O₂ analyzer.",
      "On-site testing under actual plant conditions."
    ],
    "images": [
      "assets/falseAir1.png",
      "assets/falseAir2.png",
      "assets/falseAir3.png",
      "assets/falseAir4.png",
      "assets/falseAir5.png"
    ],
    "kpi_impacted": "Cost Reduction",
    "kpi_units": "KCHF",
    "impact_value": "19",
    "classification": "New Inovation"
  },
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2024-12-01",
    "email": "mohamed.nasr@lafarge.com",
    "owner": {
      "name": "Mohamed Ahmed Abdelrazek",
      "email": "mohamed.nasr@lafarge.com",
      "mobile": "01093458924",
      "image": "assets/dewPointOwner.png"
    },
    "bp_name": "Portable O2 Measure - Solution",
    "description": "A portable O₂ measurement device was developed for fast, accurate analysis across plant locations. Featuring a Siemens sensor, custom PCB, and real-time monitoring software, it reduces manual testing and downtime—delivering cost savings through improved efficiency and energy control.",
    "solution_steps": [
      "All hardware and software were developed in-house:",
      "Component selection.",
      "Firmware programming.",
      "System assembly.",
      "Validation through side-by-side comparison with certified analyzers."
    ],
    "images": [
      "assets/o2Measure1.png",
      "assets/o2Measure2.png"
    ],
    "kpi_impacted": "Cost Reduction",
    "kpi_units": "CHF / Unit",
    "impact_value": "500",
    "classification": "Reverse Engineering"
  },
   {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2025-02-01",
    "email": "mohamed.nasr@lafarge.com",
    "owner": {
      "name": "Mohamed Ahmed Abdelrazek",
      "email": "mohamed.nasr@lafarge.com",
      "mobile": "01093458924",
      "image": "assets/dewPointOwner.png"
    },
    "bp_name": "Gas Analyser O2 Measure-Solution",
    "description": "As part of our cost-saving strategy, we developed an O₂ analysis unit as a low-cost alternative to the Siemens Oxymat system. Using a high-precision Siemens sensor, custom PCB, and optimized firmware, the unit enables direct drop-in replacement without modifications—reducing maintenance costs and upgrade complexity.",
    "solution_steps": [
      "All hardware and software were developed in-house:",
      "Component selection.",
      "Firmware programming.",
      "System assembly.",
      "Validation through side-by-side comparison with certified Portable analyzers."
    ],
    "images": [
      "assets/gasAnalyzer1.png",
      "assets/gasAnalyzer1.png",
    ],
    "kpi_impacted": "Cost Reduction",
    "kpi_units": "KCHF annually",
    "impact_value": "28",
    "classification": "Reverse Engineering"
  },
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2025-02-01",
    "email": "ahmed.rakha@lafarge.com",
    "owner": {
      "name": "Ahmed Rakha",
      "email": "ahmed.rakha@lafarge.com",
      "mobile": "+201276380885",
      "image": "assets/dryerRehabOwner.png"
    },
    "bp_name": "Air Dryer Rehabilitation",
    "description": "Carried out a comprehensive rehabilitation of the dryer unit, replacing the outdated and obsolete control system with a newly designed, modern solution. The project included the development and integration of a new control panel and the programming of an advanced touchscreen interface, ensuring enhanced system stability, improved user interaction, and reliable dryer operation.",
    "solution_steps": [
      "Installed New Valves",
      "Designed and Installed New Control Panel",
      "Developed and Programmed New HMI Screen",
      "Wrote New PLC Program",
      "Test the new system"
    ],
    "images": [
      "assets/dryerRehab1.png",
      "assets/dryerRehab2.png",
      "assets/dryerRehab3.png"
    ],
    "kpi_impacted": "Cost Reduction",
    "kpi_units": "Cost",
    "impact_value": "12 KCHF / Unit",
    "classification": "Reverse Engineering"
  },
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2025-03-01",
    "email": "ahmed.rakha@lafarge.com",
    "owner": {
      "name": "Ahmed Rakha",
      "email": "ahmed.rakha@lafarge.com",
      "mobile": "+201276380885",
      "image": "assets/dryerRehabOwner.png"
    },
    "bp_name": "Main Stack Monitor Device Cards",
    "description": "The Main Stack Monitor device ceased operation due to failure of two obsolete electronic cards. Replacement parts were unavailable, so a replacement solution using an old PLC control system was implemented to resume operation without delay.",
    "solution_steps": [
      "Understanding the Cards' Logic and Operation",
      "Designing the New Control System",
      "Implementing Communication with the Device",
      "Testing and Calibration",
      "Deployment and Monitoring"
    ],
    "images": [
      "assets/mainStack1.png"
    ],
    "kpi_impacted": "CO2, Cost Reduction, Reduce Time",
    "kpi_units": "Cost",
    "impact_value": "30 KCHF / Unit",
    "classification": "Reverse Engineering"
  },
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2024-04-28",
    "email": "ahmed.rafaat@lafarge.com",
    "owner": {
      "name": "Bassem Victor",
      "email": "basem.victor@lafarge.com",
      "mobile": "01224437523",
      "image": "assets/localizationOwner.png"
    },
    "bp_name": "Coolers Cleaning System",
    "description": "To reduce performance loss from fouling and high cleaning costs, we developed an in-house cleaning system for air/air coolers. Includes chemical cleaner, closed-loop pumping, and pressure monitoring.",
    "solution_steps": [
      "Detected fouling in air/air coolers for coal transport.",
      "Analysed samples and selected effective chemical cleaner.",
      "Designed compact cleaning system with pump, hoses, and filters.",
      "Delta Pressure monitor before and after cleaning to measure cleaning effectiveness."
    ],
    "images": [
      "assets/coolerSystem1.png",
      "assets/coolerSystem2.png"
    ],
    "kpi_impacted": "MTBF, NAI, Cost Reduction, Reduce Time",
    "kpi_units": "CHF / Year",
    "impact_value": "24,000 CHF/Year",
    "classification": "New Inovation"
  },
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2024-01-01",
    "email": "ahmed.rafaat@lafarge.com",
    "owner": {
      "name": "Bassem Victor",
      "email": "basem.victor@lafarge.com",
      "mobile": "01224437523",
      "image": "assets/localizationOwner.png"
    },
    "bp_name": "Internal Fabrication for Rotating Equipment Shafts (Air & Water Supply)",
    "description": "Due to repeated overhauls, shaft tolerances deteriorated. By fabricating new shafts, we reduced overhaul frequency, improving reliability and cutting costs.",
    "solution_steps": [
      "Conducted material analysis on screw compressors and blower shafts.",
      "Developed precise drawings with updated dimensions for new equipment.",
      "Fabricated new shafts, ensuring checks like run-out, balance, and contact pattern verification."
    ],
    "images": [
      "assets/intFabrication.png"
    ],
    "kpi_impacted": "MTBF, NAI, Cost Reduction, Reduce Time",
    "kpi_units": "CHF / Year",
    "impact_value": "15,000 CHF / Year",
    "classification": "Reverse Engineering"
  },
  {
    "category": "Industrial",
    "department": "Maintenance",
    "creation_date": "2024-01-01",
    "email": "ahmed.rafaat@lafarge.com",
    "owner": {
      "name": "Bassem Victor",
      "email": "basem.victor@lafarge.com",
      "mobile": "01224437523",
      "image": "assets/localizationOwner.png"
    },
    "bp_name": "Internal Revamping for Rotating Equipment (Air & Water Supply)",
    "description": "Performing services and overhaul via OEM was costly and time-consuming, affecting MTBF and NAI. In-house revamping improved performance and cut expenses.",
    "solution_steps": [
      "Conducted material analysis on screw compressors and blower shafts.",
      "Developed precise drawings with updated dimensions for new equipment.",
      "Fabricated new shafts, ensuring checks like run-out, balance, and contact pattern verification."
    ],
    "images": [
      "assets/intRevamp.png"
    ],
    "kpi_impacted": "MTBF, NAI, Cost Reduction, Reduce Time",
    "kpi_units": "CHF / Year",
    "impact_value": "163,000 CHF / Year",
    "classification": "Reverse Engineering"
  },
  {
  "category": "Industrial",
  "department": "Maintenance",
  "creation_date": "2023-02-01",
  "email": "ahmed.rafaat@lafarge.com",
    "owner": {
      "name": "Bassem Victor",
      "email": "basem.victor@lafarge.com",
      "mobile": "01224437523",
      "image": "assets/localizationOwner.png"
    },
  "bp_name": "Localisation & Internal Fabrication",
  "description": "We shifted to in-house fabrication for selected spare parts, achieving excellent results in both performance reliability and cost reduction. This approach enhanced our self-sufficiency and reduced lead times significantly.",
  "solution_steps": [
    "Samples from In-house Fabrication Initiatives",
    "Damper for the bypass cable - Saving 67%",
    "Double flap for raw mill cutlet - Saving 60%",
    "Reclaimer overhauling parts - Saving 38%",
    "Movable and fixed forks for grate coolers - Saving 55%"
  ],
  "images": [
    "assets/localization1.png",
    "assets/localization2.png",
    "assets/localization3.png"
  ],
  "kpi_impacted": "MTBF, Cost Reduction",
  "kpi_units": "CHF / Year",
  "impact_value": "290 K CHF/year",
  "classification": "Reverse Engineering"
},
{
  "category": "Industrial",
  "department": "Maintenance",
  "creation_date": "2024-06-01",
  "email": "ahmed.yossry@lafarge.com",
  "owner": {
    "name": "Ahmed Yossry",
    "email": "ahmed.yossry@lafarge.com",
    "mobile": "+20 12 25019892",
    "image": "assets/envBypassOwner.png"
  },
  "bp_name": "Environment Bypass dust emission unloading Bin",
  "description": "Massive dust emission generated during unloading process of By-Pass bin at all kilns impacting badly on plant conditions and workplace people and equipment.",
  "solution_steps": [
    "Modify the existing bypass system by changing the material transportation method from bin to truck",
    "Add screw conveyor at level +1 to minimize drop height and impact force",
    "Reuse old spares with ZERO cost"
  ],
  "images": ["assets/envBypass1.png", "assets/envBypass2.png", "assets/envBypass3.png"],
  "kpi_impacted": "Environmental Impact",
  "kpi_units": "Fugitive Dust Reduction",
  "impact_value": "Chronic issue eliminated, almost dust-free unloading",
  "classification": "System Modification"
}, 
{
  "category": "Industrial",
  "department": "Maintenance",
  "creation_date": "2025-01-01",
  "email": "ramy.abdelghany@lafarge.com",
  "owner": {
    "name": "Ramy Abdelghany",
    "email": "ramy.abdelghany@lafarge.com",
    "mobile": "01222478740",
    "image": "assets/motorsRepairOwner.png"
  },
  "bp_name": "Motors repair workshop",
  "description": "We keep our focus on repairing and rewinding the motors in all different areas of our plant. Repairs include basic checks, motor tests, measurements, bearing changes, and shaft repairs. Large motors aging is our main challenge due to the hard operating environment and the complexity of repair.",
  "solution_steps": [
    "Overhauling plan for strategic motors during 2025",
    "Targeted motor sizes range from 650 KW up to 4900 KW",
    "Addressing aging of large motors as a key challenge",
    "Estimated motors repair budget: 300K CHF during 2025"
  ],
  "images": ["assets/motorsRepair1.png", "assets/motorsRepair2.png"],
  "kpi_impacted": "Cost Reduction",
  "kpi_units": "Saving / Unit",
  "impact_value": "160 KCHF / Unit",
  "classification": "Workshop Optimization"
}, 
{
  "category": "Industrial",
  "department": "Maintenance",
  "creation_date": "2025-01-01",
  "email": "ramy.abdelghany@lafarge.com",
  "owner": {
    "name": "Ramy Abdelghany",
    "email": "ramy.abdelghany@lafarge.com",
    "mobile": "01222478740",
    "image": "assets/motorsRepairOwner.png"
  },
  "bp_name": "Reverse engineering of Slip Rings for Large Motors",
  "description": "Reverse engineering best practice winning award. Slip rings of motors up to 4900 KW are very expensive to replace. By overhauling the slip rings instead of replacing them, we achieve significant cost reductions.",
  "solution_steps": [
    "Overhaul slip rings (SRs) for motors up to 4900 KW",
    "Cost of new SR: 55K CHF",
    "Cost of repair: 10K CHF",
    "Saving of 45K CHF per unit"
  ],
  "images": ["assets/reverseEngineering1.png", "assets/reverseEngineering2.png"],
  "kpi_impacted": "Cost Reduction",
  "kpi_units": "Saving / Year",
  "impact_value": "180 KCHF / Year (4 Units)",
  "classification": "Reverse Engineering"
}, 
{
  "category": "Industrial",
  "department": "Maintenance",
  "creation_date": "2025-01-01",
  "email": "mohamed.ismail@lafarge.com",
  "owner": {
    "name": "Mohamed Ramadan",
    "email": "mohamed.ismail@lafarge.com",
    "mobile": "01220404228",
    "image": "assets/performanceOwner.png"
  },
  "bp_name": "Performance Improvement and cost reduction",
  "description": "Using direct on line powering methods for water pumps causes huge problems like water hammering which damages the water pipes and energy waste as there is no control over the pump motor.",
  "solution_steps": [
    "Replacing direct on line powering method and soft starters by ABB drives .",
    "Major Reduction of  water hammering phenomena.",
    "Saving electrical energy up to 1200 MWH/ year.",
    "Extended equipment life for water network.",
    "Quieter operation."
  ],
  "images": ["assets/performance1.png", "assets/performance2.png"],
  "kpi_impacted": "Energy Saving",
  "kpi_units": "1200 MWH / Year",
  "impact_value": "34 K CHF/year",
  "classification": "System Upgrade"
}, 
{
  "category": "Industrial", 
  "department": "Performance",
  "creation_date": "2025-04-25",
  "email": "mohamed.mosa@lafarge.com",
  "owner": {
    "name": "Mohamed Ramadan",
    "email": "mohamed.mosa@lafarge.com",
    "mobile": "+201275591227",
    "image": "assets/AiModelOwner.png"
  },
  "bp_name": "AI Model | CM 5 Fineness Prediction",
  "description": "The low frequency of manually taken samples throughout the day makes it difficult to control the fineness.\nVery High Risk from sample Location.",
  "solution_steps": [
    "Machine Learning Solution 'Local Model'",
    "Used more than 120 models and selected the most accurate",
    "Deployed on EDGE UI",
    "Works without internet connection",
    "Connect to HLC 'Mill Master'",
    "Provides real-time data of fineness for fast action control",
    "Reduces exposure risk from manual sample collection",
    "Validates manually taken samples"
  ],
  "images": ["assets/AiModel1.png", "assets/AiModel2.png" ],
  "kpi_impacted": "Quality Control",
  "kpi_units": "",
  "impact_value": "Improve CEM IV Quality", 
  "classification": "New Innovation"  
},

  {
    category: "Industrial",
    department: "Performance",
    creation_date: "2025-06-14",
    email: "ali.elshafee@lafarge.com",
    owner: {
      name: "Ali Elshafee",
      email: "ali.elshafee@lafarge.com",
      mobile: "+201220160782",
      image: "assets/15AOwner.png"
    },
    bp_name: "Data Analytics Automated Model -  15A Cost Analysis",
    description: "In response to the growing need for data-driven decision-making and efficient performance tracking, a new interactive model with multiple dashboards has been developed to analyze cash costs—covering variable costs, fixed costs, and maintenance. It is designed to provide clear, real-time insights to support top management in strategic and operational decision-making.",
    solution_steps: [
      "Provides a clear breakdown of variable, fixed, and maintenance costs",
      "Enhances visibility into cost trends and key drivers",
      "Supports faster, data-driven decision-making",
      "Enables cost benchmarking across departments or time periods",
      "Helps identify areas for cost optimization",
      "Improves alignment between operational performance and financial targets"
    ],
    images: [
      "assets/15A1.png",
      "assets/15A2.png",
    ],
    kpi_impacted: "Reduce Time",
    kpi_units: "Tracking all KPI",
    impact_value: "Enhance Decision Making",
    classification: "New Innovation"
  },

  //up until here order is fine
  {
    category: "Industrial",
    department: "Performance",
    creation_date: "2024-01-02",
    email: "mohamed.mosa@lafarge.com",
    owner: {
      name: "Mohamed Ramadan",
      email: "mohamed.mosa@Lafarge.com",
      mobile: "01275591227",
      image: "assets/AiModelOwner.png"
    },
    bp_name: "EL Sokhna M-Predict",
    description: "Integration all critical equipment to M-Predict platform",
    solution_steps: [
      "Sensor Gap Analysis",
      "Purchasing and installing the required sensors",
      "Gathering all data 2 years back and delivered to group"
    ],
    images: [
      "assets/mPredict1.png",
      "assets/mPredict2.png"
    ],
    kpi_impacted: "MTBF",
    kpi_units: "hrs",
    impact_value: "300 KCHF/ year",
    classification: "New Innovation"
  },

  {
  "category": "New Innovation",
  "department": "Performance",
  "creation_date": "2025-01-01",
  "email": "ali.elshafee@lafarge.com",
  "owner": {
    "name": "Ali Elshafee",
    "email": "ali.elshafee@lafarge.com",
    "mobile": "+201220160782",
    "image": "assets/15AOwner.png"
  },
  "bp_name": "Data Analytics Model - Performance dashboard",
  "description": "In response to the growing need for data-driven decision-making and efficient performance tracking, a new integrated model was developed to monitor and control all key performance indicators (KPIs) across the entire plant. This model centralizes performance data from all operational departments—production, maintenance, quality, and environment—into a single, user-friendly platform. The primary aim is to provide top management with real-time insights, streamline performance reviews, accountability, and operational efficiency, ultimately leading to improved plant performance and strategic alignment with corporate goals.",
  "solution_steps": [
    "Centralized KPI Dashboard",
    "Automated Data Collection and Validation",
    "KPI Target Setting and Variance Analysis",
    "Management-Level Reporting",
    "Performance Review Framework",
    "Decision Support and Predictive Insights"
  ],
  "images": ["assets/dataAnalytics1.png", "assets/dataAnalytics2.png"],
  "kpi_impacted": "Tracking All KPI",
  "kpi_units": "Enhance Decision Making",
  "impact_value": "Improve Performance Visibility and Strategic Alignment",
  "classification": "New Innovation"
}, 

{
  "category": "Environmental and Legal compliance Project",
  "department": "Projects",
  "creation_date": "2025-04-01",
  "email": "ibrahem.radad@lafarge.com",
  "owner": {
    "name": "Ibrahem Radad",
    "email": "ibrahem.radad@lafarge.com",
    "mobile": "01002357009",
    "image": "assets/ventilationsOwner.png"
  },
  "bp_name": "SNCR FA, FF and Ventilations Project",
  "description": "Effective SNCR execution in Egypt’s high-temperature climate by integrating ammonia tank cooling, real-time monitoring, and smart coordination between FA, FF, and ventilation systems. The approach ensures safe ammonia handling, reliable NOx reduction, and full environmental compliance.",
  "solution_steps": [
    "Maintaining Ammonia Stability: Ensuring ammonia stability through an automated water-based cooling system with real-time temperature monitoring to prevent vaporization.",
    "Safety Integration: Linking ammonia leakage detectors with the fire-fighting (FF) system and the ventilation control systems for rapid, automatic response.",
    "Leak Suppression Innovation: Utilizing the FF system itself as a leak suppression tool to neutralize or contain any accidental ammonia gas release, ensuring safety and environmental compliance."
  ],
  "images": ["assets/ventilations1.png"],
  "kpi_impacted": "Comply group safety standards",
  "kpi_units": "Permission to operate L4 SNCR System",
  "impact_value": "Full safety and environmental compliance in SNCR operation",
  "classification": "New Innovation"
},

{
  "category": "Decarbonization Project and Legal compliance",
  "department": "Projects",
  "creation_date": "2024-12-01",
  "email": "ibrahem.radad@lafarge.com",
  "owner": {
    "name": "Ibrahem Radad",
    "email": "ibrahem.radad@lafarge.com",
    "mobile": "01002357009",
    "image": "assets/ventilationsOwner.png"
  },
  "bp_name": "AFR- L4 FF&FD Project",
  "description": "As per Civil Defence and safety requirements, it was mandatory to implement a comprehensive fire alarm and firefighting system for the AFR Line 4 system. The primary objective is early fire detection and effective fire suppression to ensure the safety of both the old and new AFR systems.",
  "solution_steps": [
    "Plan & Design: Work with engineering consultants to create a fire safety system that meets Civil Defence standards, ensuring all technical and safety requirements are covered.",
    "Install Fire Safety Equipment: Set up fire detectors and suppression systems at key locations along Line 4 to protect both old and new AFR systems.",
    "Connect & Automate: Link all safety devices to control panels and the main system to ensure automatic alerts, response actions, and safe shutdowns if a fire occurs.",
    "Test & Approve: Fully test the system in real scenarios, confirm all safety functions work, and get final approval from Civil Defence authorities."
  ],
  "images": ["assets/AFR1.png", "assets/AFR2.png"],
  "kpi_impacted": "Comply group safety standards",
  "kpi_units": "Operate Line 4 AFR for TSR enhancement",
  "impact_value": "Enhanced operational safety and regulatory compliance for AFR Line 4",
  "classification": "Fire Safety and Compliance"
}, 
{
  "category": "Industrial",
  "department": "HSE",
  "creation_date": "2025-01-01",
  "email": "fathy.hossam@lafarge.com",
  "owner": {
    "name": "Fathy Hossam",
    "email": "fathy.hossam@lafarge.com",
    "mobile": "01223457711",
    "image": "assets/HSEOwner.png"
  },
  "bp_name": "Firefighting",
  "description": "Owned Firefighting truck & Certified Emergency teams are vital for maintaining safety, protecting lives and property, and ensuring an effective response to critical situations.",
  "solution_steps": [
    "Life Protection: The primary role is to save lives during fires & emergency situations.",
    "Property Protection: Quick and effective response reduces damage to infrastructure, equipment, and the environment, minimizing financial losses.",
    "Fire Control and Extinguishment: These teams are trained to control and extinguish fires efficiently, preventing their spread and escalation plus maintaining fire extinguishers.",
    "Preparedness and Training: Emergency teams conduct regular drills, risk assessments, and training for staff to ensure readiness in case of an incident.",
    "Regulatory Compliance: Their presence helps organizations comply with legal safety regulations and standards."
  ],
  "images": ["assets/fire1.png", "assets/fire2.png"],
  "kpi_impacted": "HSE KPIs",
  "kpi_units": "lives & assets saving",
  "impact_value": "Enhanced emergency response and reduced incident impact",
  "classification": "Fire Safety and Compliance"
},

{
  "category": "Industrial",
  "department": "HSE",
  "creation_date": "2025-03-01",
  "email": "fathy.hossam@lafarge.com",
  "owner": {
    "name": "Fathy Hossam",
    "email": "fathy.hossam@lafarge.com",
    "mobile": "01223457711",
    "image": "assets/HSEOwner.png"
  },
  "bp_name": "AI for Workplace Safety",
  "description": "Detecting safety violations in real time using Hybrid AI solutions enables immediate response and enforcement on industrial sites. Cameras equipped with AI models run locally or on-premise servers, ensuring low-latency processing without relying on cloud connectivity.",
  "solution_steps": [
    "When a violation—such as missing PPE or crossing restricted zones—is detected.",
    "The system instantly triggers an audible alert via a connected speaker to notify the violator and simultaneously sends a notification to the area manager’s mobile app with incident details.",
    "Showing violation in real-time on digital twin. ensuring swift corrective action and improved site safety compliance."
  ],
  "images": ["assets/safetyCam.png", "assets/safetyCam2.png"],
  "kpi_impacted": "HSE KPIs",
  "kpi_units": "People Culture",
  "impact_value": "Improved safety compliance and immediate corrective actions",
  "classification": "Digital Solutions"
},

    


 
  // {
  //   "category": "Industrial",
  //   "department": "Maintenance",
  //   "creation_date": "2024-12-01",
  //   "email": "ahmed.rafaat@lafarge.com",
  //   "owner": {
  //     "name": "Ahmed Tarek",
  //     "email": "Ahmed.Rafaat@lafarge.com",
  //     "mobile": "01001588753",
  //     "image": "https://drive.google.com/open?id=1rw6p4QuYFegr1vZnnJdHaotBykAwdQjj"
  //   },
  //   "bp_name": "Dust Isolation system",
  //   "description": "To minimize airborne dust emissions, we developed a water spray ring system that isolates and dampens dust particles before they escape into the atmosphere. This system significantly enhances both environmental compliance and workplace health and safety.",
  //   "solution_steps": [
  //     "1- Identified high-dust location with frequent particle escape.",
  //     "2- Designed and installed a circular water spray ring for targeted dust suppression.",
  //     "3- Optimise spray pressure and coverage to ensure effective particle damping.",
  //     "4- Heat Balance performed for the Cement Mill to adjust the moisture content and control water flow rate of system."
  //   ],
  //   "images": [
  //     "https://drive.google.com/open?id=1ehkaXqZdQaDNvNVJ932LG_V6KGcWKbOn",
  //     "https://drive.google.com/open?id=1gFHuVGL-77HUvXpwgft76oRmed7wNjr0"
  //   ],
  //   "kpi_impacted": "Safety, Better Work Place",
  //   "kpi_units": "PPM (percentage)",
  //   "impact_value": "80%",
  //   "classification": "New Inovation"
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

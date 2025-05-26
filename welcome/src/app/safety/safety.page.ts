import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { Router } from '@angular/router';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.page.html',
    imports: [IonicModule, CommonModule, FormsModule],

  styleUrls: ['./safety.page.scss'],
})
export class SafetyPage {
  acknowledged = false;

  constructor(private router: Router) {}

  completeSafety() {
    this.router.navigate(['/tabs/tab1']); // or ['/tabs/tab1']
  }
}

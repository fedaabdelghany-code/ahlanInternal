import { Component }         from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent, IonCard, IonIcon, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
  standalone: true,           // ← enable standalone
  imports: [IonCardContent, IonCard, // ← list exactly the Ionic pieces you use
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonContent]
})
export class TeamPage {}

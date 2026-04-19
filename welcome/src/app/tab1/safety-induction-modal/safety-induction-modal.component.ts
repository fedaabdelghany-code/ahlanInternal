import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-safety-induction-modal',
  templateUrl: './safety-induction-modal.component.html',
  styleUrls: ['./safety-induction-modal.component.scss'],
  standalone: false
})
export class SafetyInductionModalComponent {
  @Input() safetyInductions: any;
  @Input() completedCount: number | null = null;
  @Input() totalRequired: number = 2;

  constructor(private modalController: ModalController) {}

  navigateToSite(site: 'sokhnaplant' | 'rmx') {
    this.modalController.dismiss({ site });
  }

  close() {
    this.modalController.dismiss();
  }
}

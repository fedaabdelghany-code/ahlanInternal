import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SafetyPageRoutingModule } from './safety-routing.module';
import { SafetyPage } from './safety.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SafetyPageRoutingModule,
    SafetyPage
  ],
})
export class SafetyPageModule {}

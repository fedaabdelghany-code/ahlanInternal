import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DigitalTransformationPageRoutingModule } from './digital-transformation-routing.module';
import { DigitalTransformationPage } from './digital-transformation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitalTransformationPageRoutingModule,
  ],
  declarations: [DigitalTransformationPage],
})
export class DigitalTransformationPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SustainabilityPageRoutingModule } from './sustainability-routing.module';

import { SustainabilityPage } from './sustainability.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SustainabilityPageRoutingModule
  ],
  declarations: [SustainabilityPage]
})
export class SustainabilityPageModule {}

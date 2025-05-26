import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HsePageRoutingModule } from './hse-routing.module';

import { HsePage } from './hse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HsePageRoutingModule
  ],
  declarations: [HsePage]
})
export class HsePageModule {}

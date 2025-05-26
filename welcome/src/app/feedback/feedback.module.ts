import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPageRoutingModule } from './feedback-routing.module';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FeedbackPage } from './feedback.page';
import { FilterByNamePipe } from "../pipes/filter-by-name.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackPageRoutingModule,
    FilterByNamePipe
],
  declarations: [FeedbackPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FeedbackPageModule {}

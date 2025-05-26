import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SustainabilityPage } from './sustainability.page';

const routes: Routes = [
  {
    path: '',
    component: SustainabilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SustainabilityPageRoutingModule {}

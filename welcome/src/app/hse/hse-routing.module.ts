import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HsePage } from './hse.page';

const routes: Routes = [
  {
    path: '',
    component: HsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HsePageRoutingModule {}

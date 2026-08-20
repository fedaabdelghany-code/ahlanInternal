import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigitalTransformationPage } from './digital-transformation.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalTransformationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalTransformationPageRoutingModule {}

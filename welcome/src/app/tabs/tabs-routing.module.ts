import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then(m => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then(m => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then(m => m.Tab3PageModule),
      },
      {
        path: 'feedback',  // ← New route for Team tab
        loadChildren: () =>
          import('../feedback/feedback.module').then(m => m.FeedbackPageModule),
      },
      {
        path: 'hse',  // ← New route for Team tab
        loadChildren: () =>
          import('../hse/hse.module').then(m => m.HsePageModule),
      },
      {
        path: 'people',  // ← New route for Team tab
        loadChildren: () =>
          import('../people/people.module').then(m => m.PeoplePageModule),
      },
      {
        path: 'sustainability',  // ← New route for Team tab
        loadChildren: () =>
          import('../sustainability/sustainability.module').then(m => m.SustainabilityPageModule),
      }      ,
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveRequestPage } from './active-request.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveRequestPageRoutingModule {}

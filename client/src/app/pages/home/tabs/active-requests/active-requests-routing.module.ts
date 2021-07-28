import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveRequestsPage } from './active-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveRequestsPageRoutingModule {}

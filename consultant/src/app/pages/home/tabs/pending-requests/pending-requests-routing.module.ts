import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingRequestsPage } from './pending-requests.page';

const routes: Routes = [
  {
    path: '',
    component: PendingRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingRequestsPageRoutingModule {}

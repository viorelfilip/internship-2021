import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsHistoryPage } from './requests-history.page';

const routes: Routes = [
  {
    path: '',
    component: RequestsHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsHistoryPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestConsultantPage } from './request-consultant.page';

const routes: Routes = [
  {
    path: '',
    component: RequestConsultantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestConsultantPageRoutingModule {}

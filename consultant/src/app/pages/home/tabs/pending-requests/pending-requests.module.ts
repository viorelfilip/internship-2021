import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingRequestsPageRoutingModule } from './pending-requests-routing.module';

import { PendingRequestsPage } from './pending-requests.page';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingRequestsPageRoutingModule
  ],
  declarations: [PendingRequestsPage, PageHeaderComponent, LoadingComponent]
})
export class PendingRequestsPageModule { }

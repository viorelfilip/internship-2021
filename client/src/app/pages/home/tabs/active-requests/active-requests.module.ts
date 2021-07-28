import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveRequestsPageRoutingModule } from './active-requests-routing.module';

import { ActiveRequestsPage } from './active-requests.page';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveRequestsPageRoutingModule
  ],
  declarations: [ActiveRequestsPage, PageHeaderComponent]
})
export class ActiveRequestsPageModule { }

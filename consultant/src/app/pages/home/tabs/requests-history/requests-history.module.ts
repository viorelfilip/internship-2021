import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsHistoryPageRoutingModule } from './requests-history-routing.module';

import { RequestsHistoryPage } from './requests-history.page';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestsHistoryPageRoutingModule
  ],
  declarations: [RequestsHistoryPage, PageHeaderComponent]
})
export class RequestsHistoryPageModule { }

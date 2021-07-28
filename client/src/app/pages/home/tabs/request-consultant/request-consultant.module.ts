import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestConsultantPageRoutingModule } from './request-consultant-routing.module';

import { RequestConsultantPage } from './request-consultant.page';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestConsultantPageRoutingModule,
  ],
  declarations: [RequestConsultantPage, PageHeaderComponent]
})
export class RequestConsultantPageModule { }

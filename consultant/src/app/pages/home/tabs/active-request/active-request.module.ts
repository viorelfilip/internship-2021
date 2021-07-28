import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveRequestPageRoutingModule } from './active-request-routing.module';

import { ActiveRequestPage } from './active-request.page';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveRequestPageRoutingModule
  ],
  declarations: [ActiveRequestPage, PageHeaderComponent]
})
export class ActiveRequestPageModule { }

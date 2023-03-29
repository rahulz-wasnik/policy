import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPolicyHistoryRoutingModule } from './view-policy-history-routing.module';
import { ViewPolicyHistoryComponent } from './view-policy-history.component';


@NgModule({
  declarations: [
    ViewPolicyHistoryComponent
  ],
  imports: [
    CommonModule,
    ViewPolicyHistoryRoutingModule
  ]
})
export class ViewPolicyHistoryModule { }

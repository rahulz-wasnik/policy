import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RiskProfileRoutingModule } from './risk-profile-routing.module';
import { RiskProfileComponent } from './risk-profile.component';
import { CreateRiskProfileContainerComponent } from './create-risk-profile/create-risk-profile-container.component';
import { RiskProfileService } from './risk-profile.service';
import { SvgCancelComponent } from 'src/app/shared/svgs/svg-cancel.component';
import { MessageComponent } from 'src/app/shared/components/message/message.component';
import { ViewRiskProfileComponent } from './view-risk-profile/view-risk-profile.component';


@NgModule({
  declarations: [
    RiskProfileComponent,
    CreateRiskProfileContainerComponent,
    ViewRiskProfileComponent
  ],
  imports: [
    CommonModule,
    RiskProfileRoutingModule,
    ReactiveFormsModule,
    SvgCancelComponent,
    MessageComponent
  ],
  providers: [
    RiskProfileService
  ]
})
export class RiskProfileModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPolicyHistoryComponent } from './view-policy-history.component';

const routes: Routes = [{ path: '', component: ViewPolicyHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPolicyHistoryRoutingModule { }

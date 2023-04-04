import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnapshotRoutingModule } from './snapshot-routing.module';
import { SnapshotComponent } from './snapshot.component';
import { FormsModule } from '@angular/forms';
import { PolicyMatrixDetailsComponent } from './policy-matrix-details/policy-matrix-details.component';


@NgModule({
  declarations: [
    SnapshotComponent,
    PolicyMatrixDetailsComponent
  ],
  imports: [
    CommonModule,
    SnapshotRoutingModule,
    FormsModule
  ]
})
export class SnapshotModule { }

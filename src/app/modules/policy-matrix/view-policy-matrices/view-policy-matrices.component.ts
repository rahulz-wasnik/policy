import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PolicyMatrixResponse } from 'src/app/shared/models';
import { ViewPolicyMatricesState } from './view-policy-matrices-container.component';

@Component({
  selector: 'app-view-policy-matrices',
  templateUrl: './view-policy-matrices.component.html',
  styleUrls: ['./view-policy-matrices.component.scss']
})
export class ViewPolicyMatricesComponent {

  @Input() state!: ViewPolicyMatricesState;

  @Output() onDeletePolicyMatrix = new EventEmitter<number>();
  @Output() onUpdatePolicyMatrix = new EventEmitter<PolicyMatrixResponse>();

  trackById(index: number, item: PolicyMatrixResponse): number {
    return item.id;
  }

  deletePolicyMatrix(id: number): void {
    this.onDeletePolicyMatrix.emit(id);
  }

  updatePolicyMatrix(policyMatrix: PolicyMatrixResponse): void {
    this.onUpdatePolicyMatrix.emit(policyMatrix);
  }
}

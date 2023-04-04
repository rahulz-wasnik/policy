import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PolicyMatrixResponse } from 'src/app/shared/models';

@Component({
  selector: 'app-policy-matrix-details',
  templateUrl: './policy-matrix-details.component.html',
  styleUrls: ['./policy-matrix-details.component.scss']
})
export class PolicyMatrixDetailsComponent {

  @Input() policyMatrix!: PolicyMatrixResponse | null;
  @Output() onDeletePolicyMatrix = new EventEmitter<string>();
  @Output() onUpdatePolicyMatrix = new EventEmitter<PolicyMatrixResponse>();
  
  deletePolicyMatrix(id: string): void {
    this.onDeletePolicyMatrix.emit(id);
  }

  updatePolicyMatrix(): void {
    this.onUpdatePolicyMatrix.emit(this.policyMatrix!);
  }
}

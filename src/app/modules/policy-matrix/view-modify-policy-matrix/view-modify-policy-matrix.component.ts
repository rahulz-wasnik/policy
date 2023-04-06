import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PolicyMatrixResponse } from 'src/app/shared/models';
import { ViewModifyPolicyMatrixState } from './view-modify-policy-matrix-container.component';

@Component({
  selector: 'app-view-modify-policy-matrix',
  templateUrl: './view-modify-policy-matrix.component.html',
  styleUrls: ['./view-modify-policy-matrix.component.scss']
})
export class ViewModifyPolicyMatrixComponent {

  @Input() state!: ViewModifyPolicyMatrixState;

  @Output() onDelete = new EventEmitter<number>();

  trackById(index: number, item: PolicyMatrixResponse): number {
    return item.id;
  }

  deletePolicyMatrix(id: number): void {
    this.onDelete.emit(id);
  }
}

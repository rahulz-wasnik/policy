import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PolicyResponse } from '../../../shared/models';
import { ViewPolicyState } from './view-policy-container.component';

@Component({
    selector: 'app-view-policy',
    templateUrl: './view-policy.component.html',
    styleUrls: ['./view-policy.component.scss']
})
export class ViewPolicyComponent {
    @Input() state!: ViewPolicyState;

    @Output() deletePolicyEvent = new EventEmitter<number>();
    @Output() updatePolicyEvent = new EventEmitter<PolicyResponse>();

    trackById(index: number, item: PolicyResponse): number {
        return Number(item.id);
    }

    deletePolicy(id: number): void {
        this.deletePolicyEvent.emit(id);
    }

    updatePolicy(policy: PolicyResponse): void {
        this.updatePolicyEvent.emit(policy);
    }
}

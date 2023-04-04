import { Component } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { PolicyMatrixResponse } from 'src/app/shared/models';
import { PolicyService } from 'src/app/shared/services/policy.service';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss']
})
export class SnapshotComponent {

  id!: string;

  policyMatrix$ = new Subject<PolicyMatrixResponse | null>();

  constructor (private policyService: PolicyService) {}

  getPolicyMatrix(): void {
    this.policyService.getPolicyMatrix(this.id)
      .pipe(tap((value: PolicyMatrixResponse) => this.policyMatrix$.next(value))).subscribe();
  }

  deletePolicyMatrix(id: string): void {
    this.policyService.deletePolicyMatrix(id)
      .pipe(tap(() => this.policyMatrix$.next(null))).subscribe();
  }
}

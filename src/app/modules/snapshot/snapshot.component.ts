import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { routeConstants } from '../../shared/constants';
import { PolicyMatrixResponse } from '../../shared/models';
import { PolicyMatrixService } from '../../shared/services/policy-matrix.service';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss']
})
export class SnapshotComponent {

  id!: string;

  policyMatrix$ = new Subject<PolicyMatrixResponse | null>();

  constructor (private policyMatrixService: PolicyMatrixService, private router: Router) {}

  getPolicyMatrix(): void {
    this.policyMatrixService.getPolicyMatrix(this.id)
      .pipe(tap((value: PolicyMatrixResponse) => this.policyMatrix$.next(value))).subscribe();
  }

  deletePolicyMatrix(id: string): void {
    this.policyMatrixService.deletePolicyMatrix(id)
      .pipe(tap(() => this.policyMatrix$.next(null))).subscribe();
  }

  updatePolicyMatrix(policyMatrix: PolicyMatrixResponse): void {
    this.policyMatrixService.policyMatrixResponse$.next(policyMatrix);
    this.router.navigateByUrl(routeConstants.VIEWMODIFYPOLICY);
  }
}

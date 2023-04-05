import { HttpClient } from "@angular/common/http";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of, forkJoin, map } from 'rxjs';
import { Injectable } from "@angular/core";

import { environment } from '../../../environments/environment';

import { RequiredPolicies, RiskProfiles } from "../../shared/models";

export type RiskProfileAndRequiredPolicies = {
    riskProfiles: RiskProfiles,
    policies: RequiredPolicies
};


@Injectable()
export class PolicyMatrixResolver implements Resolve<RiskProfileAndRequiredPolicies> {
   
    constructor(private http: HttpClient, private router: Router) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RiskProfileAndRequiredPolicies> {

        return of(testData);
        // TODO: Add logic for fetching data from the backend
        // return forkJoin(
        //     {
        //         riskProfiles: this.http.get<RiskProfile>(environment.api + 'riskProfiles'),
        //         policies: this.http.get<RequiredPolicies>(environment.api + 'policies')
        //     }
        // ).pipe(
        //     catchError(err => this.router.navigate(["/error"]))
        // )
    }
}

const policies: RequiredPolicies = [
    {
        label: 'P1',
        value: 'P1'
    },
    {
        label: 'P2',
        value: 'P2'
    },
    {
        label: 'P3',
        value: 'P3'
    },
    {
        label: 'P4',
        value: 'P4'
    }
];

const riskProfiles: RiskProfiles = [
    {
        label: 'A1R1',
        value: 'A1R1'
    },
    {
        label: 'A2R2',
        value: 'A2R2'
    },
    {
        label: 'A2R3',
        value: 'A2R3'
    },
    {
        label: 'A3R5',
        value: 'A3R5'
    }
];

const testData: RiskProfileAndRequiredPolicies = {
    riskProfiles,
    policies
};
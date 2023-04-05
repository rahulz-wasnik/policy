import { HttpClient } from "@angular/common/http";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";

import { PolicyPhases } from "src/app/shared/models";

@Injectable()
export class CreatePolicyResolver implements Resolve<PolicyPhases> {
   
    constructor(private http: HttpClient, private router: Router) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PolicyPhases> {

        return of(value);
        // TODO: Add logic for fetching data from the backend
        // return this.http.get<PolicyPhase>(environment.api + "phases").pipe(
        //     catchError(err => this.router.navigate(["/error"]))
        // );
    }
}

const value: PolicyPhases = [
    {
        label: 'a',
        value: 'a'
    }
];
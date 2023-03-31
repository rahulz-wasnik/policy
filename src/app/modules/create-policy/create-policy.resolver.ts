import { HttpClient } from "@angular/common/http";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of } from 'rxjs';
import { Injectable } from "@angular/core";

import { environment } from '../../../environments/environment';

import { PolicyPhase } from "../../shared/models";

@Injectable()
export class CreatePolicyResolver implements Resolve<any> {
   
    constructor(private http: HttpClient, private router: Router) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const value = [
            {
                label: 'a',
                value: 'a'
            }
        ]

        return of(value);
        // TODO: Add logic for fetching data from the backend
        // return this.http.get<PolicyPhase>(environment.api + "phases").pipe(
        //     catchError(err => this.router.navigate(["/error"]))
        // );
    }

    
}
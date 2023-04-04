import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of, ReplaySubject } from "rxjs";
import { Policy, PolicyMatrixResponse } from "../models";

@Injectable({
    providedIn: "root"
})
export class PolicyService {

    policyMatrixResponse$ = new ReplaySubject<PolicyMatrixResponse | null>(1);

    constructor(private http: HttpClient) {}

    // TODO: To be refactored
    createPolicy(policy: Policy): Observable<boolean> {
        return of(true).pipe(delay(1000));
        // TODO: Add the backend logic to submit the policy
        // return this.http.post<Policy>(environment.api + "create", JSON.stringify(policy), {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
    }
}
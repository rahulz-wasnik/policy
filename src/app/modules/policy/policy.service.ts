import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment, url } from 'src/environments/environment';
import { Policy, PolicyResponse } from '../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class PolicyService {
    policyResponse$ = new ReplaySubject<PolicyResponse | null>(1);

    constructor(private http: HttpClient) {}

    getPolicies(): Observable<PolicyResponse[]> {
        return this.http.get<PolicyResponse[]>(environment.api + url.POLICY_MATRIX);
    }

    createPolicy(policy: Policy): Observable<PolicyResponse> {
        return this.http.post<PolicyResponse>(environment.api + url.POLICY + '/save', JSON.stringify(policy), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updatePolicy(id: number, policy: Policy): Observable<PolicyResponse> {
        return this.http.post<PolicyResponse>(environment.api + url.POLICY + '/update', JSON.stringify(policy), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment, url } from '../../../environments/environment';
import { LabelValue, PolicyMatrix, PolicyMatrixResponse, PolicyResponse } from '../../shared/models';

@Injectable()
export class PolicyMatrixService {
    policyMatrixResponse$ = new ReplaySubject<PolicyMatrixResponse | null>(1);

    constructor(private http: HttpClient) {}

    getPolicies(): Observable<PolicyResponse[]> {
        return this.http.get<PolicyResponse[]>(environment.api + url.POLICY);
    }

    getPolicyMatrices(): Observable<PolicyMatrixResponse[]> {
        return this.http.get<PolicyMatrixResponse[]>(environment.api + url.POLICY_MATRIX);
    }

    createPolicyMatrix(policyMatrix: PolicyMatrix): Observable<string> {
        return this.http.post<string>(environment.api + url.POLICY_MATRIX, JSON.stringify(policyMatrix), {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/plain'
            },
            responseType: 'text' as 'json'
        });
    }

    // TODO: To be refactored
    getPolicyMatrix(id: number): Observable<PolicyMatrixResponse> {
        return this.http.get<PolicyMatrixResponse>(environment.api + url.POLICY_MATRIX + '/' + id);
    }

    // TODO: To be refactored
    deletePolicyMatrix(id: number): Observable<string> {
        return this.http.delete<string>(environment.api + url.POLICY_MATRIX + '/' + id, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/plain'
            },
            responseType: 'text' as 'json'
        });
    }

    // TODO: To be refactored
    updatePolicyMatrix(id: number, policyMatrix: PolicyMatrix): Observable<string> {
        return this.http.put<string>(environment.api + url.POLICY_MATRIX + '/' + id, JSON.stringify(policyMatrix), {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/plain'
            },
            responseType: 'text' as 'json'
        });
    }
}

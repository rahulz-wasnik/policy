import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AttributesNames, RiskProfile, RiskProfileResponse } from '../../../app/shared/models';
import { environment, url } from '../../../environments/environment';

@Injectable()
export class RiskProfileService {
    private readonly attributeName = 'attributeName';

    constructor(private http: HttpClient) {}

    getAttributeNames(): Observable<AttributesNames> {
        return this.http.get<AttributesNames>(environment.api + url.RISK_POLICY);
    }

    getAttributeValue(attributeName: string): Observable<AttributesNames> {
        let paramValue = '';
        if (attributeName === 'Vendor license application') {
            paramValue = 'listVendorLicApp';
        }

        const params = new HttpParams().set(this.attributeName, paramValue);
        return this.http.get<AttributesNames>(environment.api + url.RISK_POLICY + '/listAttributeValues', { params });
    }

    createRiskProfile(riskProfile: RiskProfile): Observable<RiskProfileResponse> {
        return this.http.post<RiskProfileResponse>(environment.api + url.RISK_POLICY + '/save', JSON.stringify(riskProfile), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    getRiskProfiles(): Observable<RiskProfileResponse> {
        return this.http.get<RiskProfileResponse>(environment.api + url.RISK_POLICY);
    }
}

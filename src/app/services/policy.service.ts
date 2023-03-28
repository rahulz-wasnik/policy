import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Policy } from "../models";

@Injectable({
    providedIn: "root"
})
export class PolicyService {

    constructor(private http: HttpClient) {}

    createPolicy(policy: Policy): void {
        
    }
}
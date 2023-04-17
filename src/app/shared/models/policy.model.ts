import { LabelValue } from './form.model';

export interface Policy {
    policyPhase: string;
    policyName: string;
    policyDescription: string;
    requiredFacts: Array<string>;
}

export interface PolicyResponse extends Policy {
    id: number;
}

export type PolicyPhases = LabelValue[];

export type RiskProfiles = LabelValue[];

export type RequiredPolicies = LabelValue[];

export type RequiredFacts = LabelValue[];

export interface PolicyMatrix {
    applicationType: string;
    releaseType: string;
    riskProfile: string;
    requiredPolicies: Array<string>;
}

export interface PolicyMatrixResponse extends PolicyMatrix {
    id: number;
}

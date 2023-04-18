import { LabelValue } from './form.model';

export interface RiskProfile {
    name: string;
    description: string;
    activeStatus: string;
    riskProfileMetaData: Array<string>;
}

export interface RiskProfileResponse extends RiskProfile {
    id: number;
}

export type AttributesNames = LabelValue[];

export type AttributeValues = LabelValue[];

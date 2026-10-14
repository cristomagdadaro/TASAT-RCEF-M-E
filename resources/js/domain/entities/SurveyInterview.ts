import { FarmerInformation } from './FarmerInformation';
import { RiceFarmingInformation } from './RiceFarmingInformation';

export interface SurveyInterviewProps {
    id?: number | string;
    referenceId: string;
    enumeratorId?: number | string | null;
    enumeratorName?: string | null;
    interviewDate: string;
    farmerInfo: FarmerInformation;
    riceFarmingInfo?: RiceFarmingInformation | null;
    syncStatus?: 'local_only' | 'synced';
    createdAt?: string;
}

export class SurveyInterview {
    public readonly id?: number | string;
    public readonly referenceId: string;
    public readonly enumeratorId?: number | string | null;
    public readonly enumeratorName?: string | null;
    public readonly interviewDate: string;
    public readonly farmerInfo: FarmerInformation;
    public readonly riceFarmingInfo?: RiceFarmingInformation | null;
    public readonly syncStatus: 'local_only' | 'synced';
    public readonly createdAt?: string;

    constructor(props: SurveyInterviewProps) {
        this.id = props.id;
        this.referenceId = props.referenceId;
        this.enumeratorId = props.enumeratorId;
        this.enumeratorName = props.enumeratorName;
        this.interviewDate = props.interviewDate;
        this.farmerInfo = props.farmerInfo;
        this.riceFarmingInfo = props.riceFarmingInfo;
        this.syncStatus = props.syncStatus || 'local_only';
        this.createdAt = props.createdAt;
    }

    public static createNew(
        farmerInfo: FarmerInformation,
        riceFarmingInfo: RiceFarmingInformation | null,
        enumerator?: { id?: number | string; name?: string } | null
    ): SurveyInterview {
        const dateStr = new Date().toISOString();
        const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
        const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const referenceId = `SRV-${ymd}-${rand}`;

        return new SurveyInterview({
            referenceId,
            enumeratorId: enumerator?.id,
            enumeratorName: enumerator?.name,
            interviewDate: dateStr,
            farmerInfo,
            riceFarmingInfo: farmerInfo.isRiceFarmer() ? riceFarmingInfo : null,
            syncStatus: 'local_only',
            createdAt: dateStr,
        });
    }

    public static fromJSON(json: any): SurveyInterview {
        const farmerInfo = FarmerInformation.fromJSON(json);
        const riceFarmingInfo = farmerInfo.isRiceFarmer()
            ? RiceFarmingInformation.fromJSON(json)
            : null;

        return new SurveyInterview({
            id: json.id,
            referenceId: json.reference_id || json.referenceId || '',
            enumeratorId: json.enumerator_id || json.enumeratorId || null,
            enumeratorName: json.enumerator_name || json.enumeratorName || null,
            interviewDate: json.interview_date || json.interviewDate || new Date().toISOString(),
            farmerInfo,
            riceFarmingInfo,
            syncStatus: json.sync_status || json.syncStatus || 'local_only',
            createdAt: json.created_at || json.createdAt,
        });
    }

    public toJSON() {
        return {
            id: this.id,
            reference_id: this.referenceId,
            enumerator_id: this.enumeratorId,
            enumerator_name: this.enumeratorName,
            interview_date: this.interviewDate,
            ...this.farmerInfo.toJSON(),
            ...(this.riceFarmingInfo ? this.riceFarmingInfo.toJSON() : {
                b2q1_total_farm_area: null,
                b2q2_primary_ecosystem: null,
                b2q3_establishment_method: null,
                b2q4_uses_certified_seeds: null,
                b2q5_seed_variety: null,
                b2q6_production_challenges: null,
                b2q7_other_challenge_details: null,
            }),
            sync_status: this.syncStatus,
            created_at: this.createdAt,
        };
    }
}

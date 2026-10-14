export type EcosystemType = 'Irrigated' | 'Rainfed Lowland' | 'Upland';
export type EstablishmentMethodType = 'Direct Seeding' | 'Transplanting';
export type YesNoType = 'Yes' | 'No';

export interface RiceFarmingInformationProps {
    b2q1TotalFarmArea: number | null;
    b2q2PrimaryEcosystem: EcosystemType | '';
    b2q3EstablishmentMethod: EstablishmentMethodType | '';
    b2q4UsesCertifiedSeeds: YesNoType | '';
    b2q5SeedVariety: string;
    b2q6ProductionChallenges: string[];
    b2q7OtherChallengeDetails: string;
}

export class RiceFarmingInformation {
    public readonly b2q1TotalFarmArea: number | null;
    public readonly b2q2PrimaryEcosystem: EcosystemType | '';
    public readonly b2q3EstablishmentMethod: EstablishmentMethodType | '';
    public readonly b2q4UsesCertifiedSeeds: YesNoType | '';
    public readonly b2q5SeedVariety: string;
    public readonly b2q6ProductionChallenges: string[];
    public readonly b2q7OtherChallengeDetails: string;

    constructor(props: RiceFarmingInformationProps) {
        this.b2q1TotalFarmArea = props.b2q1TotalFarmArea !== null && props.b2q1TotalFarmArea !== undefined ? Number(props.b2q1TotalFarmArea) : null;
        this.b2q2PrimaryEcosystem = props.b2q2PrimaryEcosystem;
        this.b2q3EstablishmentMethod = props.b2q3EstablishmentMethod;
        this.b2q4UsesCertifiedSeeds = props.b2q4UsesCertifiedSeeds;
        this.b2q5SeedVariety = props.b2q5SeedVariety || '';
        this.b2q6ProductionChallenges = Array.isArray(props.b2q6ProductionChallenges) ? [...props.b2q6ProductionChallenges] : [];
        this.b2q7OtherChallengeDetails = props.b2q7OtherChallengeDetails || '';
    }

    public usesCertifiedSeeds(): boolean {
        return this.b2q4UsesCertifiedSeeds === 'Yes';
    }

    public hasOtherChallenge(): boolean {
        return this.b2q6ProductionChallenges.includes('Others');
    }

    public static createEmpty(): RiceFarmingInformation {
        return new RiceFarmingInformation({
            b2q1TotalFarmArea: null,
            b2q2PrimaryEcosystem: '',
            b2q3EstablishmentMethod: '',
            b2q4UsesCertifiedSeeds: '',
            b2q5SeedVariety: '',
            b2q6ProductionChallenges: [],
            b2q7OtherChallengeDetails: '',
        });
    }

    public static fromJSON(data: any): RiceFarmingInformation {
        let challenges: string[] = [];
        if (Array.isArray(data.b2q6_production_challenges)) {
            challenges = data.b2q6_production_challenges;
        } else if (Array.isArray(data.b2q6ProductionChallenges)) {
            challenges = data.b2q6ProductionChallenges;
        } else if (typeof data.b2q6_production_challenges === 'string') {
            try {
                challenges = JSON.parse(data.b2q6_production_challenges);
            } catch {
                challenges = [];
            }
        }

        return new RiceFarmingInformation({
            b2q1TotalFarmArea: data.b2q1_total_farm_area !== undefined && data.b2q1_total_farm_area !== null ? Number(data.b2q1_total_farm_area) : (data.b2q1TotalFarmArea ?? null),
            b2q2PrimaryEcosystem: data.b2q2_primary_ecosystem || data.b2q2PrimaryEcosystem || '',
            b2q3EstablishmentMethod: data.b2q3_establishment_method || data.b2q3EstablishmentMethod || '',
            b2q4UsesCertifiedSeeds: data.b2q4_uses_certified_seeds || data.b2q4UsesCertifiedSeeds || '',
            b2q5SeedVariety: data.b2q5_seed_variety || data.b2q5SeedVariety || '',
            b2q6ProductionChallenges: challenges,
            b2q7OtherChallengeDetails: data.b2q7_other_challenge_details || data.b2q7OtherChallengeDetails || '',
        });
    }

    public toJSON() {
        return {
            b2q1_total_farm_area: this.b2q1TotalFarmArea,
            b2q2_primary_ecosystem: this.b2q2PrimaryEcosystem,
            b2q3_establishment_method: this.b2q3EstablishmentMethod,
            b2q4_uses_certified_seeds: this.b2q4UsesCertifiedSeeds,
            b2q5_seed_variety: this.b2q5SeedVariety,
            b2q6_production_challenges: this.b2q6ProductionChallenges,
            b2q7_other_challenge_details: this.b2q7OtherChallengeDetails,
        };
    }
}

import { FarmerInformation } from '../entities/FarmerInformation';
import { RiceFarmingInformation } from '../entities/RiceFarmingInformation';

export interface ValidationErrors {
    [field: string]: string;
}

export class SurveyValidationRules {
    public static validate(
        farmerInfo: FarmerInformation,
        riceFarmingInfo?: RiceFarmingInformation | null
    ): { isValid: boolean; errors: ValidationErrors } {
        const errors: ValidationErrors = {};

        // Block 1 Validation
        if (!farmerInfo.b1q1FarmerName || !farmerInfo.b1q1FarmerName.trim()) {
            errors.b1q1_farmer_name = "Farmer's Full Name is required.";
        }

        if (!farmerInfo.b1q2Sex) {
            errors.b1q2_sex = "Sex is required (Male or Female).";
        }

        if (
            farmerInfo.b1q3Age === null ||
            farmerInfo.b1q3Age === undefined ||
            isNaN(farmerInfo.b1q3Age) ||
            farmerInfo.b1q3Age <= 0 ||
            !Number.isInteger(farmerInfo.b1q3Age)
        ) {
            errors.b1q3_age = "Age must be a valid whole number.";
        }

        if (!farmerInfo.b1q4Province || !farmerInfo.b1q4Province.trim()) {
            errors.b1q4_province = "Province is required.";
        }

        if (!farmerInfo.b1q5MunicipalityCity || !farmerInfo.b1q5MunicipalityCity.trim()) {
            errors.b1q5_municipality_city = "Municipality/City is required.";
        }

        if (!farmerInfo.b1q6EngagedInRiceFarming) {
            errors.b1q6_engaged_in_rice_farming = "Engagement in rice farming status is required.";
        }

        // Block 2 Validation (Only if B1Q6 = Yes)
        if (farmerInfo.isRiceFarmer()) {
            if (!riceFarmingInfo) {
                errors.block2 = "Rice farming information is required for rice farmers.";
            } else {
                if (
                    riceFarmingInfo.b2q1TotalFarmArea === null ||
                    riceFarmingInfo.b2q1TotalFarmArea === undefined ||
                    isNaN(riceFarmingInfo.b2q1TotalFarmArea) ||
                    riceFarmingInfo.b2q1TotalFarmArea <= 0
                ) {
                    errors.b2q1_total_farm_area = "Total rice farm area (hectares) is required and must be greater than 0.";
                }

                if (!riceFarmingInfo.b2q2PrimaryEcosystem) {
                    errors.b2q2_primary_ecosystem = "Primary rice ecosystem is required.";
                }

                if (!riceFarmingInfo.b2q3EstablishmentMethod) {
                    errors.b2q3_establishment_method = "Rice establishment method is required.";
                }

                if (!riceFarmingInfo.b2q4UsesCertifiedSeeds) {
                    errors.b2q4_uses_certified_seeds = "Certified rice seeds usage status is required.";
                }

                // B2Q5 Conditional: Required if B2Q4 = Yes
                if (
                    riceFarmingInfo.usesCertifiedSeeds() &&
                    (!riceFarmingInfo.b2q5SeedVariety || !riceFarmingInfo.b2q5SeedVariety.trim())
                ) {
                    errors.b2q5_seed_variety = "Please specify the seed variety used.";
                }

                // B2Q6: Challenges (Multiple Choice, Required)
                if (
                    !riceFarmingInfo.b2q6ProductionChallenges ||
                    riceFarmingInfo.b2q6ProductionChallenges.length === 0
                ) {
                    errors.b2q6_production_challenges = "At least one production challenge must be selected.";
                }

                // B2Q7 Conditional: Required if B2Q6 includes 'Others'
                if (
                    riceFarmingInfo.hasOtherChallenge() &&
                    (!riceFarmingInfo.b2q7OtherChallengeDetails || !riceFarmingInfo.b2q7OtherChallengeDetails.trim())
                ) {
                    errors.b2q7_other_challenge_details = "Please specify the other rice production challenge.";
                }
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        };
    }
}

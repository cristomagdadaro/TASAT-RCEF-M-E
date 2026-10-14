import { ISurveyRepository } from '../../domain/contracts/ISurveyRepository';
import { FarmerInformation } from '../../domain/entities/FarmerInformation';
import { RiceFarmingInformation } from '../../domain/entities/RiceFarmingInformation';
import { SurveyInterview } from '../../domain/entities/SurveyInterview';
import { SurveyValidationRules } from '../../domain/rules/SurveyValidationRules';

export class SaveSurveyInterviewUseCase {
    constructor(private surveyRepo: ISurveyRepository) {}

    public async execute(
        farmerInfo: FarmerInformation,
        riceFarmingInfo: RiceFarmingInformation | null,
        enumerator?: { id?: number | string; name?: string } | null
    ): Promise<SurveyInterview> {
        // Enforce business validation rules
        const validation = SurveyValidationRules.validate(farmerInfo, riceFarmingInfo);
        if (!validation.isValid) {
            const firstErrorKey = Object.keys(validation.errors)[0];
            const message = validation.errors[firstErrorKey];
            const err = new Error(message);
            (err as any).errors = validation.errors;
            throw err;
        }

        const interview = SurveyInterview.createNew(farmerInfo, riceFarmingInfo, enumerator);
        return await this.surveyRepo.save(interview);
    }
}

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
        enumerator?: { id?: number | string; name?: string } | null,
        existingReferenceId?: string
    ): Promise<SurveyInterview> {
        const validation = SurveyValidationRules.validate(farmerInfo, riceFarmingInfo);
        if (!validation.isValid) {
            const firstErrorKey = Object.keys(validation.errors)[0];
            const message = validation.errors[firstErrorKey];
            const err = new Error(message);
            (err as any).errors = validation.errors;
            throw err;
        }

        let interview: SurveyInterview;
        if (existingReferenceId) {
            const existing = await this.surveyRepo.getById(existingReferenceId);
            interview = new SurveyInterview({
                id: existing?.id,
                referenceId: existingReferenceId,
                enumeratorId: enumerator?.id ?? existing?.enumeratorId,
                enumeratorName: enumerator?.name ?? existing?.enumeratorName,
                interviewDate: new Date().toISOString(),
                farmerInfo,
                riceFarmingInfo: farmerInfo.isRiceFarmer() ? riceFarmingInfo : null,
                syncStatus: 'local_only',
                createdAt: existing?.createdAt || new Date().toISOString(),
            });
        } else {
            interview = SurveyInterview.createNew(farmerInfo, riceFarmingInfo, enumerator);
        }

        return await this.surveyRepo.save(interview);
    }
}

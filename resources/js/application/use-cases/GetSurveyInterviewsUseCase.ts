import { ISurveyRepository } from '../../domain/contracts/ISurveyRepository';
import { SurveyInterview } from '../../domain/entities/SurveyInterview';

export class GetSurveyInterviewsUseCase {
    constructor(private surveyRepo: ISurveyRepository) {}

    public async execute(search?: string): Promise<SurveyInterview[]> {
        return await this.surveyRepo.getAll(search);
    }
}

import { ISurveyRepository } from '../../domain/contracts/ISurveyRepository';
import { SurveyInterview } from '../../domain/entities/SurveyInterview';

export class GetSurveyInterviewByIdUseCase {
    constructor(private surveyRepo: ISurveyRepository) {}

    public async execute(id: number | string): Promise<SurveyInterview | null> {
        return await this.surveyRepo.getById(id);
    }
}

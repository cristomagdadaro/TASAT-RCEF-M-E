import { ISurveyRepository } from '../../domain/contracts/ISurveyRepository';

export class DeleteSurveyInterviewUseCase {
    constructor(private surveyRepo: ISurveyRepository) {}

    public async execute(referenceId: string): Promise<boolean> {
        if (!referenceId) {
            throw new Error('Reference ID is required to delete an interview.');
        }
        return await this.surveyRepo.delete(referenceId);
    }
}

import { SurveyInterview } from '../entities/SurveyInterview';

export interface ISurveyRepository {
    getAll(search?: string): Promise<SurveyInterview[]>;
    getById(id: number | string): Promise<SurveyInterview | null>;
    save(interview: SurveyInterview): Promise<SurveyInterview>;
    count(): Promise<number>;
}

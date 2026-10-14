import { ISurveyRepository } from '../../domain/contracts/ISurveyRepository';
import { SurveyInterview } from '../../domain/entities/SurveyInterview';
import { SQLiteStorageService } from '../storage/SQLiteStorageService';

export class LocalSQLiteSurveyRepository implements ISurveyRepository {
    private storage: SQLiteStorageService;

    constructor() {
        this.storage = SQLiteStorageService.getInstance();
    }

    public async getAll(search?: string): Promise<SurveyInterview[]> {
        await this.storage.initialize();

        let sql = `
            SELECT * FROM farmer_surveys
            ORDER BY interview_date DESC, id DESC
        `;
        let params: any[] = [];

        if (search && search.trim()) {
            const term = `%${search.trim().toLowerCase()}%`;
            sql = `
                SELECT * FROM farmer_surveys
                WHERE LOWER(b1q1_farmer_name) LIKE ?
                   OR LOWER(b1q5_municipality_city) LIKE ?
                   OR LOWER(b1q4_province) LIKE ?
                   OR LOWER(reference_id) LIKE ?
                ORDER BY interview_date DESC, id DESC
            `;
            params = [term, term, term, term];
        }

        const rows = await this.storage.executeQuery<any>(sql, params);
        return rows.map((row) => SurveyInterview.fromJSON(row));
    }

    public async getById(id: number | string): Promise<SurveyInterview | null> {
        await this.storage.initialize();

        const sql = `
            SELECT * FROM farmer_surveys
            WHERE id = ? OR reference_id = ?
            LIMIT 1
        `;
        const rows = await this.storage.executeQuery<any>(sql, [id, id]);

        if (rows.length === 0) {
            return null;
        }

        return SurveyInterview.fromJSON(rows[0]);
    }

    public async save(interview: SurveyInterview): Promise<SurveyInterview> {
        await this.storage.initialize();

        const json = interview.toJSON();
        const challengesStr = json.b2q6_production_challenges
            ? JSON.stringify(json.b2q6_production_challenges)
            : null;

        const existing = await this.getById(json.reference_id);

        if (existing) {
            const updateSql = `
                UPDATE farmer_surveys SET
                    enumerator_id = ?,
                    enumerator_name = ?,
                    interview_date = ?,
                    b1q1_farmer_name = ?,
                    b1q2_sex = ?,
                    b1q3_age = ?,
                    b1q4_province = ?,
                    b1q5_municipality_city = ?,
                    b1q6_engaged_in_rice_farming = ?,
                    b2q1_total_farm_area = ?,
                    b2q2_primary_ecosystem = ?,
                    b2q3_establishment_method = ?,
                    b2q4_uses_certified_seeds = ?,
                    b2q5_seed_variety = ?,
                    b2q6_production_challenges = ?,
                    b2q7_other_challenge_details = ?,
                    sync_status = ?
                WHERE reference_id = ?
            `;

            const updateParams = [
                json.enumerator_id ?? null,
                json.enumerator_name ?? null,
                json.interview_date,
                json.b1q1_farmer_name,
                json.b1q2_sex,
                json.b1q3_age,
                json.b1q4_province,
                json.b1q5_municipality_city,
                json.b1q6_engaged_in_rice_farming,
                json.b2q1_total_farm_area,
                json.b2q2_primary_ecosystem,
                json.b2q3_establishment_method,
                json.b2q4_uses_certified_seeds,
                json.b2q5_seed_variety,
                challengesStr,
                json.b2q7_other_challenge_details,
                json.sync_status || 'local_only',
                json.reference_id,
            ];

            await this.storage.executeRun(updateSql, updateParams);
            const updated = await this.getById(json.reference_id);
            return updated || interview;
        }

        const insertSql = `
            INSERT INTO farmer_surveys (
                reference_id,
                enumerator_id,
                enumerator_name,
                interview_date,
                b1q1_farmer_name,
                b1q2_sex,
                b1q3_age,
                b1q4_province,
                b1q5_municipality_city,
                b1q6_engaged_in_rice_farming,
                b2q1_total_farm_area,
                b2q2_primary_ecosystem,
                b2q3_establishment_method,
                b2q4_uses_certified_seeds,
                b2q5_seed_variety,
                b2q6_production_challenges,
                b2q7_other_challenge_details,
                sync_status,
                created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertParams = [
            json.reference_id,
            json.enumerator_id ?? null,
            json.enumerator_name ?? null,
            json.interview_date,
            json.b1q1_farmer_name,
            json.b1q2_sex,
            json.b1q3_age,
            json.b1q4_province,
            json.b1q5_municipality_city,
            json.b1q6_engaged_in_rice_farming,
            json.b2q1_total_farm_area,
            json.b2q2_primary_ecosystem,
            json.b2q3_establishment_method,
            json.b2q4_uses_certified_seeds,
            json.b2q5_seed_variety,
            challengesStr,
            json.b2q7_other_challenge_details,
            json.sync_status || 'local_only',
            json.created_at || new Date().toISOString(),
        ];

        await this.storage.executeRun(insertSql, insertParams);

        const inserted = await this.getById(json.reference_id);
        return inserted || interview;
    }

    public async delete(referenceId: string): Promise<boolean> {
        await this.storage.initialize();
        await this.storage.executeRun(
            'DELETE FROM farmer_surveys WHERE reference_id = ? OR id = ?',
            [referenceId, referenceId]
        );
        return true;
    }

    public async count(): Promise<number> {
        await this.storage.initialize();
        const rows = await this.storage.executeQuery<{ count: number }>(
            'SELECT COUNT(*) AS count FROM farmer_surveys'
        );
        return rows.length > 0 ? Number(rows[0].count) : 0;
    }
}

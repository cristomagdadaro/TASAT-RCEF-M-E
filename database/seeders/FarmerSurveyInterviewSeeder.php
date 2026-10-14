<?php

namespace Database\Seeders;

use App\Models\FarmerSurveyInterview;
use App\Models\User;
use Illuminate\Database\Seeder;

class FarmerSurveyInterviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enum1 = User::where('username', 'enumerator1')->first();
        $enum2 = User::where('username', 'enumerator2')->first();

        $interviews = [
            [
                'reference_id' => 'SRV-20261014-NE01',
                'enumerator_id' => $enum1?->id,
                'enumerator_name' => $enum1?->name ?? 'Juan Dela Cruz',
                'interview_date' => now()->subHours(2),
                'b1q1_farmer_name' => 'Pedro Penduko',
                'b1q2_sex' => 'Male',
                'b1q3_age' => 48,
                'b1q4_province' => 'Nueva Ecija',
                'b1q5_municipality_city' => 'Science City of Muñoz',
                'b1q6_engaged_in_rice_farming' => 'Yes',
                'b2q1_total_farm_area' => 2.25,
                'b2q2_primary_ecosystem' => 'Irrigated',
                'b2q3_establishment_method' => 'Transplanting',
                'b2q4_uses_certified_seeds' => 'Yes',
                'b2q5_seed_variety' => 'NSIC Rc 222',
                'b2q6_production_challenges' => [
                    'High fertilizer cost',
                    'Pest and disease',
                ],
                'b2q7_other_challenge_details' => null,
                'sync_status' => 'local_only',
            ],
            [
                'reference_id' => 'SRV-20261014-IS02',
                'enumerator_id' => $enum2?->id,
                'enumerator_name' => $enum2?->name ?? 'Maria Santos',
                'interview_date' => now()->subHours(5),
                'b1q1_farmer_name' => 'Elena Bautista',
                'b1q2_sex' => 'Female',
                'b1q3_age' => 54,
                'b1q4_province' => 'Isabela',
                'b1q5_municipality_city' => 'Alicia',
                'b1q6_engaged_in_rice_farming' => 'Yes',
                'b2q1_total_farm_area' => 1.50,
                'b2q2_primary_ecosystem' => 'Rainfed Lowland',
                'b2q3_establishment_method' => 'Direct Seeding',
                'b2q4_uses_certified_seeds' => 'Yes',
                'b2q5_seed_variety' => 'NSIC Rc 480',
                'b2q6_production_challenges' => [
                    'Lack of irrigation',
                    'Low selling price',
                    'Others',
                ],
                'b2q7_other_challenge_details' => 'Delayed irrigation canal maintenance during dry spells',
                'sync_status' => 'local_only',
            ],
            [
                'reference_id' => 'SRV-20261014-TA03',
                'enumerator_id' => $enum1?->id,
                'enumerator_name' => $enum1?->name ?? 'Juan Dela Cruz',
                'interview_date' => now()->subDay(),
                'b1q1_farmer_name' => 'Rodrigo Morales',
                'b1q2_sex' => 'Male',
                'b1q3_age' => 61,
                'b1q4_province' => 'Tarlac',
                'b1q5_municipality_city' => 'Victoria',
                'b1q6_engaged_in_rice_farming' => 'No',
                'b2q1_total_farm_area' => null,
                'b2q2_primary_ecosystem' => null,
                'b2q3_establishment_method' => null,
                'b2q4_uses_certified_seeds' => null,
                'b2q5_seed_variety' => null,
                'b2q6_production_challenges' => null,
                'b2q7_other_challenge_details' => null,
                'sync_status' => 'local_only',
            ],
            [
                'reference_id' => 'SRV-20261014-PG04',
                'enumerator_id' => $enum2?->id,
                'enumerator_name' => $enum2?->name ?? 'Maria Santos',
                'interview_date' => now()->subDays(2),
                'b1q1_farmer_name' => 'Corazon Dalisay',
                'b1q2_sex' => 'Female',
                'b1q3_age' => 39,
                'b1q4_province' => 'Pangasinan',
                'b1q5_municipality_city' => 'Rosales',
                'b1q6_engaged_in_rice_farming' => 'Yes',
                'b2q1_total_farm_area' => 3.10,
                'b2q2_primary_ecosystem' => 'Irrigated',
                'b2q3_establishment_method' => 'Transplanting',
                'b2q4_uses_certified_seeds' => 'No',
                'b2q5_seed_variety' => null,
                'b2q6_production_challenges' => [
                    'High fertilizer cost',
                    'Labor shortage',
                ],
                'b2q7_other_challenge_details' => null,
                'sync_status' => 'local_only',
            ],
        ];

        foreach ($interviews as $interview) {
            FarmerSurveyInterview::firstOrCreate(
                ['reference_id' => $interview['reference_id']],
                $interview
            );
        }
    }
}

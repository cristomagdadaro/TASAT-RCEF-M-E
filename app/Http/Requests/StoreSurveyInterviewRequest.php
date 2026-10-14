<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSurveyInterviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isRiceFarmer = $this->input('b1q6_engaged_in_rice_farming') === 'Yes';
        $usesCertifiedSeeds = $this->input('b2q4_uses_certified_seeds') === 'Yes';
        $challenges = (array) $this->input('b2q6_production_challenges', []);
        $hasOthersChallenge = in_array('Others', $challenges);

        return [
            'reference_id' => ['nullable', 'string'],
            'interview_date' => ['nullable', 'date'],
            'enumerator_name' => ['nullable', 'string', 'max:255'],

            // Block 1
            'b1q1_farmer_name' => ['required', 'string', 'max:255'],
            'b1q2_sex' => ['required', 'string', Rule::in(['Male', 'Female'])],
            'b1q3_age' => ['required', 'integer', 'min:10', 'max:120'],
            'b1q4_province' => ['required', 'string', 'max:255'],
            'b1q5_municipality_city' => ['required', 'string', 'max:255'],
            'b1q6_engaged_in_rice_farming' => ['required', 'string', Rule::in(['Yes', 'No'])],

            // Block 2 (Required if B1Q6 = Yes)
            'b2q1_total_farm_area' => [$isRiceFarmer ? 'required' : 'nullable', 'numeric', 'min:0'],
            'b2q2_primary_ecosystem' => [
                $isRiceFarmer ? 'required' : 'nullable',
                'string',
                Rule::in(['Irrigated', 'Rainfed Lowland', 'Upland']),
            ],
            'b2q3_establishment_method' => [
                $isRiceFarmer ? 'required' : 'nullable',
                'string',
                Rule::in(['Direct Seeding', 'Transplanting']),
            ],
            'b2q4_uses_certified_seeds' => [
                $isRiceFarmer ? 'required' : 'nullable',
                'string',
                Rule::in(['Yes', 'No']),
            ],
            'b2q5_seed_variety' => [
                ($isRiceFarmer && $usesCertifiedSeeds) ? 'required' : 'nullable',
                'string',
                'max:255',
            ],
            'b2q6_production_challenges' => [
                $isRiceFarmer ? 'required' : 'nullable',
                'array',
                'min:1',
            ],
            'b2q6_production_challenges.*' => [
                'string',
                Rule::in([
                    'High fertilizer cost',
                    'Pest and disease',
                    'Lack of irrigation',
                    'Labor shortage',
                    'Low selling price',
                    'Others',
                ]),
            ],
            'b2q7_other_challenge_details' => [
                ($isRiceFarmer && $hasOthersChallenge) ? 'required' : 'nullable',
                'string',
                'max:500',
            ],
        ];
    }
}

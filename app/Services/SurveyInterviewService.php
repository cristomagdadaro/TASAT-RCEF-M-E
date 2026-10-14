<?php

namespace App\Services;

use App\Models\FarmerSurveyInterview;
use App\Repositories\Contracts\SurveyInterviewRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class SurveyInterviewService
{
    public function __construct(
        protected SurveyInterviewRepositoryInterface $surveyRepository
    ) {}

    public function listInterviews(array $filters = []): Collection
    {
        return $this->surveyRepository->getAll($filters);
    }

    public function getInterview(int|string $id): ?FarmerSurveyInterview
    {
        return $this->surveyRepository->findById($id);
    }

    public function getInterviewByReference(string $referenceId): ?FarmerSurveyInterview
    {
        return $this->surveyRepository->findByReferenceId($referenceId);
    }

    public function storeInterview(array $data, ?int $enumeratorId = null, ?string $enumeratorName = null): FarmerSurveyInterview
    {
        if (empty($data['reference_id'])) {
            $data['reference_id'] = 'SRV-' . date('Ymd') . '-' . strtoupper(Str::random(6));
        }

        if ($enumeratorId) {
            $data['enumerator_id'] = $enumeratorId;
        }

        if ($enumeratorName && empty($data['enumerator_name'])) {
            $data['enumerator_name'] = $enumeratorName;
        }

        // Enforce Appendix A business rules:
        // If B1Q6 is "No", clear Block 2 data
        if (($data['b1q6_engaged_in_rice_farming'] ?? 'No') === 'No') {
            $data['b2q1_total_farm_area'] = null;
            $data['b2q2_primary_ecosystem'] = null;
            $data['b2q3_establishment_method'] = null;
            $data['b2q4_uses_certified_seeds'] = null;
            $data['b2q5_seed_variety'] = null;
            $data['b2q6_production_challenges'] = null;
            $data['b2q7_other_challenge_details'] = null;
        } else {
            // If B2Q4 is "No", clear seed variety
            if (($data['b2q4_uses_certified_seeds'] ?? 'No') !== 'Yes') {
                $data['b2q5_seed_variety'] = null;
            }

            // If B2Q6 does not include 'Others', clear B2Q7
            $challenges = is_array($data['b2q6_production_challenges'] ?? null)
                ? $data['b2q6_production_challenges']
                : json_decode($data['b2q6_production_challenges'] ?? '[]', true) ?? [];

            if (!in_array('Others', $challenges)) {
                $data['b2q7_other_challenge_details'] = null;
            }
        }

        return $this->surveyRepository->create($data);
    }
}

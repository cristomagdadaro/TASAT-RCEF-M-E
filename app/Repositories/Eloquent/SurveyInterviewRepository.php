<?php

namespace App\Repositories\Eloquent;

use App\Models\FarmerSurveyInterview;
use App\Repositories\Contracts\SurveyInterviewRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class SurveyInterviewRepository implements SurveyInterviewRepositoryInterface
{
    public function getAll(array $filters = []): Collection
    {
        $query = FarmerSurveyInterview::query()->orderBy('interview_date', 'desc')->orderBy('id', 'desc');

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('b1q1_farmer_name', 'like', "%{$search}%")
                    ->orWhere('b1q5_municipality_city', 'like', "%{$search}%")
                    ->orWhere('b1q4_province', 'like', "%{$search}%")
                    ->orWhere('reference_id', 'like', "%{$search}%");
            });
        }

        if (!empty($filters['enumerator_id'])) {
            $query->where('enumerator_id', $filters['enumerator_id']);
        }

        return $query->get();
    }

    public function findById(int|string $id): ?FarmerSurveyInterview
    {
        return FarmerSurveyInterview::find($id);
    }

    public function findByReferenceId(string $referenceId): ?FarmerSurveyInterview
    {
        return FarmerSurveyInterview::where('reference_id', $referenceId)->first();
    }

    public function create(array $data): FarmerSurveyInterview
    {
        return FarmerSurveyInterview::create($data);
    }

    public function update(int|string $id, array $data): bool
    {
        $record = $this->findById($id);
        if (!$record) {
            return false;
        }

        return $record->update($data);
    }

    public function delete(int|string $id): bool
    {
        $record = $this->findById($id);
        if (!$record) {
            return false;
        }

        return (bool) $record->delete();
    }
}

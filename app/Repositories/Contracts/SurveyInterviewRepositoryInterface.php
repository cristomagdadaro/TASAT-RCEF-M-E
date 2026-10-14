<?php

namespace App\Repositories\Contracts;

use App\Models\FarmerSurveyInterview;
use Illuminate\Database\Eloquent\Collection;

interface SurveyInterviewRepositoryInterface
{
    public function getAll(array $filters = []): Collection;

    public function findById(int|string $id): ?FarmerSurveyInterview;

    public function findByReferenceId(string $referenceId): ?FarmerSurveyInterview;

    public function create(array $data): FarmerSurveyInterview;

    public function update(int|string $id, array $data): bool;

    public function delete(int|string $id): bool;
}

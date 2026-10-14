<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FarmerSurveyInterview extends Model
{
    use HasFactory;

    protected $table = 'farmer_survey_interviews';

    protected $fillable = [
        'reference_id',
        'enumerator_id',
        'enumerator_name',
        'b1q1_farmer_name',
        'b1q2_sex',
        'b1q3_age',
        'b1q4_province',
        'b1q5_municipality_city',
        'b1q6_engaged_in_rice_farming',
        'b2q1_total_farm_area',
        'b2q2_primary_ecosystem',
        'b2q3_establishment_method',
        'b2q4_uses_certified_seeds',
        'b2q5_seed_variety',
        'b2q6_production_challenges',
        'b2q7_other_challenge_details',
        'sync_status',
        'interview_date',
    ];

    protected function casts(): array
    {
        return [
            'b1q3_age' => 'integer',
            'b2q1_total_farm_area' => 'decimal:2',
            'b2q6_production_challenges' => 'array',
            'interview_date' => 'datetime',
        ];
    }

    public function enumerator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'enumerator_id');
    }
}

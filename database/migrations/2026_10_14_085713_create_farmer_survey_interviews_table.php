<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('farmer_survey_interviews', function (Blueprint $table) {
            $table->id();
            $table->string('reference_id')->unique();
            $table->foreignId('enumerator_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('enumerator_name')->nullable();

            // Block 1: Farmer Information
            $table->string('b1q1_farmer_name');
            $table->string('b1q2_sex'); // Male, Female
            $table->unsignedInteger('b1q3_age');
            $table->string('b1q4_province');
            $table->string('b1q5_municipality_city');
            $table->string('b1q6_engaged_in_rice_farming'); // Yes, No

            // Block 2: Rice Farming Information (shown if B1Q6 = Yes)
            $table->decimal('b2q1_total_farm_area', 8, 2)->nullable();
            $table->string('b2q2_primary_ecosystem')->nullable(); // Irrigated, Rainfed Lowland, Upland
            $table->string('b2q3_establishment_method')->nullable(); // Direct Seeding, Transplanting
            $table->string('b2q4_uses_certified_seeds')->nullable(); // Yes, No
            $table->string('b2q5_seed_variety')->nullable();
            $table->json('b2q6_production_challenges')->nullable();
            $table->text('b2q7_other_challenge_details')->nullable();

            // Status and tracking
            $table->string('sync_status')->default('local_only'); // local_only, synced
            $table->timestamp('interview_date')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farmer_survey_interviews');
    }
};

<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SurveyInterviewApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Seed default enumerators
        User::create([
            'name' => 'Juan Dela Cruz',
            'email' => 'enumerator1@rcef.gov.ph',
            'username' => 'enumerator1',
            'password' => bcrypt('Password123!'),
            'role' => 'enumerator',
        ]);

        User::create([
            'name' => 'Maria Santos',
            'email' => 'enumerator2@rcef.gov.ph',
            'username' => 'enumerator2',
            'password' => bcrypt('Password123!'),
            'role' => 'enumerator',
        ]);
    }

    public function test_enumerator_can_login_with_username(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'identifier' => 'enumerator1',
            'password' => 'Password123!',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.user.username', 'enumerator1')
            ->assertJsonStructure(['data' => ['user', 'token']]);
    }

    public function test_second_enumerator_can_login(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'identifier' => 'enumerator2@rcef.gov.ph',
            'password' => 'Password123!',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.user.username', 'enumerator2');
    }

    public function test_can_save_interview_for_non_rice_farmer_block_1_only(): void
    {
        $payload = [
            'b1q1_farmer_name' => 'Pedro Penduko',
            'b1q2_sex' => 'Male',
            'b1q3_age' => 45,
            'b1q4_province' => 'Nueva Ecija',
            'b1q5_municipality_city' => 'Munoz',
            'b1q6_engaged_in_rice_farming' => 'No',
        ];

        $response = $this->postJson('/api/interviews', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.b1q1_farmer_name', 'Pedro Penduko')
            ->assertJsonPath('data.b1q6_engaged_in_rice_farming', 'No')
            ->assertJsonPath('data.b2q1_total_farm_area', null);

        $this->assertDatabaseHas('farmer_survey_interviews', [
            'b1q1_farmer_name' => 'Pedro Penduko',
            'b1q6_engaged_in_rice_farming' => 'No',
        ]);
    }

    public function test_can_save_interview_with_block_2_for_active_rice_farmer(): void
    {
        $payload = [
            'b1q1_farmer_name' => 'Elena Reyes',
            'b1q2_sex' => 'Female',
            'b1q3_age' => 52,
            'b1q4_province' => 'Isabela',
            'b1q5_municipality_city' => 'Alicia',
            'b1q6_engaged_in_rice_farming' => 'Yes',
            'b2q1_total_farm_area' => 2.50,
            'b2q2_primary_ecosystem' => 'Irrigated',
            'b2q3_establishment_method' => 'Transplanting',
            'b2q4_uses_certified_seeds' => 'Yes',
            'b2q5_seed_variety' => 'RC 222',
            'b2q6_production_challenges' => ['High fertilizer cost', 'Labor shortage', 'Others'],
            'b2q7_other_challenge_details' => 'Unpredictable typhoon flooding',
        ];

        $response = $this->postJson('/api/interviews', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.b1q1_farmer_name', 'Elena Reyes')
            ->assertJsonPath('data.b2q5_seed_variety', 'RC 222');

        $this->assertDatabaseHas('farmer_survey_interviews', [
            'b1q1_farmer_name' => 'Elena Reyes',
            'b2q2_primary_ecosystem' => 'Irrigated',
        ]);
    }

    public function test_can_list_saved_interviews(): void
    {
        $payload = [
            'b1q1_farmer_name' => 'Carlos Dalisay',
            'b1q2_sex' => 'Male',
            'b1q3_age' => 38,
            'b1q4_province' => 'Tarlac',
            'b1q5_municipality_city' => 'Gerona',
            'b1q6_engaged_in_rice_farming' => 'No',
        ];

        $this->postJson('/api/interviews', $payload);

        $response = $this->getJson('/api/interviews');

        $response->assertStatus(200)
            ->assertJsonPath('status', 'success')
            ->assertJsonCount(1, 'data');
    }
}

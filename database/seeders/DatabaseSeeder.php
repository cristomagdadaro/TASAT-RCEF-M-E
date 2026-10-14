<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['username' => 'enumerator1'],
            [
                'name' => 'Juan Dela Cruz',
                'email' => 'enumerator1@rcef.gov.ph',
                'password' => bcrypt('Password123!'),
                'role' => 'enumerator',
            ]
        );

        User::firstOrCreate(
            ['username' => 'enumerator2'],
            [
                'name' => 'Maria Santos',
                'email' => 'enumerator2@rcef.gov.ph',
                'password' => bcrypt('Password123!'),
                'role' => 'enumerator',
            ]
        );

        $this->call(FarmerSurveyInterviewSeeder::class);
    }
}

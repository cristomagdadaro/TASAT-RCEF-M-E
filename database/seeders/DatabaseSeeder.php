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
        $enum1 = User::create([
            'name' => 'Juan Dela Cruz',
            'email' => 'enumerator1@rcef.gov.ph',
            'username' => 'enumerator1',
            'password' => bcrypt('Password123!'),
            'role' => 'enumerator',
        ]);

        $enum2 = User::create([
            'name' => 'Maria Santos',
            'email' => 'enumerator2@rcef.gov.ph',
            'username' => 'enumerator2',
            'password' => bcrypt('Password123!'),
            'role' => 'enumerator',
        ]);
    }
}

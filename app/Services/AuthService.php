<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {}

    public function authenticate(string $identifier, string $password): array
    {
        $user = $this->userRepository->findByUsernameOrEmail($identifier);

        if (!$user || !Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'identifier' => ['The provided credentials do not match our records.'],
            ]);
        }

        $token = $user->createToken('enumerator_offline_token')->plainTextToken;

        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'username' => $user->username,
                'role' => $user->role,
            ],
            'token' => $token,
        ];
    }

    public function getUserById(int $id): ?User
    {
        return $this->userRepository->findById($id);
    }
}

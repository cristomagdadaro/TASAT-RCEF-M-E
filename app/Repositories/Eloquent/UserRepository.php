<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    public function findByUsernameOrEmail(string $identifier): ?User
    {
        return User::where('email', $identifier)
            ->orWhere('username', $identifier)
            ->first();
    }

    public function create(array $data): User
    {
        return User::create($data);
    }
}

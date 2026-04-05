<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Repositories;

use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\Repositories\UserRepository;
use App\Auth\Infrastructure\Models\IlluminateUserModel;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

final class IlluminateUserRepository implements UserRepository
{
    public function save(User $user): User
    {
        $model = IlluminateUserModel::query()->updateOrCreate(
            ['id' => (int) $user->id()],
            [
                'email' => (string) $user->email(),
                'password' => (string) $user->password(),
            ]
        );
    }

    public function findById(Id $id): ?User
    {
        $model = IlluminateUserModel::query()->find($id->value());

        if (! $model) {
            return null;
        }
    }

    public function findByEmail(Email $email): ?User
    {
        $model = IlluminateUserModel::query()->where('email', (string) $email)->first();

        if (! $model) {
            return null;
        }
    }
}

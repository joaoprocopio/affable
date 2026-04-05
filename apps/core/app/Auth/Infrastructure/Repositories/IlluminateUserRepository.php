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
    public function save(User $user): void
    {
        $illuminateUser = IlluminateUserModel::updateOrCreate(
            ['id' => $user->id()->value()],
            [
                'email' => (string) $user->email(),
                'password' => (string) $user->password(),
            ]
        );
    }

    public function findById(Id $id): ?User
    {
        $model = IlluminateUserModel::find($id->value());

        if (! $model) {
            return null;
        }
    }

    public function findByEmail(Email $email): ?User
    {
        $model = IlluminateUserModel::where('email', (string) $email)->first();

        if (! $model) {
            return null;
        }
    }
}

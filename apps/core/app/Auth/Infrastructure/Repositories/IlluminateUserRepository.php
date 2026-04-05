<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Repositories;

use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\Repositories\UserRepository;
use App\Auth\Infrastructure\Models\EloquentUser;

final class IlluminateUserRepository implements UserRepository
{
    public function save(User $user): void
    {
        EloquentUser::updateOrCreate(
            ['id' => $user->id()],
            [
                'email' => (string) $user->email(),
                'password' => (string) $user->password(),
            ]
        );
    }

    public function findById(UserId $id): ?User
    {
        /** @var User|null $model */
        $model = EloquentUser::find($id->value());

        if (! $model) {
            return null;
        }

        return $this->toDomain($model);
    }

    public function findByEmail(Email $email): ?User
    {
        /** @var User|null $model */
        $model = EloquentUser::where('email', (string) $email)->first();

        if (! $model) {
            return null;
        }

        return $this->toDomain($model);
    }

    private function toDomain(User $model): User
    {
        return User::reconstitute(
            new UserId((int) $model->id),
            new Email((string) $model->email),
            Password::fromHash((string) $model->password)
        );
    }
}

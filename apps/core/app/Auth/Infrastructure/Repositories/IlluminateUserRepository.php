<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Repositories;

use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\Repositories\UserRepository;
use App\Auth\Infrastructure\Models\IlluminateUser;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

final class IlluminateUserRepository implements UserRepository
{
    public function save(User $user): void
    {
        IlluminateUser::updateOrCreate(
            ['id' => $user->id()],
            [
                'email' => (string) $user->email(),
                'password' => (string) $user->password(),
            ]
        );
    }

    public function findById(Id $id): ?User
    {
        /** @var User|null $model */
        $model = IlluminateUser::find($id->value());

        if (! $model) {
            return null;
        }

        return $this->toDomain($model);
    }

    public function findByEmail(Email $email): ?User
    {
        /** @var User|null $model */
        $model = IlluminateUser::where('email', (string) $email)->first();

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

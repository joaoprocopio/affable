<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Repositories;

use App\Auth\Domain\Aggregates\User as DomainUser;
use App\Auth\Domain\Contracts\UserRepository;
use App\Auth\Domain\ValueObjects\Email;
use App\Auth\Domain\ValueObjects\Password;
use App\Auth\Domain\ValueObjects\UserId;
use App\Auth\Infrastructure\Models\EloquentUser;

final class EloquentUserRepository implements UserRepository
{
    public function save(DomainUser $user): void
    {
        EloquentUser::updateOrCreate(
            ['id' => $user->id()],
            [
                'email' => (string) $user->email(),
                'password' => (string) $user->password(),
            ]
        );
    }

    public function findById(UserId $id): ?DomainUser
    {
        /** @var User|null $model */
        $model = EloquentUser::find($id->value());

        if (! $model) {
            return null;
        }

        return $this->toDomain($model);
    }

    public function findByEmail(Email $email): ?DomainUser
    {
        /** @var User|null $model */
        $model = EloquentUser::where('email', (string) $email)->first();

        if (! $model) {
            return null;
        }

        return $this->toDomain($model);
    }

    private function toDomain(User $model): DomainUser
    {
        return DomainUser::reconstitute(
            new UserId((int) $model->id),
            new Email((string) $model->email),
            Password::fromHash((string) $model->password)
        );
    }
}

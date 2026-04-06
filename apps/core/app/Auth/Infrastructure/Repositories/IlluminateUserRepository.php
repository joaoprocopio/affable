<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Repositories;

use App\Auth\Domain\Aggregates\UserAggregate;
use App\Auth\Domain\Repositories\UserRepository;
use App\Auth\Domain\ValueObjects\PasswordHash;
use App\Auth\Infrastructure\Models\IlluminateUserModel;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

final class IlluminateUserRepository implements UserRepository
{
    public function save(UserAggregate $user): UserAggregate
    {
        $model = IlluminateUserModel::query()->updateOrCreate(
            ['id' => (int)(string) $user->id()],
            [
                'email' => (string) $user->email(),
                'password' => (string) $user->passwordHash(),
            ]
        );

        return UserAggregate::reconstitute(
            id: new Id($model->id),
            email: new Email($model->email),
            passwordHash: new PasswordHash($model->password),
        );
    }

    public function findById(Id $id): ?UserAggregate
    {
        $model = IlluminateUserModel::query()->find($id->value());

        if (! $model) {
            return null;
        }

        return UserAggregate::reconstitute(
            id: new Id($model->id),
            email: new Email($model->email),
            passwordHash: new PasswordHash($model->password),
        );
    }

    public function findByEmail(Email $email): ?UserAggregate
    {
        $model = IlluminateUserModel::query()->where('email', (string) $email)->first();

        if (!$model) {
            return null;
        }

        return UserAggregate::reconstitute(
            id: new Id($model->id),
            email: new Email($model->email),
            passwordHash: new PasswordHash($model->password),
        );
    }
}

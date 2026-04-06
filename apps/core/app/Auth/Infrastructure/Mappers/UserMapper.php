<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Mappers;

use App\Auth\Application\DTOs\UserDTO;
use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\ValueObjects\PasswordHash;
use App\Auth\Infrastructure\Models\IlluminateUserModel;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;
use App\Shared\Infrastructure\Mapper;

final class UserMapper implements Mapper
{
    public static function modelToEntity(IlluminateUserModel $model): User
    {
        return new User(
            new Id($model->id),
            new Email($model->email),
            new PasswordHash($model->password)
        );
    }

    public static function entityToModel(User $user): IlluminateUserModel
    {
        return new IlluminateUserModel([
            "id" => $user->id()->value(),
            "email" => (string) $user->email()->value(),
            "password" => (string) $user->passwordHash()->value(),
        ]);
    }

    public static function entityToDTO(User $user): UserDTO
    {
        return new UserDTO(
            id: $user->id(),
            email: $user->email(),
            passwordHash: $user->passwordHash()
        );
    }
}

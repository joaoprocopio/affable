<?php

declare(strict_types=1);

namespace App\Auth\Application\DTOs;

use App\Auth\Domain\ValueObjects\PasswordHash;
use App\Shared\Application\DTO;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

final class UserDTO implements DTO
{
    public function __construct(
        public readonly Id $id,
        public readonly Email $email,
        public readonly PasswordHash $passwordHash
    ) {}
}

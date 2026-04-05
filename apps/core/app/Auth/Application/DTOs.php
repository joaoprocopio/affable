<?php

declare(strict_types=1);

namespace App\Auth\Application\DTOs;

use App\Auth\Domain\ValueObjects\PasswordRaw;
use App\Shared\Application\DTO;
use App\Shared\Domain\ValueObjects\Email;

final class SignInDTO extends DTO
{
    public function __construct(
        public readonly Email $email,
        public readonly PasswordRaw $password
    ) {}
}

final class SignUpDTO extends DTO
{
    public function __construct(
        public readonly Email $email,
        public readonly PasswordRaw $password
    ) {}
}

<?php

declare(strict_types=1);

namespace App\Auth\Domain\Entities;

use App\Auth\Domain\ValueObjects\Password;
use App\Auth\Domain\ValueObjects\PasswordHash;
use App\Auth\Domain\ValueObjects\PasswordRaw;
use App\Shared\Domain\Entities\Entity;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

final class User extends Entity
{
    public function __construct(
        private Id $id,
        public Email $email,
        public PasswordRaw | PasswordHash $password
    ) {}

    public function id(): Id
    {
        return $this->id;
    }
}

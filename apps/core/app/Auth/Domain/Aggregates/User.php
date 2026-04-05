<?php

declare(strict_types=1);

namespace App\Auth\Domain\Aggregates;

use App\Auth\Domain\Events\UserSignedIn;
use App\Auth\Domain\Events\UserSignedOut;
use App\Auth\Domain\Events\UserSignedUp;
use App\Auth\Domain\Services\PasswordHashingService;
use App\Auth\Domain\ValueObjects\PasswordHash;
use App\Auth\Domain\ValueObjects\PasswordRaw;
use App\Shared\Domain\Aggregates\AggregateRoot;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

final class User extends AggregateRoot
{
    private function __construct(
        private Id $id,
        private Email $email,
        private PasswordRaw | PasswordHash $password
    ) {}

    public function id(): Id
    {
        return $this->id;
    }

    public function email(): Email
    {
        return $this->email;
    }

    public function password(): PasswordRaw | PasswordHash
    {
        return $this->password;
    }

    public function verifyPassword(PasswordRaw $passwordRaw, PasswordHashingService $passwordHashingService): bool
    {
        return $passwordHashingService->verify($passwordRaw, $this->password);
    }

    public function changePassword(PasswordRaw $passwordRaw, PasswordHashingService $passwordHashingService): void
    {
        $this->password = $passwordHashingService->hash($passwordRaw);
    }

    public function markAsSignedUp(): void
    {
        $this->recordEvent(new UserSignedUp($this->id, $this->email));
    }

    public function markAsSignedIn(): void
    {
        $this->recordEvent(new UserSignedIn($this->id));
    }

    public function markAsSignedOut(): void
    {
        $this->recordEvent(new UserSignedOut($this->id));
    }
}

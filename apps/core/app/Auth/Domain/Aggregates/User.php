<?php

declare(strict_types=1);

namespace App\Auth\Domain\Aggregates;

use App\Auth\Domain\Events\UserSignedInEvent;
use App\Auth\Domain\Events\UserSignedOutEvent;
use App\Auth\Domain\Events\UserSignedUpEvent;
use App\Auth\Domain\Services\PasswordHashingService;
use App\Auth\Domain\ValueObjects\PasswordHash;
use App\Auth\Domain\ValueObjects\PasswordRaw;
use App\Shared\Domain\AggregateRoot;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

final class User extends AggregateRoot
{
    private function __construct(
        private Id $id,
        private Email $email,
        private PasswordRaw|PasswordHash $password
    ) {}

    public static function signUp(Id $id, Email $email, PasswordRaw $password): self
    {
        return new self($id, $email, $password);
    }

    public static function reconstitute(Id $id, Email $email, PasswordHash $password): self
    {
        return new self($id, $email, $password);
    }

    public function id(): Id
    {
        return $this->id;
    }

    public function email(): Email
    {
        return $this->email;
    }

    public function password(): PasswordRaw|PasswordHash
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
        $this->recordEvent(new UserSignedUpEvent($this->id, $this->email));
    }

    public function markAsSignedIn(): void
    {
        $this->recordEvent(new UserSignedInEvent($this->id));
    }

    public function markAsSignedOut(): void
    {
        $this->recordEvent(new UserSignedOutEvent($this->id));
    }
}

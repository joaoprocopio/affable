<?php

declare(strict_types=1);

namespace App\Auth\Domain\Aggregates;

use App\Auth\Domain\Events\UserSignedIn;
use App\Auth\Domain\Events\UserSignedOut;
use App\Auth\Domain\Events\UserSignedUp;
use App\Auth\Domain\ValueObjects\Email;
use App\Auth\Domain\ValueObjects\Password;
use App\Auth\Domain\ValueObjects\UserId;
use App\Shared\Domain\Aggregates\AggregateRoot;
use App\Auth\Domain\Entities;

final class User extends AggregateRoot
{
    private function __construct(
        private Entities\User $user
    ) {}

    public static function signUp(UserId $id, Email $email, Password $password): self
    {
        $user = new self($id, $email, $password);
        $user->recordEvent(new UserSignedUp($id, $email));

        return $user;
    }

    public static function reconstitute(
        UserId $id,
        Email $email,
        Password $password
    ): self {
        return new self($id, $email, $password);
    }

    public function id(): int
    {
        return $this->id->value();
    }

    public function userId(): UserId
    {
        return $this->id;
    }

    public function email(): Email
    {
        return $this->email;
    }

    public function password(): Password
    {
        return $this->password;
    }

    public function verifyPassword(string $plainPassword): bool
    {
        return $this->password->verify($plainPassword);
    }

    public function changePassword(Password $newPassword): void
    {
        $this->user->password = $newPassword;
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

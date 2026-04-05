<?php

declare(strict_types=1);

namespace App\Auth\Domain\Aggregates;

use App\Auth\Domain\Events\UserSignedInEvent;
use App\Auth\Domain\Events\UserSignedOutEvent;
use App\Auth\Domain\Events\UserSignedUpEvent;
use App\Auth\Domain\ValueObjects\PasswordHash;
use App\Shared\Domain\AggregateRoot;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

final class User extends AggregateRoot
{
    public function __construct(
        readonly private ?Id $id,
        private Email $email,
        private PasswordHash $passwordHash
    ) {}

    public function id(): ?Id
    {
        return $this->id;
    }

    public function email(): Email
    {
        return $this->email;
    }

    public function password(): PasswordHash
    {
        return $this->passwordHash;
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

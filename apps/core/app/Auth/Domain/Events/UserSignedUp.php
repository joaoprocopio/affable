<?php

declare(strict_types=1);

namespace App\Auth\Domain\Events;

use App\Auth\Domain\ValueObjects\Email;
use App\Auth\Domain\ValueObjects\UserId;
use App\Shared\Domain\Events\DomainEvent;

final class UserSignedUp extends DomainEvent
{
    public function __construct(
        public readonly UserId $userId,
        public readonly Email $email
    ) {
        parent::__construct();
    }

    public function eventName(): string
    {
        return 'user.signed_up';
    }

    public function toArray(): array
    {
        return [
            'user_id' => $this->userId->value(),
            'email' => (string) $this->email,
            'occurred_at' => $this->occurredAt->format('c'),
        ];
    }
}

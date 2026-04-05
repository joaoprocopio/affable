<?php

declare(strict_types=1);

namespace App\Auth\Domain\Events;

use App\Auth\Domain\ValueObjects\UserId;
use App\Shared\Domain\Events\DomainEvent;

final class UserSignedIn extends DomainEvent
{
    public function __construct(public readonly UserId $userId)
    {
        parent::__construct();
    }

    public function eventName(): string
    {
        return 'user.signed_in';
    }

    public function toArray(): array
    {
        return [
            'user_id' => $this->userId->value(),
            'occurred_at' => $this->occurredAt->format('c'),
        ];
    }
}

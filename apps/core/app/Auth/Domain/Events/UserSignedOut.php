<?php

declare(strict_types=1);

namespace App\Auth\Domain\Events;

use App\Auth\Domain\ValueObjects\UserId;
use App\Shared\Domain\Events\DomainEvent;
use App\Shared\Domain\ValueObjects\Id;

final class UserSignedOut extends DomainEvent
{
    public function __construct(public readonly Id $userId)
    {
        parent::__construct();
    }

    public function eventName(): string
    {
        return 'user.signed_out';
    }

    public function toArray(): array
    {
        return [
            'user_id' => $this->userId->value(),
            'occurred_at' => $this->occurredAt->format('c'),
        ];
    }
}

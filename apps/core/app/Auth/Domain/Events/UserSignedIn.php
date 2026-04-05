<?php

declare(strict_types=1);

namespace App\Auth\Domain\Events;

use App\Shared\Domain\Events\DomainEvent;
use App\Shared\Domain\ValueObjects\Id;

final class UserSignedIn extends DomainEvent
{
    public function __construct(public readonly Id $id)
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
            'user_id' => $this->id->value(),
            'occurred_at' => $this->occurredAt->format('c'),
        ];
    }
}

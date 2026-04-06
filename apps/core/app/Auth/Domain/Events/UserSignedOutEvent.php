<?php

declare(strict_types=1);

namespace App\Auth\Domain\Events;

use App\Shared\Domain\Event;
use App\Shared\Domain\ValueObjects\Id;

final class UserSignedOutEvent extends Event
{
    public function __construct(public readonly Id $id)
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
            'user_id' => (int) $this->id,
            'occurred_at' => $this->occurredAt->format('c'),
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Auth\Domain\Events;

use App\Shared\Domain\Events\DomainEvent;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

final class UserSignedUp extends DomainEvent
{
    public function __construct(
        public readonly Id $id,
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
            'user_id' => $this->id->value(),
            'email' => $this->email->value(),
            'occurred_at' => $this->occurredAt->format('c'),
        ];
    }
}

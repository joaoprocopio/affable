<?php

declare(strict_types=1);

namespace App\Shared\Domain\Events;

use Carbon\CarbonImmutable;

abstract class DomainEvent
{
    public readonly CarbonImmutable $occurredAt;

    public function __construct()
    {
        $this->occurredAt = new CarbonImmutable();
    }

    abstract public function eventName(): string;

    /**
     * @return array<string, mixed>
     */
    abstract public function toArray(): array;
}

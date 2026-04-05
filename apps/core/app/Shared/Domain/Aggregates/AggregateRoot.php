<?php

declare(strict_types=1);

namespace App\Shared\Domain\Aggregates;

use App\Shared\Domain\Events\DomainEvent;

abstract class AggregateRoot
{
    /** @var DomainEvent[] */
    private array $domainEvents = [];

    /**
     * @return DomainEvent[]
     */
    final public function releaseEvents(): array
    {
        $events = $this->domainEvents;
        $this->domainEvents = [];

        return $events;
    }

    final public function hasEvents(): bool
    {
        return count($this->domainEvents) > 0;
    }

    protected function recordEvent(DomainEvent $event): void
    {
        $this->domainEvents[] = $event;
    }
}

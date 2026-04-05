<?php

declare(strict_types=1);

namespace App\Shared\Domain\Events;

interface DomainEventSubscriber
{
    public function handle(DomainEvent $event): void;

    public function isSubscribedTo(DomainEvent $event): bool;
}

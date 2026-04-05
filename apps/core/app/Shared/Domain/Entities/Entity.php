<?php

declare(strict_types=1);

namespace App\Shared\Domain\Entities;

abstract class Entity
{
    abstract public function id(): int;

    final public function equals(self $other): bool
    {
        return $this->id() === $other->id();
    }
}

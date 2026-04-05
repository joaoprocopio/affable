<?php

declare(strict_types=1);

namespace App\Shared\Domain\Entities;

use App\Shared\Domain\ValueObjects\Id;

abstract class Entity
{
    abstract public function id(): Id;

    final public function equals(self $other): bool
    {
        return $this->id() === $other->id();
    }
}

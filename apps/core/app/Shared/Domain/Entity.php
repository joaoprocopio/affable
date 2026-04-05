<?php

declare(strict_types=1);

namespace App\Shared\Domain;

use App\Shared\Domain\ValueObject\Id;

abstract class Entity
{
    abstract public function id(): Id;

    final public function equals(self $other): bool
    {
        return $this->id()->equals($other->id());
    }
}

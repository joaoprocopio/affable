<?php

declare(strict_types=1);

namespace App\Auth\Domain\ValueObjects;

use App\Shared\Domain\ValueObjects\ValueObject;

final readonly class UserId extends ValueObject
{
    public function __construct(private int $value) {}

    public function value(): int
    {
        return $this->value;
    }

    public function equals(ValueObject $other): bool
    {
        return $other instanceof self && $this->value === $other->value;
    }
}

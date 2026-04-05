<?php

declare(strict_types=1);

namespace App\Shared\Domain\ValueObject;

use App\Shared\Domain\ValueObject;

final readonly class Id extends ValueObject
{
    public function __construct(private int $value)
    {
        if ($value < 1) {
            throw new \InvalidArgumentException("Id must be a positive integer, got {$value}.");
        }
    }

    public function __toString(): string
    {
        return (string) $this->value;
    }

    public function value(): int
    {
        return $this->value;
    }

    public function equals(ValueObject $other): bool
    {
        return $other instanceof self && $this->value === $other->value;
    }
}

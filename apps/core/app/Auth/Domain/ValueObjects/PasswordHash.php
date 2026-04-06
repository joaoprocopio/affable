<?php

declare(strict_types=1);

namespace App\Auth\Domain\ValueObjects;

use App\Shared\Domain\ValueObject;

final readonly class PasswordHash extends ValueObject
{
    public function __construct(private string $value) {}

    public function __toString(): string
    {
        return $this->value;
    }

    public function value(): string
    {
        return $this->value;
    }

    public function equals(ValueObject $other): bool
    {
        return $other instanceof self && $this->value === $other->value;
    }
}

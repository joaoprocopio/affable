<?php

declare(strict_types=1);

namespace App\Shared\Domain;

abstract readonly class ValueObject implements \Stringable {}

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

final readonly class Email extends ValueObject
{
    public function __construct(private string $value)
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("Invalid email: {$value}");
        }
    }

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

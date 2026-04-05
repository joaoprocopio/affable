<?php

declare(strict_types=1);

namespace App\Auth\Domain\ValueObjects;

use App\Shared\Domain\ValueObjects\ValueObject;

final readonly class PasswordRaw extends ValueObject
{
    private function __construct(private string $value)
    {
        // TODO: do password validation
    }

    public function __toString()
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

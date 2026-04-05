<?php

declare(strict_types=1);

namespace App\Shared\Domain\ValueObjects;

use Stringable;

abstract readonly class ValueObject implements Stringable
{
    public function __toString(): string
    {
        $value = $this->value();

        if (is_string($value)) {
            return $value;
        }

        if (is_int($value) || is_float($value)) {
            return (string) $value;
        }

        return '';
    }

    abstract public function value(): mixed;

    abstract public function equals(self $other): bool;
}

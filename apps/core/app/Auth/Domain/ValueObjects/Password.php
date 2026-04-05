<?php

declare(strict_types=1);

namespace App\Auth\Domain\ValueObjects;

use App\Shared\Domain\ValueObjects\ValueObject;
use Illuminate\Support\Facades\Hash;
use InvalidArgumentException;

final readonly class Password extends ValueObject
{
    private function __construct(private string $hashedValue) {}

    public static function fromPlain(string $plainPassword): self
    {
        if (mb_strlen($plainPassword) < 8) {
            throw new InvalidArgumentException('Password must be at least 8 characters');
        }

        return new self(Hash::make($plainPassword));
    }

    public static function fromHash(string $hashedValue): self
    {
        return new self($hashedValue);
    }

    public function value(): string
    {
        return $this->hashedValue;
    }

    public function verify(string $plainPassword): bool
    {
        return Hash::check($plainPassword, $this->hashedValue);
    }

    public function equals(ValueObject $other): bool
    {
        return $other instanceof self && $this->hashedValue === $other->hashedValue;
    }
}

<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Services;

use App\Auth\Domain\Services\PasswordHashingService;
use App\Auth\Domain\ValueObjects\PasswordHash;
use App\Auth\Domain\ValueObjects\PasswordRaw;
use Illuminate\Support\Facades\Hash;

final class IlluminatePasswordHashingService implements PasswordHashingService
{
    public function hash(PasswordRaw $passwordRaw): PasswordHash
    {
        return new PasswordHash(Hash::make($passwordRaw->value()));
    }

    public function verify(PasswordRaw $passwordRaw, PasswordHash $passwordHash): bool
    {
        return Hash::check($passwordRaw->value(), $passwordHash->value());
    }
}

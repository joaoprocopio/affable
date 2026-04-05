<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Services;

use App\Auth\Domain\Aggregates\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Auth\Domain\Services\AuthService;
use App\Auth\Domain\Services\PasswordHashingService;
use App\Auth\Domain\ValueObjects\PasswordHash;
use App\Auth\Domain\ValueObjects\PasswordRaw;
use Illuminate\Support\Facades\Hash;

final class IlluminateAuthService implements AuthService
{
    public function __construct(
        private Session $session,
    ) {}

    public function signIn(User $user): void
    {
        Auth::loginUsingId($user->id()->value());
        $this->session->regenerate();
    }

    public function signUp(User $user): void {}

    public function signOut(): void
    {
        Auth::logout();
        $this->session->invalidate();
        $this->session->regenerateToken();
    }
}

final class IlluminatePasswordHashingService implements PasswordHashingService
{
    public function hash(PasswordRaw $passwordRaw): PasswordHash
    {
        return new PasswordHash(Hash::make($passwordRaw->value()));
    }

    public function verify(PasswordRaw $passwordRaw, PasswordHash $passwordHash): bool
    {
        return Hash::check($passwordHash->value(), $passwordHash->value());
    }
}

<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Services;

use App\Auth\Domain\Aggregates\UserAggregate;
use App\Auth\Domain\Services\AuthService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Session\Session;

final class IlluminateAuthService implements AuthService
{
    public function __construct(
        private Session $session,
    ) {}

    public function signIn(UserAggregate $user): void
    {
        Auth::loginUsingId($user->id()->value());
        $this->session->regenerate();
    }

    public function signUp(UserAggregate $user): void
    {
        $this->signIn($user);
    }

    public function signOut(): void
    {
        Auth::logout();
        $this->session->invalidate();
        $this->session->regenerateToken();
    }
}

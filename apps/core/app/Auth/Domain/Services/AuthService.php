<?php

declare(strict_types=1);

namespace App\Auth\Domain\Services;

use App\Auth\Domain\Aggregates\User;
use App\Shared\Application\Service;

interface AuthService extends Service
{
    public function signIn(User $user): void;

    public function signUp(User $user): void;

    public function signOut(): void;
}

<?php

declare(strict_types=1);

namespace App\Auth\Domain\Services;

use App\Auth\Domain\Aggregates\UserAggregate;
use App\Shared\Application\Service;

interface AuthService extends Service
{
    public function signIn(UserAggregate $user): void;

    public function signUp(UserAggregate $user): void;

    public function signOut(): void;
}

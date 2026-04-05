<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Auth\Domain\Services\AuthService;
use App\Shared\Application\UseCases\UseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class SignOutUseCase implements UseCase
{
    public function __construct(
        private AuthService $authService,
    ) {}

    public function execute(): void
    {
        $this->authService->signOut();
    }
}

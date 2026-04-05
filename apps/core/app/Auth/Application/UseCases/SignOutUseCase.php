<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Shared\Application\UseCases\UseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class SignOutUseCase implements UseCase
{
    public function execute(Request $request): void
    {
        $user = $request->user();

        if ($user) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }
    }
}

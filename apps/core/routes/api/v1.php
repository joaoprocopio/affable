<?php

declare(strict_types=1);

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API V1 Routes
|--------------------------------------------------------------------------
|
| Routes for API version 1.
|
*/
Route::prefix('auth')->group(function () {
    // Public routes with auth rate limiter (5/min - brute force protection)
    Route::middleware('throttle:auth')->group(function (): void {
        Route::post('signup', [AuthController::class, 'signup'])
            ->name('api.v1.auth.signup');
        Route::post('signin', [AuthController::class, 'signin'])
            ->name('api.v1.auth.signup');
    });

    // Protected routes with authenticated rate limiter (120/min)
    Route::middleware(['auth:sanctum', 'throttle:authenticated'])->group(function (): void {
        Route::post('signout', [AuthController::class, 'signout'])
            ->name('api.v1.auth.signout');
        Route::get('me', [AuthController::class, 'me'])
            ->name('api.v1.auth.me');

        // Email verification
        Route::prefix('email')->group(function () {
            Route::post('verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
                ->middleware('signed')
                ->name('verification.verify');
            Route::post('resend', [AuthController::class, 'resendVerificationEmail'])
                ->middleware('throttle:6,1')
                ->name('verification.send');
        });

    });

    // Password reset routes (public with rate limiting)
    Route::middleware('throttle:6,1')->group(function (): void {
        Route::post('forgot-password', [AuthController::class, 'forgotPassword'])
            ->name('password.email');
        Route::post('reset-password', [AuthController::class, 'resetPassword'])
            ->name('password.reset');
    });
});

<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Auth\Infrastructure\Controllers\IlluminateMeController;
use App\Auth\Infrastructure\Controllers\IlluminateSignUpController;
use App\Auth\Infrastructure\Controllers\IlluminateSignInController;
use App\Auth\Infrastructure\Controllers\IlluminateSignOutController;

Route::prefix('v1/auth')->group(function () {
    Route::post('/sign_up', IlluminateSignUpController::class);
    Route::post('/sign_in', IlluminateSignInController::class);
    Route::post('/sign_out', IlluminateSignOutController::class);
    Route::get('/me', IlluminateMeController::class);
    // Route::middleware('auth:sanctum')->group(function () {});
});

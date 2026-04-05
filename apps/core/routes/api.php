<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Auth\Presentation\Controllers\IlluminateMeController;
use App\Auth\Presentation\Controllers\IlluminateSignUpController;
use App\Auth\Presentation\Controllers\IlluminateSignInController;
use App\Auth\Presentation\Controllers\IlluminateSignOutController;

Route::prefix('v1/auth')->group(function () {
    Route::post('/sign_out', IlluminateSignOutController::class);
    Route::post('/sign_in', IlluminateSignInController::class);
    Route::post('/sign_up', IlluminateSignUpController::class);
    Route::get('/me', IlluminateMeController::class);
    // Route::middleware('auth:sanctum')->group(function () {});
});

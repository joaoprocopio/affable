<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserMeController;
use App\Http\Controllers\UserSignInController;

Route::prefix('v1/auth')->group(function () {
    // Route::post('/signout', IlluminateSignOutController::class);
    Route::post('/signin', UserSignInController::class);
    // Route::post('/signup', IlluminateSignUpController::class);
    Route::get('/me', UserMeController::class);
    // Route::middleware('auth:sanctum')->group(function () {});
});

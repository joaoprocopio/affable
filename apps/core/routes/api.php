<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Auth\Presentation\Controllers\IlluminateMeController;
use App\Auth\Presentation\Controllers\IlluminateSignUpController;
use App\Auth\Presentation\Controllers\IlluminateSignInController;
use App\Auth\Presentation\Controllers\IlluminateSignOutController;

Route::prefix('v1/auth')->group(function () {
    Route::post('/signout', IlluminateSignOutController::class);
    Route::post('/signin', IlluminateSignInController::class);
    Route::post('/signup', IlluminateSignUpController::class);
    Route::get('/me', IlluminateMeController::class);
    // Route::middleware('auth:sanctum')->group(function () {});
});

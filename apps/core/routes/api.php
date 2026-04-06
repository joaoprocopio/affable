<?php

declare(strict_types=1);

use App\Http\Controllers\UserMeController;
use App\Http\Controllers\UserSignInController;
use App\Http\Controllers\UserSignOutController;
use App\Http\Controllers\UserSignUpController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('signup', UserSignUpController::class)
            ->middleware('throttle:3,60');

        Route::post('signin', UserSignInController::class)
            ->middleware('throttle:5,1');

        Route::middleware('auth')->group(function () {
            Route::get('me', UserMeController::class);
            Route::post('signout', UserSignOutController::class);
        });
    });
});

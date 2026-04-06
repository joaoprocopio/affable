<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserMeController;
use App\Http\Controllers\UserSignUpController;
use App\Http\Controllers\UserSignInController;
use App\Http\Controllers\UserSignOutController;

Route::prefix('v1/')->group(function () {
    Route::prefix('auth/')->group(function () {
        Route::get('me', UserMeController::class);
        Route::post('signup', UserSignUpController::class);
        Route::post('signin', UserSignInController::class);
        Route::post('signout', UserSignOutController::class);
    });
});

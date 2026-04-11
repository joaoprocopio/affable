<?php

declare(strict_types=1);

use App\Http\Controllers\PropertiesAddController;
use App\Http\Controllers\UserMeController;
use App\Http\Controllers\UserSignInController;
use App\Http\Controllers\UserSignOutController;
use App\Http\Controllers\UserSignUpController;
use App\Http\Controllers\UserTokenController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('token', UserTokenController::class);
        Route::post('signup', UserSignUpController::class);
        Route::post('signin', UserSignInController::class);

        Route::middleware('auth')->group(function () {
            Route::get('me', UserMeController::class);
            Route::post('signout', UserSignOutController::class);
        });
    });

    Route::middleware('auth')->group(function () {
        Route::prefix('properties')->group(function () {
            Route::post('', PropertiesAddController::class);
        });
    });
});

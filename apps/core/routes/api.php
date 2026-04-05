<?php

declare(strict_types=1);

use App\Auth\Infrastructure\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/sign_up', [AuthController::class, 'signUp']);
    Route::post('/sign_in', [AuthController::class, 'signIn']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/sign_out', [AuthController::class, 'signOut']);
        Route::get('/user', [AuthController::class, 'user']);
    });
});

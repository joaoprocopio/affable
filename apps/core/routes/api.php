<?php

declare(strict_types=1);

use App\Auth\Infrastructure\Controllers;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/sign_up', [Controllers\IlluminateSignUp::class, 'signUp']);
    Route::post('/sign_in', [Controllers\IlluminateSignIn::class, 'signIn']);

    Route::post('/sign_out', [Controllers\IlluminateSignOut::class, 'signOut']);
    Route::get('/me', [Controllers\IlluminateMe::class, 'me']);
    // Route::middleware('auth:sanctum')->group(function () {});
});

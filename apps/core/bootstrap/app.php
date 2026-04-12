<?php

declare(strict_types=1);

use App\Http\Middleware\ForceJsonMiddleware;
use App\Providers\AppServiceProvider;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Http\Middleware\ValidatePostSize;
use Illuminate\Http\Middleware\ValidatePathEncoding;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull;
use Illuminate\Foundation\Http\Middleware\TrimStrings;

return Application::configure(basePath: dirname(__DIR__))
    ->withProviders([AppServiceProvider::class])
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        health: '/health',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append([
            ForceJsonMiddleware::class,
        ]);

        $middleware->api([
            // cors
            HandleCors::class,

            // validation
            ValidatePostSize::class,
            ValidatePathEncoding::class,

            // normalization
            TrimStrings::class,
            ConvertEmptyStringsToNull::class,

            // csrf
            PreventRequestForgery::class,

            // auth
            EncryptCookies::class,
            AddQueuedCookiesToResponse::class,
            StartSession::class,

            // dependency injection
            SubstituteBindings::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {})
    ->create();

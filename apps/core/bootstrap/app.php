<?php

declare(strict_types=1);

use App\Shared\Kernel\Provider;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Http\Middleware\ValidatePostSize;
use Illuminate\Http\Middleware\ValidatePathEncoding;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull;
use Illuminate\Foundation\Http\Middleware\TrimStrings;

return Application::configure(basePath: dirname(__DIR__))
    ->withProviders([Provider::class])
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        health: '/health',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api([
            HandleCors::class,
            ValidatePostSize::class,
            ValidatePathEncoding::class,
            TrimStrings::class,
            ConvertEmptyStringsToNull::class,
            EncryptCookies::class,
            AddQueuedCookiesToResponse::class,
            StartSession::class,
            AuthenticateSession::class,
            PreventRequestForgery::class,
            ThrottleRequests::class,
            SubstituteBindings::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {})
    ->create();

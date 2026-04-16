<?php

declare(strict_types=1);

use App\Http\Middleware\ForceJsonMiddleware;
use App\Jobs\GenerateMockReservations;
use App\Providers\AppServiceProvider;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Session\Middleware\AuthenticateSession;
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
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append([
            ForceJsonMiddleware::class,
        ]);

        $middleware->redirectGuestsTo(fn () => null);

        $middleware->api([
            // cors
            HandleCors::class,

            // validation
            ValidatePostSize::class,
            ValidatePathEncoding::class,

            // normalization
            TrimStrings::class,
            ConvertEmptyStringsToNull::class,

            // encrypt
            EncryptCookies::class,

            // session, auth
            AddQueuedCookiesToResponse::class,
            StartSession::class,
            AuthenticateSession::class,

            // csrf
            PreventRequestForgery::class,

            // dependency injection
            SubstituteBindings::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {})
    ->withSchedule(function ($schedule) {
        $schedule->job(new GenerateMockReservations())
            ->everyTenSeconds()
            ->name('reservations:generate');
    })
    ->create();

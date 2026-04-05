<?php

declare(strict_types=1);

use App\SharedKernel\Provider;

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Routing\Middleware\SubstituteBindings;

return Application::configure(basePath: dirname(__DIR__))
    ->withProviders([Provider::class])
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        health: "/health",
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api([SubstituteBindings::class]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {})
    ->create();

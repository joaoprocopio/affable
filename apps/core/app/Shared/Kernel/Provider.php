<?php

declare(strict_types=1);

namespace App\Shared\Kernel;

use App\Auth\Domain\Repositories\UserRepository;
use App\Auth\Domain\Services\AuthService;
use App\Auth\Domain\Services\PasswordHashingService;
use App\Auth\Infrastructure\Repositories\IlluminateUserRepository;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

final class Provider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(UserRepository::class, IlluminateUserRepository::class);
        $this->app->bind(PasswordHashingService::class, IlluminatePasswordHashingService::class);
        $this->app->bind(AuthService::class, IlluminateAuthService::class);
    }

    public function boot(): void
    {
        $this->configureDefaults();
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        // Password::defaults(
        //     fn(): ?Password => app()->isProduction()
        //         ? Password::min(12)
        //         ->mixedCase()
        //         ->letters()
        //         ->numbers()
        //         ->symbols()
        //         ->uncompromised()
        //         : null,
        // );
    }
}

<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['email', 'password'])]
#[Hidden(['password', 'remember_token'])]
final class IlluminateUser extends Authenticatable
{
    use Notifiable;

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}

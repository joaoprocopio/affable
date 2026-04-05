<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Table('users')]
#[Fillable(['email', 'password'])]
#[Hidden(['password'])]
final class IlluminateUserModel extends Authenticatable
{
    use Notifiable;
}

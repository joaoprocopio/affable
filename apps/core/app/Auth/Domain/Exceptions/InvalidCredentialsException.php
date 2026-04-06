<?php

declare(strict_types=1);

namespace App\Auth\Domain\Exceptions;

use App\Shared\Domain\Exception;

final class InvalidCredentialsException extends Exception
{
    public function __construct()
    {
        parent::__construct(
            'Invalid credentials',
            'INVALID_CREDENTIALS',
        );
    }
}

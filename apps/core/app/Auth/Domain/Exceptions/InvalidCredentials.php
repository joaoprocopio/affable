<?php

declare(strict_types=1);

namespace App\Auth\Domain\Exceptions;

use App\Shared\Domain\Exceptions\DomainException;

final class InvalidCredentials extends DomainException
{
    public function __construct()
    {
        parent::__construct(
            'Invalid credentials',
            'INVALID_CREDENTIALS',
            401
        );
    }
}

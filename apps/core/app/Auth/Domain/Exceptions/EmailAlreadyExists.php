<?php

declare(strict_types=1);

namespace App\Auth\Domain\Exceptions;

use App\Shared\Domain\Exceptions\DomainException;

final class EmailAlreadyExists extends DomainException
{
    public function __construct(string $email)
    {
        parent::__construct(
            "Email already exists: {$email}",
            'EMAIL_ALREADY_EXISTS',
            409
        );
    }
}

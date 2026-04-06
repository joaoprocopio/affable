<?php

declare(strict_types=1);

namespace App\Auth\Domain\Exceptions;

use App\Shared\Domain\Exception;

final class EmailAlreadyExistsException extends Exception
{
    public function __construct(string $email)
    {
        parent::__construct(
            "Email already exists: {$email}",
            'EMAIL_ALREADY_EXISTS',
        );
    }
}

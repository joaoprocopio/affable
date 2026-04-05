<?php

declare(strict_types=1);

namespace App\Shared\Domain\Exceptions;

use Exception;

abstract class DomainException extends Exception
{
    public function __construct(string $message, protected string $domainErrorCode)
    {
        parent::__construct($message, $domainErrorCode);
        $this->domainErrorCode = $domainErrorCode;
    }

    final public function domainErrorCode(): string
    {
        return $this->domainErrorCode;
    }
}

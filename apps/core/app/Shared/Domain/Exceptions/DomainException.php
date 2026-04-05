<?php

declare(strict_types=1);

namespace App\Shared\Domain\Exceptions;

use Exception;

abstract class DomainException extends Exception
{
    protected int $domainErrorCode;

    public function __construct(string $message, int $domainErrorCode)
    {
        parent::__construct($message, $domainErrorCode);
        $this->domainErrorCode = $domainErrorCode;
    }

    final public function getDomainErrorCode(): int
    {
        return $this->domainErrorCode;
    }
}

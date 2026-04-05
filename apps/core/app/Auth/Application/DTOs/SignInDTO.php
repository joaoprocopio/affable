<?php

declare(strict_types=1);

namespace App\Auth\Application\DTOs;

use App\Shared\Application\DTOs\DTO;
use Symfony\Component\Validator\Constraints as Assert;

final class SignInDTO extends DTO
{
    public function __construct(
        #[Assert\NotBlank(message: 'Email is required')]
        #[Assert\Email(message: 'Invalid email address')]
        public readonly ?string $email,

        #[Assert\NotBlank(message: 'Password is required')]
        public readonly ?string $password
    ) {}
}

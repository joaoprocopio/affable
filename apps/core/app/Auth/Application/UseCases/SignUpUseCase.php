<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Auth\Application\DTOs\SignUpDTO;
use App\Auth\Application\DTOs\UserDTO;
use App\Auth\Domain\Aggregates\UserAggregate;
use App\Auth\Domain\Exceptions\EmailAlreadyExistsException;
use App\Auth\Domain\Repositories\UserRepository;
use App\Auth\Domain\Services\AuthService;
use App\Auth\Domain\Services\PasswordHashingService;
use App\Shared\Application\UseCase;

final class SignUpUseCase implements UseCase
{

    public function __construct(
        private UserRepository $userRepository,
        private PasswordHashingService $passwordHashingService,
        private AuthService $authService,
    ) {}

    public function execute(SignUpDTO $dto): UserDTO
    {
        $existingUser = $this->userRepository->findByEmail($dto->email);

        if ($existingUser !== null) {
            throw new EmailAlreadyExistsException($dto->email->value());
        }

        $user = new UserAggregate(
            id: null,
            email: $dto->email,
            passwordHash: $this->passwordHashingService->hash($dto->passwordRaw),
        );

        $this->authService->signUp($user);
        $this->userRepository->save($user);
        $user->markAsSignedUp();

        return new UserDTO(
            id: $user->id(),
            email: $user->email(),
            passwordHash: $user->passwordHash(),
        );
    }
}

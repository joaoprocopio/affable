<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Auth\Application\DTOs\SignInDTO;
use App\Auth\Application\DTOs\SignUpDTO;
use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\Exceptions\EmailAlreadyExistsException;
use App\Auth\Domain\Exceptions\InvalidCredentialsException;
use App\Auth\Domain\Repositories\UserRepository;
use App\Auth\Domain\Services\AuthService;
use App\Auth\Domain\Services\PasswordHashingService;
use App\Shared\Application\UseCase;

final class SignInUseCase implements UseCase
{
    public function __construct(
        private UserRepository $userRepository,
        private PasswordHashingService $passwordHashingService,
        private AuthService $authService,
    ) {}

    public function execute(SignInDTO $dto): User
    {
        $user = $this->userRepository->findByEmail($dto->email);

        if (!$user || !$user->verifyPassword($dto->password, $this->passwordHashingService)) {
            throw new InvalidCredentialsException();
        }

        $this->authService->signIn($user);

        $user->markAsSignedIn();

        return $user;
    }
}


final class SignOutUseCase implements UseCase
{
    public function __construct(
        private AuthService $authService,
    ) {}

    public function execute(): void
    {
        $this->authService->signOut();
    }
}

final class SignUpUseCase implements UseCase
{
    public function __construct(private UserRepository $userRepository) {}

    public function execute(SignUpDTO $dto): int
    {
        $existingUser = $this->userRepository->findByEmail($dto->email);

        if ($existingUser !== null) {
            throw new EmailAlreadyExistsException($dto->email->value());
        }

        $user = User::signUp(
            $this->userRepository->nextIdentity(),
            $emailVO,
            $passwordVO
        );

        $this->userRepository->save($user);

        return $user->id();
    }
}

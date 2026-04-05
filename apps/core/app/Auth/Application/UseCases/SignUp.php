<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Auth\Application\DTOs;
use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\Repositories\UserRepository;
use App\Auth\Domain\Exceptions\EmailAlreadyExists;
use App\Shared\Application\Service;
use App\Shared\Application\UseCase;

final class SignIn implements UseCase
{
    public function __construct(
        private UserRepository $userRepository,
        private PasswordHashingService $passwordHashingService,
        private AuthService $authService,
    ) {}

    public function execute(DTOs\SignIn $dto): User
    {
        $user = $this->userRepository->findByEmail($dto->email);

        if (!$user || !$user->verifyPassword($dto->password, $this->passwordHashingService)) {
            throw new InvalidCredentials();
        }

        $this->authService->signIn($user);

        $user->markAsSignedIn();

        return $user;
    }
}


final class SignOut implements UseCase
{
    public function __construct(
        private AuthService $authService,
    ) {}

    public function execute(): void
    {
        $this->authService->signOut();
    }
}


final class SignUp implements UseCase
{
    public function __construct(private UserRepository $userRepository) {}

    public function execute(DTOs\SignUp $dto): int
    {
        $existingUser = $this->userRepository->findByEmail($dto->email);

        if ($existingUser !== null) {
            throw new EmailAlreadyExists($dto->email->value());
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

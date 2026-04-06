<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Auth\Application\DTOs\SignInDTO;
use App\Auth\Application\DTOs\UserDTO;
use App\Auth\Domain\Exceptions\InvalidCredentialsException;
use App\Auth\Domain\Repositories\UserRepository;
use App\Auth\Domain\Services\AuthService;
use App\Auth\Domain\Services\PasswordHashingService;
use App\Shared\Application\UseCase;
use App\Shared\Domain\ValueObjects\Id;

final class SignInUseCase implements UseCase
{
    public function __construct(
        private UserRepository $userRepository,
        private PasswordHashingService $passwordHashingService,
        private AuthService $authService,
    ) {}

    public function execute(SignInDTO $dto): UserDTO
    {
        $user = $this->userRepository->findByEmail($dto->email);

        if (!$user || !$this->passwordHashingService->verify($dto->passwordRaw, $user->passwordHash())) {
            throw new InvalidCredentialsException();
        }

        $this->authService->signIn($user);
        $user->markAsSignedIn();

        return new UserDTO(
            id: $user->id(),
            email: $user->email(),
            passwordHash: $user->passwordHash(),
        );
    }
}

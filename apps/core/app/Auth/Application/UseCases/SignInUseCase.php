<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Auth\Application\DTOs\SignInDTO;
use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\Repositories\UserRepository;
use App\Auth\Domain\Exceptions\InvalidCredentials;
use App\Auth\Domain\Services\AuthService;
use App\Auth\Domain\Services\PasswordHashingService;
use App\Auth\Domain\ValueObjects\Email;
use App\Auth\Domain\ValueObjects\PasswordRaw;
use App\Shared\Application\UseCases\UseCase;
use App\Shared\Domain\ValueObjects\Email as ValueObjectsEmail;
use Illuminate\Support\Facades\Auth;

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
            throw new InvalidCredentials();
        }

        $this->authService->signIn($user);

        $user->markAsSignedIn();

        return $user;
    }
}

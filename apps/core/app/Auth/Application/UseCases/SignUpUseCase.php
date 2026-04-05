<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\Contracts\UserRepository;
use App\Auth\Domain\Exceptions\EmailAlreadyExists;
use App\Auth\Domain\ValueObjects\Email;
use App\Auth\Domain\ValueObjects\Password;
use App\Shared\Application\UseCases\UseCase;

final class SignUpUseCase implements UseCase
{
    public function __construct(private UserRepository $userRepository) {}

    public function execute(string $email, string $password): int
    {
        $emailVO = new Email($email);
        $passwordVO = Password::fromPlain($password);

        $existingUser = $this->userRepository->findByEmail($emailVO);
        if ($existingUser !== null) {
            throw new EmailAlreadyExists($email);
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

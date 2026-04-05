<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Auth\Application\DTOs\SignUpDTO;
use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\Contracts\UserRepository;
use App\Auth\Domain\Exceptions\EmailAlreadyExists;
use App\Shared\Application\UseCases\UseCase;

final class SignUpUseCase implements UseCase
{
    public function __construct(private UserRepository $userRepository) {}

    public function execute(SignUpDTO $dto): int
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

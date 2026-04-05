<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Auth\Application\DTOs\SignUpDTO;
use App\Auth\Application\DTOs\UserDTO;
use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\Exceptions\EmailAlreadyExistsException;
use App\Auth\Domain\Repositories\UserRepository;
use App\Shared\Application\UseCase;

final class SignUpUseCase implements UseCase
{
    public function __construct(private UserRepository $userRepository) {}

    public function execute(SignUpDTO $dto): UserDTO
    {
        $existingUser = $this->userRepository->findByEmail($dto->email);

        if ($existingUser !== null) {
            throw new EmailAlreadyExistsException($dto->email->value());
        }


        $this->userRepository->save($user);

        return $user->id()->value();
    }
}

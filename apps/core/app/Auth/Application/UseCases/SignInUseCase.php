<?php

declare(strict_types=1);

namespace App\Auth\Application\UseCases;

use App\Auth\Domain\Contracts\UserRepository;
use App\Auth\Domain\Exceptions\InvalidCredentials;
use App\Auth\Domain\ValueObjects\Email;
use App\Shared\Application\UseCases\UseCase;
use Illuminate\Support\Facades\Auth;

final class SignInUseCase implements UseCase
{
    public function __construct(private UserRepository $userRepository) {}

    public function execute(string $email, string $password): int
    {
        $user = $this->userRepository->findByEmail(new Email($email));

        if ($user === null || ! $user->verifyPassword($password)) {
            throw new InvalidCredentials();
        }

        $user->markAsSignedIn();

        Auth::loginUsingId($user->id());

        return $user->id();
    }
}

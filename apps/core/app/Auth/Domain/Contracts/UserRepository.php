<?php

declare(strict_types=1);

namespace App\Auth\Domain\Contracts;

use App\Auth\Domain\Aggregates\User;
use App\Auth\Domain\ValueObjects\Email;
use App\Auth\Domain\ValueObjects\UserId;

interface UserRepository
{
    public function save(User $user): void;

    public function findById(UserId $id): ?User;

    public function findByEmail(Email $email): ?User;

    public function nextIdentity(): UserId;
}

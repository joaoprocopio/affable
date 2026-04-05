<?php

declare(strict_types=1);

namespace App\Auth\Domain\Contracts;

use App\Auth\Domain\Entities\User;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

interface UserRepository
{
    public function save(User $user): void;

    public function findById(Id $id): ?User;

    public function findByEmail(Email $email): ?User;
}

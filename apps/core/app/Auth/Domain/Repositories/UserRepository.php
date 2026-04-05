<?php

declare(strict_types=1);

namespace App\Auth\Domain\Repositories;

use App\Auth\Domain\Aggregates\User;
use App\Shared\Application\Repository;
use App\Shared\Domain\Email;
use App\Shared\Domain\Id;

interface UserRepository extends Repository
{
    public function save(User $user): void;
    public function findById(Id $id): ?User;
    public function findByEmail(Email $email): ?User;
}

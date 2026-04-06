<?php

declare(strict_types=1);

namespace App\Auth\Domain\Repositories;

use App\Auth\Domain\Aggregates\UserAggregate;
use App\Auth\Domain\ValueObjects\PasswordHash;
use App\Shared\Application\Repository;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

interface UserRepository extends Repository
{
    public function create(Email $email, PasswordHash $passwordHash): UserAggregate;
    public function findById(Id $id): ?UserAggregate;
    public function findByEmail(Email $email): ?UserAggregate;
}

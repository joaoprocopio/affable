<?php

declare(strict_types=1);

namespace App\Auth\Domain\Repositories;

use App\Auth\Domain\Aggregates\UserAggregate;
use App\Shared\Application\Repository;
use App\Shared\Domain\ValueObjects\Email;
use App\Shared\Domain\ValueObjects\Id;

interface UserRepository extends Repository
{
    public function save(UserAggregate $user): UserAggregate;
    public function findById(Id $id): ?UserAggregate;
    public function findByEmail(Email $email): ?UserAggregate;
}

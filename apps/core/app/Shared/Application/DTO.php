<?php

declare(strict_types=1);

namespace App\Shared\Application;

abstract class DTO
{
    /**
     * @return array<string, mixed>
     */
    final public function toArray(): array
    {
        $result = [];

        foreach (get_object_vars($this) as $key => $value) {
            $result[(string) $key] = $value;
        }

        return $result;
    }
}

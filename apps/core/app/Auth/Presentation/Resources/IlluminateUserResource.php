<?php

declare(strict_types=1);

namespace App\Auth\Presentation\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IlluminateUserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'email' => (string) $this->email,
        ];
    }
}

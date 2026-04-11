<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property User $resource
 */
final class UserResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->resource->slug,
            'name' => $this->resource->name,
            'description' => $this->resource->description,
            'baseRate' => $this->resource->baseRate,
            'coverPhotoUrl' => $this->resource->coverPhotoUrl,
            'country' => $this->resource->country,
            'city' => $this->resource->city,
            'state' => $this->resource->state,
            'postalCode' => $this->resource->postalCode,
            'street' => $this->resource->street,
            'unit' => $this->resource->unit,
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Property;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Property $resource
 */
final class PropertyResource extends JsonResource
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
            'baseRate' => $this->resource->base_rate,
            'coverPhotoUrl' => $this->resource->cover_photo_url,
            'country' => $this->resource->country,
            'city' => $this->resource->city,
            'state' => $this->resource->state,
            'postalCode' => $this->resource->postal_code,
            'street' => $this->resource->street,
            'unit' => $this->resource->unit,
        ];
    }
}

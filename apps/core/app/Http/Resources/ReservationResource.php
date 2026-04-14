<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Reservation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Reservation $resource
 */
final class ReservationResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $property = $this->resource->relationLoaded('property') ? $this->resource->property : null;

        return [
            'id' => (string) $this->resource->id,
            'provider' => $this->resource->provider,
            'status' => $this->resource->status,
            'property' => $property ? [
                'id' => (string) $property->id,
                'name' => $property->name,
            ] : null,
            'externalId' => $this->resource->external_id,
            'channelReservationId' => $this->resource->channel_reservation_id,
            'checkIn' => $this->resource->check_in?->toDateString(),
            'checkOut' => $this->resource->check_out?->toDateString(),
            'nights' => $this->resource->nights,
            'guests' => $this->resource->guests,
            'total' => $this->resource->total,
            'currency' => $this->resource->currency,
            'bookedAt' => $this->resource->booked_at?->toIso8601String(),
            'createdAt' => $this->resource->created_at?->toIso8601String(),
            'acknowledgedAt' => $this->resource->acknowledged_at?->toIso8601String(),
            'guest' => [
                'name' => $this->resource->guest_name,
                'email' => $this->resource->guest_email,
            ],
            'emailStatus' => $this->resource->email_status,
            'emailSentAt' => $this->resource->email_sent_at?->toIso8601String(),
        ];
    }
}

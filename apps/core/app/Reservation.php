<?php

declare(strict_types=1);

namespace App;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('reservations')]
#[Fillable([
    'property_id',
    'user_id',
    'provider',
    'status',
    'external_id',
    'channel_reservation_id',
    'check_in',
    'check_out',
    'nights',
    'guests',
    'total',
    'currency',
    'booked_at',
    'acknowledged_at',
    'guest_name',
    'guest_email',
    'email_status',
    'email_sent_at',
])]
final class Reservation extends Model
{
    /**
     * @var array<string, string>
     */
    protected $casts = [
        'check_in' => 'date',
        'check_out' => 'date',
        'booked_at' => 'datetime',
        'acknowledged_at' => 'datetime',
        'email_sent_at' => 'datetime',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}

<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Property;
use App\Reservation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

final class GenerateMockReservations implements ShouldQueue
{
    use Queueable;

    private const PROVIDERS = ['airbnb', 'vrbo', 'booking.com'];
    private const STATUSES = ['new', 'new', 'new', 'modified', 'cancelled'];
    private const FIRST_NAMES = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Riley', 'Casey', 'Sam', 'Jamie'];
    private const LAST_NAMES = ['Reed', 'Baker', 'Turner', 'Parker', 'Collins', 'Flores', 'Kim', 'Clark'];
    private const EMAIL_DOMAINS = ['guestmail.com', 'staybox.io', 'travelers.net'];

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $startedAt = microtime(true);

        $properties = Property::query()->get();
        $newReservationsByUser = [];

        foreach ($properties as $property) {
            $count = random_int(0, 3);

            for ($i = 0; $i < $count; $i += 1) {
                $provider = self::PROVIDERS[array_rand(self::PROVIDERS)];
                $status = self::STATUSES[array_rand(self::STATUSES)];

                $checkIn = now()->addDays(random_int(1, 60));
                $nights = random_int(1, 10);
                $checkOut = $checkIn->addDays($nights);
                $guests = random_int(1, 6);

                $baseRate = max(1, (int) $property->base_rate);
                $total = $baseRate * $nights + random_int(0, 250);

                $guestName = $this->randomGuestName();

                $reservation = Reservation::query()->create([
                    'property_id' => $property->id,
                    'user_id' => $property->user_id,
                    'provider' => $provider,
                    'status' => $status,
                    'external_id' => $this->generateExternalId($provider),
                    'channel_reservation_id' => $this->generateChannelId($provider),
                    'check_in' => $checkIn,
                    'check_out' => $checkOut,
                    'nights' => $nights,
                    'guests' => $guests,
                    'total' => $total,
                    'currency' => 'USD',
                    'booked_at' => now()->subHours(random_int(1, 48)),
                    'acknowledged_at' => $this->maybeAcknowledgedAt(),
                    'guest_name' => $guestName,
                    'guest_email' => $this->randomGuestEmail($guestName),
                ]);

                if ($status === 'new') {
                    $newReservationsByUser[$property->user_id][] = $reservation->id;
                }
            }
        }

        foreach ($newReservationsByUser as $userId => $reservationIds) {
            Reservation::query()
                ->whereIn('id', $reservationIds);
        }

        $durationMs = (int) round((microtime(true) - $startedAt) * 1000);

        Cache::put('reservations:last_run_at', now()->toIso8601String());
        Cache::put('reservations:last_success_at', now()->toIso8601String());
        Cache::put('reservations:last_run_duration_ms', $durationMs);
    }

    private function generateExternalId(string $provider): string
    {
        $prefix = match ($provider) {
            'airbnb' => 'AB',
            'vrbo' => 'VB',
            'booking.com' => 'BK',
            default => 'RS',
        };

        return $prefix . '-' . Str::upper(Str::random(8));
    }

    private function generateChannelId(string $provider): string
    {
        $prefix = match ($provider) {
            'airbnb' => 'AIR',
            'vrbo' => 'VRB',
            'booking.com' => 'BKG',
            default => 'RES',
        };

        return $prefix . '-' . Str::upper(Str::random(10));
    }

    private function maybeAcknowledgedAt(): ?\DateTimeInterface
    {
        if (random_int(1, 100) <= 35) {
            return now()->subMinutes(random_int(5, 240));
        }

        return null;
    }

    private function randomGuestName(): string
    {
        $first = self::FIRST_NAMES[array_rand(self::FIRST_NAMES)];
        $last = self::LAST_NAMES[array_rand(self::LAST_NAMES)];

        return $first . ' ' . $last;
    }

    private function randomGuestEmail(string $name): string
    {
        $slug = Str::of($name)
            ->lower()
            ->replace(' ', '.')
            ->append(random_int(10, 99))
            ->toString();

        $domain = self::EMAIL_DOMAINS[array_rand(self::EMAIL_DOMAINS)];

        return $slug . '@' . $domain;
    }
}

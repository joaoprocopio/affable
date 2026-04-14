<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Reservation;
use App\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use Throwable;

final class SendReservationDigestEmail implements ShouldQueue
{
    use Queueable;

    /**
     * @param array<int, int> $reservationIds
     */
    public function __construct(
        private readonly int $userId,
        private readonly array $reservationIds,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $user = User::query()->find($this->userId);

        if (!$user) {
            return;
        }

        $reservations = Reservation::query()
            ->where('user_id', $this->userId)
            ->whereIn('id', $this->reservationIds)
            ->with('property')
            ->get();

        if ($reservations->isEmpty()) {
            return;
        }

        $body = $this->buildBody($user->name, $reservations->all());

        try {
            Mail::raw($body, function ($message) use ($user) {
                $message->to($user->email, $user->name)
                    ->subject('New reservations are ready');
            });

            Reservation::query()
                ->whereIn('id', $this->reservationIds)
                ->update([
                    'email_status' => 'sent',
                    'email_sent_at' => now(),
                ]);
        } catch (Throwable $exception) {
            Reservation::query()
                ->whereIn('id', $this->reservationIds)
                ->update(['email_status' => 'failed']);

            throw $exception;
        }
    }

    /**
     * @param array<int, Reservation> $reservations
     */
    private function buildBody(string $name, array $reservations): string
    {
        $lines = [
            sprintf('Hi %s,', $name),
            '',
            'New reservations have been synced:',
            '',
        ];

        foreach ($reservations as $reservation) {
            $propertyName = $reservation->property?->name ?? 'Unknown property';
            $checkIn = $reservation->check_in?->toDateString() ?? '-';
            $checkOut = $reservation->check_out?->toDateString() ?? '-';
            $total = $reservation->total ? '$' . number_format($reservation->total) : '-';

            $lines[] = sprintf(
                '- %s (%s): %s to %s, %s',
                $propertyName,
                $reservation->provider,
                $checkIn,
                $checkOut,
                $total,
            );
        }

        $lines[] = '';
        $lines[] = sprintf('Total new reservations: %d', count($reservations));
        $lines[] = '';
        $lines[] = 'Thanks,';
        $lines[] = 'Affable';

        return implode("\n", $lines);
    }
}

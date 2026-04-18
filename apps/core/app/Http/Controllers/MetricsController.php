<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Reservation;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

final class MetricsController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user_id = $request->user()->id;

        $end = now()->endOfDay();
        $start = now()->subDays(29)->startOfDay();

        $rangeQuery = Reservation::query()
            ->where('user_id', $user_id)
            ->whereBetween('created_at', [$start, $end]);

        $totals = [
            'reservations' => (clone $rangeQuery)->count(),
            'revenue' => (clone $rangeQuery)->sum('total'),
            'nights' => (clone $rangeQuery)->sum('nights'),
            'guests' => (clone $rangeQuery)->sum('guests'),
            'new' => (clone $rangeQuery)->where('status', 'new')->count(),
            'modified' => (clone $rangeQuery)->where('status', 'modified')->count(),
            'cancelled' => (clone $rangeQuery)->whereIn('status', ['cancelled', 'canceled'])->count(),
        ];

        $timeseriesRows = (clone $rangeQuery)
            ->selectRaw('date(created_at) as date')
            ->selectRaw('count(*) as reservations')
            ->selectRaw('sum(total) as revenue')
            ->selectRaw('sum(nights) as nights')
            ->selectRaw('sum(guests) as guests')
            ->selectRaw("sum(case when status = 'new' then 1 else 0 end) as new")
            ->selectRaw("sum(case when status = 'modified' then 1 else 0 end) as modified")
            ->selectRaw(
                "sum(case when status in ('cancelled', 'canceled') then 1 else 0 end) as cancelled",
            )
            ->groupBy(DB::raw('date(created_at)'))
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $timeseries = $this->fillTimeseries($start, $end, $timeseriesRows);

        $providers = (clone $rangeQuery)
            ->select('provider')
            ->selectRaw('count(*) as reservations')
            ->selectRaw('sum(total) as revenue')
            ->groupBy('provider')
            ->orderByDesc('reservations')
            ->get()
            ->map(fn($row) => [
                'provider' => $row->provider,
                'reservations' => (int) $row->reservations,
                'revenue' => (int) $row->revenue,
            ])
            ->values();

        $statuses = (clone $rangeQuery)
            ->select('status')
            ->selectRaw('count(*) as count')
            ->groupBy('status')
            ->orderByDesc('count')
            ->get()
            ->map(fn($row) => [
                'status' => $row->status,
                'count' => (int) $row->count,
            ])
            ->values();

        $queue = [
            'pending' => (int) DB::table('jobs')->whereNull('reserved_at')->count(),
            'processing' => (int) DB::table('jobs')->whereNotNull('reserved_at')->count(),
            'failed' => (int) DB::table('failed_jobs')->count(),
            'processed' => $totals['reservations'],
            'lastRunAt' => Cache::get('reservations:last_run_at'),
            'lastSuccessAt' => Cache::get('reservations:last_success_at'),
            'lastRunDurationMs' => Cache::get('reservations:last_run_duration_ms'),
        ];

        $emailRange = Reservation::query()
            ->where('user_id', $user_id)
            ->whereBetween('created_at', [$start, $end]);

        $email = [];

        return new JsonResponse([
            'range' => [
                'start' => $start->toDateString(),
                'end' => $end->toDateString(),
            ],
            'totals' => $totals,
            'timeseries' => $timeseries,
            'providers' => $providers,
            'statuses' => $statuses,
            'queue' => $queue,
            'email' => $email,
        ], JsonResponse::HTTP_OK);
    }

    /**
     * @param \Illuminate\Support\Collection<string, object> $timeseriesRows
     * @return array<int, array<string, int|string|null>>
     */
    private function fillTimeseries(
        CarbonImmutable $start,
        CarbonImmutable $end,
        $timeseriesRows,
    ): array {
        $cursor = $start;
        $series = [];

        while ($cursor->lte($end)) {
            $date = $cursor->toDateString();
            $row = $timeseriesRows->get($date);

            $series[] = [
                'date' => $date,
                'reservations' => (int) ($row->reservations ?? 0),
                'revenue' => (int) ($row->revenue ?? 0),
                'nights' => (int) ($row->nights ?? 0),
                'guests' => (int) ($row->guests ?? 0),
                'new' => (int) ($row->new ?? 0),
                'modified' => (int) ($row->modified ?? 0),
                'cancelled' => (int) ($row->cancelled ?? 0),
            ];

            $cursor = $cursor->addDay();
        }

        return $series;
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

final class ReservationsListController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user_id = $request->user()->id;

        $reservations = Reservation::query()
            ->with('property')
            ->where('user_id', $user_id)
            ->orderByDesc('created_at')
            ->get();

        return new JsonResponse(
            ReservationResource::collection($reservations),
            JsonResponse::HTTP_OK,
        );
    }
}

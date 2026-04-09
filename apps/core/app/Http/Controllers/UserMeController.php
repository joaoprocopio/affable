<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Jobs\RehashPassword;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

final class UserMeController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        RehashPassword::dispatch();

        return new JsonResponse(new UserResource($request->user()), JsonResponse::HTTP_OK);
    }
}

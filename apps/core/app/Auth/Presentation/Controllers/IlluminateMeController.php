<?php

declare(strict_types=1);

namespace App\Auth\Presentation\Controllers;

use App\Auth\Presentation\Resources\IlluminateUserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

final class IlluminateMeController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        return Response::json(new IlluminateUserResource($request->user()));
    }
}

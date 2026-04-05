<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Controllers\IlluminateMeController;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

final class IlluminateMeController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        return Response::json($request->user());
    }
}

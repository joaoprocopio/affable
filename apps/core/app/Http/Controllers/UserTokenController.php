<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

final class UserTokenController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        return new JsonResponse($request->session()->token(), status: JsonResponse::HTTP_OK);
    }
}

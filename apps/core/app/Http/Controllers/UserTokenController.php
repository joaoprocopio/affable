<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

final class UserTokenController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return new JsonResponse(csrf_token(), status: JsonResponse::HTTP_OK);
    }
}

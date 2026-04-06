<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserMeController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return new JsonResponse(new UserResource($request->user()), status: JsonResponse::HTTP_OK);
    }
}

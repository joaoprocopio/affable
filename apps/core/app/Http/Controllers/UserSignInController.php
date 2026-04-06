<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UserSignInRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;

class UserSignInController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UserSignInRequest $request)
    {
        return new JsonResponse(new UserResource($request->user()), status: JsonResponse::HTTP_OK);
    }
}

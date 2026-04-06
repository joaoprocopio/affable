<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UserSignInRequest;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserSignInController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UserSignInRequest $request)
    {
        $user = User::query()->where("email", $request->email)->first();

        if (!$user) {
            return new JsonResponse(status: JsonResponse::HTTP_BAD_REQUEST);
        }

        $match = Hash::check($request->password, $user->password);

        if (!$match) {
            return new JsonResponse(status: JsonResponse::HTTP_BAD_REQUEST);
        }

        Auth::login($user);

        $request->session()->regenerate();

        return new JsonResponse(new UserResource($user), status: JsonResponse::HTTP_OK);
    }
}

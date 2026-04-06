<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UserSignUpRequest;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserSignUpController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UserSignUpRequest $request)
    {
        $user = User::query()->where("email", $request->email)->first();

        if ($user) {
            return new JsonResponse(status: JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = User::query()->create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        $request->session()->regenerate();

        return new JsonResponse(new UserResource($user), status: JsonResponse::HTTP_OK);
    }
}

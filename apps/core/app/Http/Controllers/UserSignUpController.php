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
use Illuminate\Validation\ValidationException;

final class UserSignUpController extends Controller
{
    public function __invoke(UserSignUpRequest $request): JsonResponse
    {
        $user = User::query()->create([
            'email' => (string) $request->string('email'),
            'password' => Hash::make((string) $request->string('password')),
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return new JsonResponse(new UserResource($user), JsonResponse::HTTP_OK);
    }
}

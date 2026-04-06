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
        $user = User::query()->where('email', $request->string('email')->value())->first();

        if ($user) {
            throw ValidationException::withMessages([
                'email' => [__('auth.email_already_exists')],
            ]);
        }

        $user = User::query()->create([
            'email' => $request->string('email')->value(),
            'password' => Hash::make($request->string('password')->value()),
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return new JsonResponse(new UserResource($user), JsonResponse::HTTP_OK);
    }
}

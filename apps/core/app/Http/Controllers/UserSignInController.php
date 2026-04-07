<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UserSignInRequest;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class UserSignInController extends Controller
{
    public function __invoke(UserSignInRequest $request): JsonResponse
    {
        $email = (string) $request->string('email');
        $password = (string) $request->string('password');

        $user = User::query()->where('email', $email)->first();

        if (!$user || !Hash::check($password, (string) $user->password)) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return new JsonResponse(new UserResource($user), JsonResponse::HTTP_OK);
    }
}

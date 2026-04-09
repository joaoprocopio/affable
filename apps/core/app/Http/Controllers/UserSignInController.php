<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\UserInvalidCredentialsException;
use App\Http\Requests\UserSignInRequest;
use App\Http\Resources\UserResource;
use App\Jobs\RehashPassword;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

final class UserSignInController extends Controller
{
    public function __invoke(UserSignInRequest $request): JsonResponse
    {
        $email = (string) $request->string('email');
        $password = (string) $request->string('password');

        $user = User::query()->where('email', $email)->first();

        if (!$user || !Hash::check($password, (string) $user->password)) {
            throw new UserInvalidCredentialsException();
        }

        Auth::login($user);
        $request->session()->regenerate();

        RehashPassword::dispatch($user, $password);

        return new JsonResponse(new UserResource($user), JsonResponse::HTTP_OK);
    }
}

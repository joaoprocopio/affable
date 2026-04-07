<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\UserEmailTakenException;
use App\Http\Requests\UserSignUpRequest;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

final class UserSignUpController extends Controller
{
    public function __invoke(UserSignUpRequest $request): JsonResponse
    {
        $email = (string) $request->string('email');
        $password = (string) $request->string('password');

        $user = User::query()->where("email", $email)->first();

        if ($user) {
            throw new UserEmailTakenException();
        }

        $user = User::query()->create([
            'email' => $email,
            'password' => Hash::make($password),
        ]);


        Auth::login($user);
        $request->session()->regenerate();

        return new JsonResponse(new UserResource($user), JsonResponse::HTTP_OK);
    }
}

<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Controllers;

use App\Auth\Application\DTOs\SignInDTO;
use App\Auth\Application\DTOs\SignUpDTO;
use App\Auth\Application\UseCases\SignInUseCase;
use App\Auth\Application\UseCases\SignOutUseCase;
use App\Auth\Application\UseCases\SignUpUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

final class IlluminateSignUpController extends Controller
{
    public function __invoke(Request $request, SignUpUseCase $useCase): JsonResponse
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $dto = new SignUpDTO(
            email: $data->email,
            password: $data->password
        );

        $userId = $useCase->execute($dto);

        return Response::json([
            'message' => 'User signed up successfully',
            'user_id' => $userId,
        ]);
    }
}

final class IlluminateMeController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        return Response::json($request->user());
    }
}

final class IlluminateSignInController extends Controller
{
    public function __invoke(Request $request, SignInUseCase $useCase): JsonResponse
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $dto = new SignInDTO(
            email: $data->email,
            password: $data->password,
        );

        $userId = $useCase->execute($dto);

        return Response::json([
            'message' => 'Signed in successfully',
            'user_id' => $userId,
        ]);
    }
}

final class IlluminateSignOutController extends Controller
{
    public function __invoke(Request $request, SignOutUseCase $useCase): JsonResponse
    {
        $useCase->execute($request);
        return Response::json(status: JsonResponse::HTTP_OK);
    }
}

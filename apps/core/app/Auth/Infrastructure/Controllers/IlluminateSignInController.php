<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Controllers\IlluminateSignInController;

use App\Auth\Application\DTOs\SignInDTO;
use App\Auth\Application\UseCases\SignInUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

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

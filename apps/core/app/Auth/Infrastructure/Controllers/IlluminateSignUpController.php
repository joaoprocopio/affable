<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\IlluminateSignUpController;

use App\Auth\Application\DTOs\SignUpDTO;
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

<?php

declare(strict_types=1);

namespace App\Auth\Presentation\Controllers;

use App\Auth\Application\DTOs\SignUpDTO;
use App\Auth\Application\UseCases\SignUpUseCase;
use App\Auth\Domain\ValueObjects\PasswordRaw;
use App\Shared\Domain\ValueObjects\Email;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

final class IlluminateSignUpController extends Controller
{
    public function __construct(private readonly SignUpUseCase $useCase) {}

    public function __invoke(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        $dto = new SignUpDTO(
            email: new Email($data['email']),
            password: new PasswordRaw($data['password'])
        );

        $userId = $this->useCase->execute($dto);

        return Response::json([
            'message' => 'User signed up successfully',
            'user_id' => $userId,
        ], JsonResponse::HTTP_CREATED);
    }
}

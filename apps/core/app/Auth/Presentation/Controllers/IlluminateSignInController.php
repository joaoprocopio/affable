<?php

declare(strict_types=1);

namespace App\Auth\Presentation\Controllers;

use App\Auth\Application\DTOs\SignInDTO;
use App\Auth\Application\UseCases\SignInUseCase;
use App\Auth\Domain\ValueObjects\PasswordRaw;
use App\Shared\Domain\ValueObjects\Email;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

final class IlluminateSignInController extends Controller
{
    public function __construct(private readonly SignInUseCase $useCase) {}

    public function __invoke(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $dto = new SignInDTO(
            email: new Email($data['email']),
            password: new PasswordRaw($data['password'])
        );

        $user = $this->useCase->execute($dto);

        return Response::json([
            'message' => 'Signed in successfully',
            'user_id' => $user->id()->value(),
        ]);
    }
}

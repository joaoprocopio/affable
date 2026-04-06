<?php

declare(strict_types=1);

namespace App\Auth\Presentation\Controllers;

use App\Auth\Application\DTOs\SignInDTO;
use App\Auth\Application\UseCases\SignInUseCase;
use App\Auth\Domain\ValueObjects\PasswordRaw;
use App\Auth\Presentation\Requests\IlluminateSignInRequest;
use App\Shared\Domain\ValueObjects\Email;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

final class IlluminateSignInController extends Controller
{
    public function __construct(private readonly SignInUseCase $useCase) {}

    public function __invoke(IlluminateSignInRequest $request): JsonResponse
    {
        $input = new SignInDTO(
            email: new Email($request->email),
            passwordRaw: new PasswordRaw($request->password),
        );

        $output = $this->useCase->execute($input);

        return Response::json($output);
    }
}

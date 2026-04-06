<?php

declare(strict_types=1);

namespace App\Auth\Presentation\Controllers;

use App\Auth\Application\DTOs\SignUpDTO;
use App\Auth\Application\UseCases\SignUpUseCase;
use App\Auth\Domain\ValueObjects\PasswordRaw;
use App\Auth\Presentation\Requests\IlluminateSignUpRequest;
use App\Shared\Domain\ValueObjects\Email;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

final class IlluminateSignUpController extends Controller
{
    public function __construct(private readonly SignUpUseCase $useCase) {}

    public function __invoke(IlluminateSignUpRequest $request): JsonResponse
    {
        $input = new SignUpDTO(
            email: new Email($request->email),
            passwordRaw: new PasswordRaw($request->password)
        );

        $output = $this->useCase->execute($input);

        return Response::json($output, status: JsonResponse::HTTP_CREATED);
    }
}

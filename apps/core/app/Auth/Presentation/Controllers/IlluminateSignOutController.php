<?php

declare(strict_types=1);

namespace App\Auth\Presentation\Controllers;

use App\Auth\Application\UseCases\SignOutUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

final class IlluminateSignOutController extends Controller
{
    public function __construct(private readonly SignOutUseCase $useCase) {}

    public function __invoke(Request $request): JsonResponse
    {
        $this->useCase->execute($request);

        return Response::json(status: JsonResponse::HTTP_OK);
    }
}

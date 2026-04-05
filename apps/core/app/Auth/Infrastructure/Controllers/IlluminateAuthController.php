<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Controllers;

use App\Auth\Application\DTOs\SignInDTO;
use App\Auth\Application\DTOs\SignUpDTO;
use App\Auth\Application\UseCases\SignInUseCase;
use App\Auth\Application\UseCases\SignOutUseCase;
use App\Auth\Application\UseCases\SignUpUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

final class IlluminateAuthController extends Controller
{
    public function signUp(Request $request, SignUpUseCase $useCase): JsonResponse
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $dto = new SignUpDTO(
            email: is_string($email) ? $email : null,
            password: is_string($password) ? $password : null
        );

        $errors = $this->validator->validate($dto);

        if (count($errors) > 0) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }

            return response()->json(['errors' => $messages], 422);
        }

        $userId = $useCase->execute($dto->email ?? '', $dto->password ?? '');

        return response()->json([
            'message' => 'User signed up successfully',
            'user_id' => $userId,
        ], 201);
    }

    public function signIn(Request $request, SignInUseCase $useCase): JsonResponse
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $dto = new SignInDTO(
            email: is_string($email) ? $email : null,
            password: is_string($password) ? $password : null
        );

        $errors = $this->validator->validate($dto);

        if (count($errors) > 0) {
            $messages = [];
            foreach ($errors as $error) {
                $messages[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }

            return response()->json(['errors' => $messages], 422);
        }

        $userId = $useCase->execute($dto);

        return response()->json([
            'message' => 'Signed in successfully',
            'user_id' => $userId,
        ]);
    }

    public function signOut(Request $request, SignOutUseCase $useCase): Response
    {
        $useCase->execute($request);
        return response()->make(status: JsonResponse::HTTP_OK);
    }

    public function user(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}

<?php

declare(strict_types=1);

namespace App\Auth\Infrastructure\Controllers;

use Illuminate\Routing\Controller;
use App\Auth\Application\DTOs;
use App\Auth\Application\UseCases;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

final class IlluminateAuth extends Controller
{
    public function signUp(Request $request, UseCases\SignUpUseCase $useCase): Response
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

            return Response::json();

            return response()->json(['errors' => $messages], 422);
        }

        $userId = $useCase->execute($dto->email ?? '', $dto->password ?? '');

        return response()->json([
            'message' => 'User signed up successfully',
            'user_id' => $userId,
        ], 201);
    }
}

final class IlluminateMe extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}

final class IlluminateSignIn extends Controller
{
    public function __invoke(Request $request, UseCases\SignIn $useCase): JsonResponse
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $dto = new DTOs\SignIn(
            email: $data->email,
            password: $data->password,
        );

        $userId = $useCase->execute($dto);

        return response()->json([
            'message' => 'Signed in successfully',
            'user_id' => $userId,
        ]);
    }
}

final class IlluminateSignOut extends Controller
{
    public function __invoke(Request $request, UseCases\SignOut $useCase): JsonResponse
    {
        $useCase->execute($request);
        return response()->json(status: JsonResponse::HTTP_OK);
    }
}

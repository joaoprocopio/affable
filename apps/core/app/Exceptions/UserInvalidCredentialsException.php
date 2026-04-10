<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class UserInvalidCredentialsException extends Exception
{
    /**
     * Render the exception as an HTTP response.
     */
    public function render(): JsonResponse
    {
        return new JsonResponse(["code" => "INVALID_CREDENTIALS"], status: JsonResponse::HTTP_UNAUTHORIZED);
    }
}

<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class UserEmailTakenException extends Exception
{
    /**
     * Render the exception as an HTTP response.
     */
    public function render(): JsonResponse
    {
        return new JsonResponse(["code" => "EMAIL_ALREADY_TAKEN"], status: JsonResponse::HTTP_CONFLICT);
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\UserSignUpRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class UserSignOutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UserSignUpRequest $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return new JsonResponse(status: JsonResponse::HTTP_OK);
    }
}

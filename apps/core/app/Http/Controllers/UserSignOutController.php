<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

final class UserSignOutController extends Controller
{
    public function __invoke(Request $request): Response
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return new Response(status: Response::HTTP_OK);
    }
}

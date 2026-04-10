<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

final class UserTokenController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $request->session()->token();

        return new Response(status: Response::HTTP_OK);
    }
}

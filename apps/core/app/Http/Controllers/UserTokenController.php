<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

final class UserTokenController extends Controller
{
    public function __invoke(): Response
    {
        csrf_token();

        return new Response(status: Response::HTTP_OK);
    }
}

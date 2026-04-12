<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

final class PropertiesListController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user_id = $request->user()->id;
        $properties = Property::query()->where('user_id', $user_id)->get();

        return new JsonResponse(PropertyResource::collection($properties), JsonResponse::HTTP_OK);
    }
}

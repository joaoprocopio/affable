<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\PropertyAddRequest;
use App\Http\Resources\PropertyResource;
use App\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

final class PropertiesListController extends Controller
{
    public function __invoke(PropertyAddRequest $request): JsonResponse
    {
        $user_id = $request->user()->id;
        $properties = Property::query()->where('user_id', $user_id);

        return new JsonResponse(new PropertyResource($properties), JsonResponse::HTTP_OK);
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\PropertyAddRequest;
use App\Http\Resources\PropertyResource;
use App\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

final class PropertiesAddController extends Controller
{
    public function __invoke(PropertyAddRequest $request): JsonResponse
    {
        $name = (string) $request->string('name');
        $slug = Str::slug($name);

        $photo = $request->file('coverPhoto');
        $path = $photo->store('properties', 'public');
        $url = Storage::url($path);

        $property = Property::query()->create([
            'slug' => $slug,
            'name' => $name,
            'description' => $request->string('description')->toString() ?: null,
            'base_rate' => (int) $request->input('baseRate'),
            'cover_photo_url' => $url,
            'country' => (string) $request->string('country'),
            'city' => (string) $request->string('city'),
            'state' => $request->string('state')->toString() ?: null,
            'postal_code' => $request->string('postalCode')->toString() ?: null,
            'street' => (string) $request->string('street'),
            'unit' => $request->string('unit')->toString() ?: null,
        ]);

        return new JsonResponse(new PropertyResource($property), JsonResponse::HTTP_CREATED);
    }
}

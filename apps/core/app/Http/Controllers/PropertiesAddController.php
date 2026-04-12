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
        $slug = Str::slug($name) . '-' . bin2hex(random_bytes(4)); // append random byte to prevent slug clashing

        $photo = $request->file('coverPhoto');
        $disk = Storage::disk('local')->put('properties', $photo);
        $url = Storage::url($disk);

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

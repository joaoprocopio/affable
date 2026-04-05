<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;


Route::get('/v1/greeting', function () {
    return response()->json([
        "hello" => "world",
        "foo" => "bar"
    ]);
});

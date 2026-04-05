<?php

declare(strict_types=1);

namespace App\Auth\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class IlluminateSignInRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string',
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Auth\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Email;
use Illuminate\Validation\Rules\Password;

final class IlluminateSignInRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => ['required', Email::default()],
            'password' => ['required', Password::default()],
        ];
    }
}

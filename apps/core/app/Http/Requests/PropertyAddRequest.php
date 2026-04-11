<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\ImageFile;
use Illuminate\Validation\Rules\StringRule;
use Illuminate\Validation\Rules\Numeric;
use Illuminate\Validation\Rules\RequiredIf;

final class PropertyAddRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [new RequiredIf(true), new StringRule()],
            'baseRate' => [new RequiredIf(true), new Numeric()->integer()],
            'coverPhoto' => [new RequiredIf(true), ImageFile::default()],
            'country' => [new RequiredIf(true), new StringRule()],
            'city' => [new RequiredIf(true), new StringRule()],
            'street' => [new RequiredIf(true), new StringRule()],
            'description' => [new RequiredIf(false), new StringRule()],
            'state' => [new RequiredIf(false), new StringRule()],
            'postalCode' => [new RequiredIf(false), new StringRule()],
            'unit' => [new RequiredIf(false), new StringRule()],
        ];
    }
}

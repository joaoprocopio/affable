<?php

namespace App;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('properties')]
#[Fillable(['slug', 'name', 'description', 'base_rate', 'cover_photo_url', 'country', 'city', 'state', 'postal_code', 'street', 'unit'])]
class Property extends Model {}

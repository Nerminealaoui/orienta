<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Institution extends Model
{
    protected $table = 'institutions';

    protected $guarded = [];
    protected $fillable = [
    'institution_type_id',
    'name',
    'description',
    'region',
    'city'
];
}
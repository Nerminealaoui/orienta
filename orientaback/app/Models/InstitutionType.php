<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstitutionType extends Model
{
    protected $table = 'institution_types';

    protected $guarded = [];

    public function institutions()
    {
        return $this->hasMany(Institution::class);
    }
}
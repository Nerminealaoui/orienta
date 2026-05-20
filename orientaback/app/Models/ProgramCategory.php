<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramCategory extends Model
{
    protected $table = 'program_categories';

    protected $guarded = [];

    public function programs()
    {
        return $this->hasMany(Program::class);
    }
}
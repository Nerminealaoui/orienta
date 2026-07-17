<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $table = 'programs';

    protected $guarded = [];

    public function institutions()
    {
        return $this->belongsToMany(
            Institution::class,
            'institution_programs'
        );
    }

    public function category()
    {
        return $this->belongsTo(
            ProgramCategory::class,
            'program_category_id'
        );
    }

    public function careers()
    {
        return $this->hasMany(Career::class);
    }
}
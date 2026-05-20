<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScholarshipCategory extends Model
{
    protected $table = 'scholarship_categories';

    protected $guarded = [];

    public function scholarships()
    {
        return $this->hasMany(Scholarship::class);
    }
}
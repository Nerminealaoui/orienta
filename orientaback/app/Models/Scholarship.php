<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scholarship extends Model
{
    protected $table = 'scholarships';

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(
            ScholarshipCategory::class,
            'scholarship_category_id'
        );
    }
}
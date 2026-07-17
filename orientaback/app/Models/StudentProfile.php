<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentProfile extends Model
{
    protected $table = 'student_profiles';

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function languages()
    {
        return $this->belongsToMany(
            Language::class,
            'student_languages'
        );
    }

    public function softSkills()
    {
        return $this->belongsToMany(
            SoftSkill::class,
            'student_soft_skills'
        );
    }
}
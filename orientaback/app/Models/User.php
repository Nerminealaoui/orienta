<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    public function profile()
    {
        return $this->hasOne(StudentProfile::class);
    }

    public function blogPosts()
    {
        return $this->hasMany(
            BlogPost::class,
            'author_id'
        );
    }
}
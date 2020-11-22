<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ["fullName", "email", "phone","country","bio","dob","gender","sports","fruits"];
}

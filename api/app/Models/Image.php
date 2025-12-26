<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'filename',
        'description',
        'size',
        'mime_type',
    ];

    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        return Storage::disk('s3')->url($this->filename);
    }
}

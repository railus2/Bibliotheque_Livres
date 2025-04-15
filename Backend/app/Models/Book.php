<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
     protected $fillable = [
        'title',
         'author',
        'isbn',
        'category',
         'publication_date',
         'cover_image',
         'rating',
         'summary'
        ];


        public function comments(){
            return $this->hasMany(Comment::class);
        }
}
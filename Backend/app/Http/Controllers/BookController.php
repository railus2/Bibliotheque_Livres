<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{

    public function index()
    {
        return Book::with('comments.user')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
           'title' => 'required',
            'author' => 'required',
            'isbn' => 'required|unique:books',
        ]);
         return Book::create($request->all());
    }

    public function show(Book $book)
    {
       return $book->load('comments.user');
    }

    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required',
             'author' => 'required',
             'isbn' => 'required|unique:books,isbn,'.$book->id,
         ]);
         $book->update($request->all());
         return $book;
    }

    public function destroy(Book $book)
    {
       $book->delete();
         return response()->json(['message' => 'Book deleted'], 204);
    }
}
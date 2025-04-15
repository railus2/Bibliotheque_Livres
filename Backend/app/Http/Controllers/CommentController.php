<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Comment::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $request->validate([
           'user_id' => 'required',
            'book_id' => 'required',
           'content' => 'required'
        ]);
       return Comment::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
       return $comment;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
         $request->validate([
           'user_id' => 'required',
            'book_id' => 'required',
           'content' => 'required'
        ]);
        $comment->update($request->all());
        return $comment;
    }

    /**
     * Remove the specified resource from storage.
     */
     public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json(['message' => 'Comment deleted'], 204);
    }
}
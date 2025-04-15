<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;
use App\Models\Notification;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Loan::with('user','book')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $request->validate([
           'user_id' => 'required',
            'book_id' => 'required',
           'loan_date' => 'required',
            'return_date' => 'required',
        ]);
        return Loan::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Loan $loan)
    {
       return $loan;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Loan $loan)
    {
        $request->validate([
           'user_id' => 'required',
            'book_id' => 'required',
           'loan_date' => 'required',
            'return_date' => 'required',
        ]);
        $loan->update($request->all());
        return $loan;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loan $loan)
    {
        $loan->delete();
        return response()->json(['message' => 'Loan deleted'], 204);
    }
    public function sendNotification(Request $request, Loan $loan)
{
    $message = "Votre emprunt pour le livre \"{$loan->book->title}\" doit être rendu avant le {$loan->return_date}.";
    Notification::create([
        'user_id' => $loan->user_id,
        'message' => $message,
    ]);

    return response()->json(['message' => 'Notification sent to the user.']);
}
}
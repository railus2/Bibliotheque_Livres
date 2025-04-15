<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::apiResource('books', BookController::class);
Route::apiResource('users', UserController::class)->except('store');
Route::apiResource('loans', LoanController::class);
Route::apiResource('comments', CommentController::class);
Route::get('/notifications', [NotificationController::class, 'index'])->middleware('auth:api');
Route::post('/notifications', [NotificationController::class, 'store'])->middleware('auth:api');
Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->middleware('auth:api');
Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->middleware('auth:api');

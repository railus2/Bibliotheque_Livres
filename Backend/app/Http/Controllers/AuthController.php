<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
public function login(Request $request)
{
$credentials = $request->validate([
'name' => ['required'],
'password' => ['required'],
]);
try{
if (Auth::validate($credentials)) {
$user = User::where('name', $credentials['name'])->first();
return response()->json($user);
}
} catch (\Exception $e){
Log::error('Exception during login:' . $e->getMessage());
return response()->json(['error' => 'Unauthorized exception:' . $e->getMessage() . '. Exception message : '. $e->getMessage()]);
}

return response()->json(['error' => 'Unauthorized'], 401);
}
public function register(Request $request)
{
try{
$request->validate([
'name' => 'required',
'email' => 'required|unique:users',
'password' => 'required'
]);
$user = new User();
$user->name = $request->name;
$user->email = $request->email;
$user->password = Hash::make($request->password);
$user->role = 'user';
$user->save();
return response()->json($user);
} catch (\Exception $e){
Log::error('Exception during register:' . $e->getMessage());
return response()->json(['error' => $e->getMessage()], 500);
}
}
}
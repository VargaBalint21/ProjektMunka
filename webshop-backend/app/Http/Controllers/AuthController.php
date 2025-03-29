<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request){

        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email'=> 'required|string|email:dns|unique:users',
            'password' => 'required|string|min:8|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/'
            /*'required',
            'string',
            'min:8',
            'regex:/[A-Z]/',
            'regex:/[a-z]/',      
            'regex:/[0-9]/',*/
         
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone'=> $request->phone,
            

        ]);

        return response()->json(['massage'=> 'Felhasználó sikeresen létrehozva']);

        
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Hibás bejelentkezési adatok'], 401);
        }
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Sikeres bejelentkezés',
            'token' => $token,
            'user' => $user,
        ]);
    }
    
}

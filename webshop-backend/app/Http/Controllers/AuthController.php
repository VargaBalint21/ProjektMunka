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
            'email'=> 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            'phone'=> 'required|string'
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


}

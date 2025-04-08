<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Visszaadja a bejelentkezett felhasználó kosarát
    public function index()
    {
        $user = Auth::user();
        $items = Cart::with('product')->where('user_id', $user->id)->get();
        return response()->json($items);
    }

    // Termék hozzáadása a kosárhoz
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);
    
        $user = Auth::user();
    
        $existing = Cart::where('user_id', $user->id)
                        ->where('product_id', $request->product_id)
                        ->first();
    
        if ($existing) {
            $existing->increment('quantity');
        } else {
            Cart::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => 1,
            ]);
        }
    
        return response()->json(['message' => 'Termék hozzáadva']);
    }

    // Egy termék eltávolítása
    public function destroy(Cart $cart)
    {
        $user = Auth::user();

        if ($cart->user_id !== $user->id) {
            return response()->json(['error' => 'Nincs jogosultság'], 403);
        }

        $cart->delete();

        return response()->json(['message' => 'Termék törölve a kosárból']);
    }

    // Teljes kosár törlése
    public function clear()
    {
        $user = Auth::user();

        Cart::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Kosár kiürítve']);
    }
}

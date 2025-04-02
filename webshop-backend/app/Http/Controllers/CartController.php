<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $cartItems = Cart::with('product')
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->product_id,
                    'name' => $item->product->name,
                    'price' => $item->product->price,
                    'quantity' => $item->quantity,
                ];
            });

        return response()->json($cartItems);
    }

    public function syncCart(Request $request)
    {
        $user = Auth::user();
        $items = $request->input('items', []);

        Cart::where('user_id', $user->id)->delete();

        foreach ($items as $item) {
            Cart::create([
                'user_id' => $user->id,
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
            ]);
        }

        return response()->json(['message' => 'Kosár szinkronizálva']);
    }
}
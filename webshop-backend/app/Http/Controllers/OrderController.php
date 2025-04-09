<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Auth::user()->orders()->with('payment', 'items.product')->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'street' => 'required|string',
            'city' => 'required|string',
            'state' => 'nullable|string',
            'postal_code' => 'required|string',
            'country' => 'required|string',
            'payment_method' => 'required|in:cod,credit_card'
        ]);

        $user = Auth::user();
        $cartItems = Cart::with('product')->where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'A kosár üres'], 400);
        }

        $total = $cartItems->sum(fn($item) => $item->quantity * $item->product->price) / 100;

        $order = Order::create([
            'user_id' => $user->id,
            'total_amount' => $total,
            'order_status' => 'pending'
        ]);

        foreach ($cartItems as $item) {
            $order->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price_at_purchase' => $item->product->price,
            ]);
        }

        $order->payment()->create([
            'payment_method' => $request->payment_method === 'credit_card' ? 'credit_card' : 'bank_transfer',
            'payment_status' => 'pending',
            'amount' => $total,
        ]);

        Cart::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Rendelés sikeresen mentve']);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($request->user()->address);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'street' => 'required|string',
            'city' => 'required|string',
            'state' => 'nullable|string',
            'postal_code' => 'required|string',
            'country' => 'required|string',
        ]);

        $user = $request->user();

        $address = $user->address()->updateOrCreate([], $validated);

        return response()->json([
            'message' => 'Cím sikeresen mentve',
            'address' => $address
        ]);
    }
}

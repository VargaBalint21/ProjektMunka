<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('/products', ProductController::class);

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/users', function () {
    $users = User::all();
    return response()->json($users);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile/address', [AddressController::class, 'show']);
    Route::post('/profile/address', [AddressController::class, 'store']);
});
Route::middleware('auth:sanctum')->get('/profile', function () {
    return auth()->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{cart}', [CartController::class, 'update']);
    Route::delete('/cart/{cart}', [CartController::class, 'destroy']);
    Route::post('/cart/clear', [CartController::class, 'clear']);
});

Route::middleware('auth:sanctum')->group(function () {
    // Megrendelés létrehozása
    Route::post('/order', [OrderController::class, 'store']);

    // Megrendelések listázása 
    Route::get('/orders', [OrderController::class, 'index']);

    // Fizetések lekérése rendeléshez
    Route::get('/order/{order}/payment', [PaymentController::class, 'show']);

});

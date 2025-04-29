<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    /** @var \App\Models\User */
    protected $user;

    /** @var \App\Models\Product */
    protected $product;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Sanctum::actingAs($this->user, ['*']);

        $this->product = Product::factory()->create(['stock' => 5]);
    }

    /** @test */
    public function user_can_add_product_to_cart(): void
    {
        $this->postJson('/api/cart', ['product_id' => $this->product->id])
             ->assertStatus(200)
             ->assertJson(['message' => 'Termék hozzáadva']);

        $this->assertDatabaseHas('carts', [
            'user_id'    => $this->user->id,
            'product_id' => $this->product->id,
            'quantity'   => 1,
        ]);
    }


    /** @test */
    public function user_can_update_cart_quantity(): void
    {
        $cart = Cart::factory()->create([
            'user_id'    => $this->user->id,
            'product_id' => $this->product->id,
            'quantity'   => 1,
        ]);

        $this->putJson("/api/cart/{$cart->id}", ['quantity' => 3])
             ->assertStatus(200)
             ->assertJson(['message' => 'Kosár frissítve']);

        $this->assertDatabaseHas('carts', [
            'id'         => $cart->id,
            'quantity'   => 3,
        ]);
    }

    /** @test */
    public function user_can_clear_cart(): void
    {
        Cart::factory()->count(2)->create(['user_id' => $this->user->id]);

        $this->postJson('/api/cart/clear')
             ->assertStatus(200)
             ->assertJson(['message' => 'Kosár kiürítve']);

        $this->assertDatabaseCount('carts', 0);
    }
}

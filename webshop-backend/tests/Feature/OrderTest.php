<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class OrderTest extends TestCase
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

        $this->product = Product::factory()->create([
            'price' => 1000,
            'stock' => 2,
        ]);

        Cart::factory()->create([
            'user_id'    => $this->user->id,
            'product_id' => $this->product->id,
            'quantity'   => 2,
        ]);
    }

    /** @test */
    public function user_can_place_order_and_stock_is_reduced(): void
    {
        $payload = [
            'first_name'    => $this->user->first_name,
            'last_name'     => $this->user->last_name,
            'email'         => $this->user->email,
            'street'        => 'Minta utca 1.',
            'city'          => 'Budapest',
            'postal_code'   => '1111',
            'country'       => 'Magyarország',
            'payment_method'=> 'cod',
        ];

        $this->postJson('/api/order', $payload)
             ->assertStatus(200)
             ->assertJson(['message' => 'Rendelés sikeresen mentve']);

        $this->assertDatabaseHas('orders', [
            'user_id'      => $this->user->id,
            'total_amount' => 20.00,
        ]);

        $this->assertDatabaseHas('order_items', [
            'product_id' => $this->product->id,
            'quantity'   => 2,
        ]);

        $this->assertEquals(0, Product::find($this->product->id)->stock);
    }

    /** @test */
    public function cannot_place_order_if_not_enough_stock(): void
    {
        $this->product->update(['stock' => 1]);

        $payload = [
            'first_name'    => $this->user->first_name,
            'last_name'     => $this->user->last_name,
            'email'         => $this->user->email,
            'street'        => 'Minta utca 1.',
            'city'          => 'Budapest',
            'postal_code'   => '1111',
            'country'       => 'Magyarország',
            'payment_method'=> 'cod',
        ];

        $this->postJson('/api/order', $payload)
             ->assertStatus(400)
             ->assertJsonFragment(['error' => 'Nincs elég készleten a(z) ' . $this->product->name . ' termékből.']);
    }
}

<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function anyone_can_list_products(): void
    {
        Product::factory()->count(3)->create();

        $this->getJson('/api/products')
             ->assertStatus(200)
             ->assertJsonCount(3);
    }

    /** @test */
    public function admin_can_create_product_with_valid_payload(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin, ['*']);

        $payload = [
            'name'        => 'Új termék',
            'description' => 'Leírás',
            'price'       => 1999.99,
            'stock'       => 10,
            'category_id' => null,
        ];

        $this->postJson('/api/products', $payload)
             ->assertStatus(200)
             ->assertJsonFragment(['name' => 'Új termék']);

        $this->assertDatabaseHas('products', ['name' => 'Új termék']);
    }
}

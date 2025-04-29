<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_register_with_valid_data(): void
    {
        $payload = [
            'first_name' => 'Teszt',
            'last_name'  => 'Felhasználó',
            'email'      => 'test@teszt.com',
            'password'   => 'Password1',
            'phone'      => '+36 20 1234567',
        ];

        $this->postJson('/api/register', $payload)
             ->assertStatus(200)
             ->assertJson(['massage' => 'Felhasználó sikeresen létrehozva']);

        $this->assertDatabaseHas('users', [
            'email' => 'test@teszt.com',
            'first_name' => 'Teszt',
        ]);
    }

    /** @test */
    public function user_can_login_and_receive_token(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('Password1')
        ]);

        $this->postJson('/api/login', [
                'email'    => $user->email,
                'password' => 'Password1',
            ])
            ->assertStatus(200)
            ->assertJsonStructure(['message','token','user' => ['id','first_name','last_name','email']]);
    }
}

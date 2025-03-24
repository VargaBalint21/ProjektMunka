<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\User;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Ergonomic Office Chair',
                'description' => 'Premium ergonomic chair with lumbar support and adjustable height for maximum comfort during long work hours.',
                'price' => 24999,
                'stock' => 15,
                'image' => 'office_chair.jpg',
            ],
            [
                'name' => 'Adjustable Standing Desk',
                'description' => 'Electric height-adjustable desk that allows you to switch between sitting and standing positions with the touch of a button.',
                'price' => 49999,
                'stock' => 10,
                'image' => 'standing_desk.jpg',
            ],
            [
                'name' => 'Wireless Mechanical Keyboard',
                'description' => 'Professional mechanical keyboard with customizable RGB lighting and silent switches for a satisfying typing experience.',
                'price' => 14999,
                'stock' => 25,
                'image' => 'mechanical_keyboard.jpg',
            ],
            [
                'name' => 'Dual Monitor Stand',
                'description' => 'Sturdy desk mount for two monitors, with adjustable height and tilt to improve workspace ergonomics and productivity.',
                'price' => 8999,
                'stock' => 18,
                'image' => 'monitor_stand.jpg',
            ],
            [
                'name' => 'Desk Organizer Set',
                'description' => 'Modern desk organizer with compartments for pens, sticky notes, paper clips, and other office essentials to keep your workspace tidy.',
                'price' => 3499,
                'stock' => 30,
                'image' => 'desk_organizer.jpg',
            ],
            [
                'name' => 'Noise-Cancelling Headphones',
                'description' => 'Premium headphones with active noise cancellation, perfect for focusing in busy office environments or during video meetings.',
                'price' => 19999,
                'stock' => 20,
                'image' => 'headphones.jpg',
            ],
            [
                'name' => 'Wireless Charging Desk Lamp',
                'description' => 'LED desk lamp with adjustable brightness and built-in wireless charger for your smartphone, combining utility and style.',
                'price' => 7999,
                'stock' => 12,
                'image' => 'desk_lamp.jpg',
            ],
            [
                'name' => 'Premium Notebook Set',
                'description' => 'Set of 3 hardcover notebooks with premium paper, perfect for meetings, journaling, and daily task management.',
                'price' => 2499,
                'stock' => 40,
                'image' => 'notebooks.jpg',
            ],
            [
                'name' => 'Ergonomic Mouse',
                'description' => 'Vertical ergonomic mouse designed to reduce wrist strain during long periods of computer work, with programmable buttons.',
                'price' => 5999,
                'stock' => 22,
                'image' => 'ergonomic_mouse.jpg',
            ],
            [
                'name' => 'Desktop Document Scanner',
                'description' => 'Compact high-speed scanner for digitizing documents and receipts, with automatic feeder and cloud integration capabilities.',
                'price' => 17999,
                'stock' => 8,
                'image' => 'document_scanner.jpg',
            ],
        ];

        // Create products
        foreach ($products as $value) {
            Product::create($value);
        }
    }
}

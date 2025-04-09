<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'SAX 620 Fűzőgép Fekete',
                'description' => 'Könnyűfém testű fűzőgép, tűző és fűző finkcióval. Használható kapocsméret: 24/6,26/6 Fűzési mélység: max. 45mm. Egyszerre összefűzhető lapok száma: max.25 lap.',
                'price' => 5190,
                'stock' => 15,
                'image' => 'SAX_620_Fuzogep.jpg',
                'category_id' => 1,
            ],
            [
                'name' => 'Herlitz Álló irattartó karton A4 11 cm, Montana kék',
                'description' => 'A4-es méretű iratok tárolásához készült álló irattartó papucs, karton alapanyagból. 11 cm-es gerincvastagsággal, összehajtható, elegáns Montana design-al, kék színben.',
                'price' => 590,
                'stock' => 10,
                'image' => 'Herlitz_Allo_irattarto_karton_A4.jpg',
                'category_id' => 1,
            ],
            [
                'name' => 'Bi-Office parafatábla, 80x60 cm',
                'description' => ' Bi-Office parafatábla Mérete: 80x60 cm',
                'price' => 6490 ,
                'stock' => 25,
                'image' => 'Bi_Office_parafatabla_80x60cm.jpg',
                'category_id' => 1,
            ],
            [
                'name' => 'Stylex fénymásolópapír, A4, 80 g, 80 lap',
                'description' => 'Stylex fénymásolópapír, A4, 80 g, 80 lap A4-es méretű fénymásoló papír 80 lap /csomag',
                'price' => 1190,
                'stock' => 18,
                'image' => 'Stylex_fenymasolopapir_A4_80g_80lap.jpg',
                'category_id' => 1,
            ],
            [
                'name' => '3M Post-it öntapadós jegyzettömb (51x51 mm, 400 lap) sárga, pink, zöld, v.kék',
                'description' => '3M Post-it öntapadós jegyzettömb (51x51 mm, 400 lap), sárga, pink, zöld, világoskék Post-it® Jegyzettömb, mini kocka, különböző színekben. Ideális kiegészítője az íróasztalának, vagy polcának, hogy sohase fogyjon ki papírból, ha jó ötletei vannak. Lapjai, kis méretük miatt, ideálisak rövid információk feljegyzésére. Tulajdonságok: • Mérete: 51 × 51 mm • Színe:  4-színű (sárga, pink, zöld, világoskék) • 400 lap / tömb • Anyaga: PEFC-tanúsítvánnyal rendelkező (környezettudatos erdőgazdálkodásból származó) papír',
                'price' => 2590,
                'stock' => 30,
                'image' => '3M_Post-it_ontapados_jegyzettomb.png',
                'category_id' => 1,
            ],
            [
                'name' => 'ICO Süni füzet, bekötött sulikész, vonalas 3.osztályos 12-32 (32 lap A/5)',
                'description' => 'ICO Süni füzet, bekötött sulikész, vonalas 3.osztályos 12-32 (32 lap A/5) A5-ös méretű fűzött, matt fóliával bekötött 3. osztályos vonalas füzet. ( 32 lap )',
                'price' => 390,
                'stock' => 20,
                'image' => 'ICO_Suni_fuzet_bekotott_sulikesz_vonalas_3.osztalyos.jpg',
                'category_id' => 2,
            ],
            [
                'name' => 'Herlitz Spirálblokk A5, 50 lapos, vonalas',
                'description' => 'A5-ös méretű 50 lapos felül spirálozott jegyzetblokk, 60g/m2-es famentes, vonalas belívvel, az x.book termékcsalád része.',
                'price' => 690,
                'stock' => 12,
                'image' => 'Herlitz_Spiralblokk_A5_50lapos_vonalas.jpg',
                'category_id' => 2,
            ],
            [
                'name' => 'Ars Una csomagolt füzetcímke (3 x 6 db) Spirit of Nature (5422) 24',
                'description' => 'Ars Una csomagolt füzetcímke (3 x 6 db) Spirit of Nature Öntapadós papír füzetcímke, egy csomagban különböző mintákkal 3 ív x 6 db, összesen 18 db található. Felakasztható fejléccel. Méret: 156 x 172 mm',
                'price' => 350,
                'stock' => 40,
                'image' => 'Ars_Una_csomagolt_fuzetcimke_Spirit_of_Nature.png',
                'category_id' => 2,
            ],
            [
                'name' => 'Scooli háromszintes tolltartó (EberhardFaber írószerekkel töltött), Super Mario',
                'description' => 'Scooli háromszintes tolltartó Super Mario (EberhardFaber írószerekkel töltött) Háromszintes, cipzáros, EberhardFaber írószerekkel töltött tolltartó. Belül műanyaggal bevont merev lapokkal  A tolltartó tartalma: 21 db kiváló minőségű háromszög alakú színes ceruza 2 db háromszög alakú ceruza 1 db radír 1 db háromszög és 1db 17cm-es vonalzó 1 db hegyező 2 db ABC-sablonnal 1 db Super Mario órarend Méretek: 12 x 19 x 7 cm',
                'price' => 9990,
                'stock' => 22,
                'image' => 'Scooli_haromszintes_tolltarto_Super_Mario.png',
                'category_id' => 2,
            ],
            [
                'name' => 'CoolPack Hátizsák Toby Disney Core Stitch',
                'description' => 'CoolPack Hátizsák Toby Disney Core Stitch Főbb jellemzők: Párnázott és állítható puha vállpántok Nagy fő rekesz, párnázott hátsó és alsó rész Elülső cipzáras zseb Fényvisszaverő elemek Vízálló Űrtartalom 10 liter. Mérete: 34 x 25 x 11 cm',
                'price' => 14990,
                'stock' => 8,
                'image' => 'Cool_Pack_Hatizsag_Toby_Disney_Core_Stitch.jpg',
                'category_id' => 2,
            ],
            [
                'name' => 'Parker Jotter golyóstoll, rozsdamentes acél',
                'description' => 'Elegáns és megbízható golyóstoll rozsdamentes acél testtel és kék tintával.',
                'price' => 5990,
                'stock' => 10,
                'image' => 'Parker_Jotter_golyostoll.jpg',
                'category_id' => 3,
            ],
            [
                'name' => 'Faber-Castell színes ceruza készlet, 24 darabos',
                'description' => 'Prémium minőségű színes ceruzák élénk színekkel és könnyű hegyezhetőséggel.',
                'price' => 3490,
                'stock' => 30,
                'image' => 'Faber_Castell_szines_ceruza.jpg',
                'category_id' => 3,
            ],
            [
                'name' => 'Stabilo Boss szövegkiemelő készlet, 4 darabos',
                'description' => 'Klasszikus szövegkiemelők élénk színekben, hosszú élettartammal.',
                'price' => 2490,
                'stock' => 25,
                'image' => 'Stabilo_Boss_szovegkiemelo.jpg',
                'category_id' => 3,
            ],
            [
                'name' => 'Sharpie filctoll készlet, 12 darabos',
                'description' => 'Tartós és élénk színű filctollak, amelyek különböző felületeken is használhatók.',
                'price' => 3990,
                'stock' => 20,
                'image' => 'Sharpie_filctoll_keszlet.jpg',
                'category_id' => 3,
            ],
            [
                'name' => 'Staedtler fém hegyező, dupla lyukú',
                'description' => 'Kiváló minőségű fém hegyező, amely két különböző méretű ceruzához is alkalmas.',
                'price' => 890,
                'stock' => 50,
                'image' => 'Staedtler_fem_hegyezo.jpg',
                'category_id' => 3,
            ],
        ];

        // Create products
        foreach ($products as $value) {
            Product::create($value);
        }
    }
}

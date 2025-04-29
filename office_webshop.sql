-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 28. 17:01
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `office_webshop`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `street`, `city`, `state`, `postal_code`, `country`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 'Petőfi Sándor utca', 'Budapest', 'Pest', '1221', 'Magyarország', '2025-04-28 12:50:47', '2025-04-28 12:50:47', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `shopping_session_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `quantity`, `shopping_session_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 11, 2, NULL, '2025-04-28 12:50:55', '2025-04-28 12:52:49', NULL),
(3, 2, 1, 1, NULL, '2025-04-28 12:53:48', '2025-04-28 12:53:48', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Irodaszerek', NULL, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(2, 'Iskolaszerek', NULL, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(3, 'Írószerek', NULL, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000001_create_shippings_table', 1),
(4, '0001_01_01_000002_create_orders_table', 1),
(5, '2025_03_20_000000_create_categories_table', 1),
(6, '2025_03_21_094116_create_products_table', 1),
(7, '2025_03_21_153910_create_personal_access_tokens_table', 1),
(8, '2025_03_24_132637_create_addresses_table', 1),
(9, '2025_03_24_133105_create_shopping_sessions_table', 1),
(10, '2025_03_24_133230_create_carts_table', 1),
(11, '2025_03_24_133535_create_order_items_table', 1),
(12, '2025_03_24_133641_create_payments_table', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `shipping_id` bigint(20) UNSIGNED DEFAULT NULL,
  `order_status` enum('pending','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_amount`, `shipping_id`, `order_status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 171.70, NULL, 'pending', '2025-04-28 12:56:12', '2025-04-28 12:56:12', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_at_purchase` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `payment_method` enum('credit_card','paypal','bank_transfer') NOT NULL,
  `payment_status` enum('pending','completed','failed') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'auth_token', 'db3d5c4c15e0a358b17218010613ef9b2b4fe45daca6eebc0860687973e891dc', '[\"*\"]', '2025-04-28 12:56:12', NULL, '2025-04-28 12:50:23', '2025-04-28 12:56:12');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) NOT NULL DEFAULT 'placeholder.jpg',
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `image`, `category_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'SAX 620 Fűzőgép Fekete', 'Könnyűfém testű fűzőgép, tűző és fűző finkcióval. Használható kapocsméret: 24/6,26/6 Fűzési mélység: max. 45mm. Egyszerre összefűzhető lapok száma: max.25 lap.', 5190.00, 15, 'SAX_620_Fuzogep.jpg', 1, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(2, 'Herlitz Álló irattartó karton A4 11 cm, Montana kék', 'A4-es méretű iratok tárolásához készült álló irattartó papucs, karton alapanyagból. 11 cm-es gerincvastagsággal, összehajtható, elegáns Montana design-al, kék színben.', 590.00, 10, 'Herlitz_Allo_irattarto_karton_A4.jpg', 1, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(3, 'Bi-Office parafatábla, 80x60 cm', ' Bi-Office parafatábla Mérete: 80x60 cm', 6490.00, 25, 'Bi_Office_parafatabla_80x60cm.jpg', 1, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(4, 'Stylex fénymásolópapír, A4, 80 g, 80 lap', 'Stylex fénymásolópapír, A4, 80 g, 80 lap A4-es méretű fénymásoló papír 80 lap /csomag', 1190.00, 18, 'Stylex_fenymasolopapir_A4_80g_80lap.jpg', 1, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(5, '3M Post-it öntapadós jegyzettömb (51x51 mm, 400 lap) sárga, pink, zöld, v.kék', '3M Post-it öntapadós jegyzettömb (51x51 mm, 400 lap), sárga, pink, zöld, világoskék Post-it® Jegyzettömb, mini kocka, különböző színekben. Ideális kiegészítője az íróasztalának, vagy polcának, hogy sohase fogyjon ki papírból, ha jó ötletei vannak. Lapjai, kis méretük miatt, ideálisak rövid információk feljegyzésére. Tulajdonságok: • Mérete: 51 × 51 mm • Színe:  4-színű (sárga, pink, zöld, világoskék) • 400 lap / tömb • Anyaga: PEFC-tanúsítvánnyal rendelkező (környezettudatos erdőgazdálkodásból származó) papír', 2590.00, 30, '3M_Post-it_ontapados_jegyzettomb.png', 1, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(6, 'ICO Süni füzet, bekötött sulikész, vonalas 3.osztályos 12-32 (32 lap A/5)', 'ICO Süni füzet, bekötött sulikész, vonalas 3.osztályos 12-32 (32 lap A/5) A5-ös méretű fűzött, matt fóliával bekötött 3. osztályos vonalas füzet. ( 32 lap )', 390.00, 20, 'ICO_Suni_fuzet_bekotott_sulikesz_vonalas_3.osztalyos.jpg', 2, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(7, 'Herlitz Spirálblokk A5, 50 lapos, vonalas', 'A5-ös méretű 50 lapos felül spirálozott jegyzetblokk, 60g/m2-es famentes, vonalas belívvel, az x.book termékcsalád része.', 690.00, 12, 'Herlitz_Spiralblokk_A5_50lapos_vonalas.jpg', 2, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(8, 'Ars Una csomagolt füzetcímke (3 x 6 db) Spirit of Nature (5422) 24', 'Ars Una csomagolt füzetcímke (3 x 6 db) Spirit of Nature Öntapadós papír füzetcímke, egy csomagban különböző mintákkal 3 ív x 6 db, összesen 18 db található. Felakasztható fejléccel. Méret: 156 x 172 mm', 350.00, 40, 'Ars_Una_csomagolt_fuzetcimke_Spirit_of_Nature.png', 2, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(9, 'Scooli háromszintes tolltartó (EberhardFaber írószerekkel töltött), Super Mario', 'Scooli háromszintes tolltartó Super Mario (EberhardFaber írószerekkel töltött) Háromszintes, cipzáros, EberhardFaber írószerekkel töltött tolltartó. Belül műanyaggal bevont merev lapokkal  A tolltartó tartalma: 21 db kiváló minőségű háromszög alakú színes ceruza 2 db háromszög alakú ceruza 1 db radír 1 db háromszög és 1db 17cm-es vonalzó 1 db hegyező 2 db ABC-sablonnal 1 db Super Mario órarend Méretek: 12 x 19 x 7 cm', 9990.00, 22, 'Scooli_haromszintes_tolltarto_Super_Mario.png', 2, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(10, 'CoolPack Hátizsák Toby Disney Core Stitch', 'CoolPack Hátizsák Toby Disney Core Stitch Főbb jellemzők: Párnázott és állítható puha vállpántok Nagy fő rekesz, párnázott hátsó és alsó rész Elülső cipzáras zseb Fényvisszaverő elemek Vízálló Űrtartalom 10 liter. Mérete: 34 x 25 x 11 cm', 14990.00, 8, 'Cool_Pack_Hatizsag_Toby_Disney_Core_Stitch.jpg', 2, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(11, 'Parker Jotter golyóstoll, rozsdamentes acél', 'Elegáns és megbízható golyóstoll rozsdamentes acél testtel és kék tintával.', 5990.00, 8, 'Parker_Jotter_golyostoll.jpg', 3, '2025-04-28 12:42:53', '2025-04-28 12:56:12', NULL),
(12, 'Faber-Castell színes ceruza készlet, 24 darabos', 'Prémium minőségű színes ceruzák élénk színekkel és könnyű hegyezhetőséggel.', 3490.00, 30, 'Faber_Castell_szines_ceruza.jpg', 3, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(13, 'Stabilo Boss szövegkiemelő készlet, 4 darabos', 'Klasszikus szövegkiemelők élénk színekben, hosszú élettartammal.', 2490.00, 25, 'Stabilo_Boss_szovegkiemelo.jpg', 3, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(14, 'Sharpie filctoll készlet, 12 darabos', 'Tartós és élénk színű filctollak, amelyek különböző felületeken is használhatók.', 3990.00, 20, 'Sharpie_filctoll_keszlet.jpg', 3, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(15, 'Staedtler fém hegyező, dupla lyukú', 'Kiváló minőségű fém hegyező, amely két különböző méretű ceruzához is alkalmas.', 890.00, 50, 'Staedtler_fem_hegyezo.jpg', 3, '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `shippings`
--

CREATE TABLE `shippings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `address` text NOT NULL,
  `shipping_method` enum('standard','express') NOT NULL,
  `shipping_cost` decimal(10,2) NOT NULL,
  `tracking_number` varchar(255) DEFAULT NULL,
  `shipping_status` enum('pending','shipped','delivered') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `shopping_sessions`
--

CREATE TABLE `shopping_sessions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `session_token` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','customer') NOT NULL DEFAULT 'customer',
  `phone` varchar(15) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `email_verified_at`, `password`, `role`, `phone`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin', 'Admin', 'admin@admin.com', '2025-04-28 12:42:52', '$2y$12$DWN1xZkh/yNnXugyTbLzMuYFY3eQE6maPzOXzURczG2BHfdXcTgK6', 'admin', '1234567890', 'FwEHJpTngJ', '2025-04-28 12:42:53', '2025-04-28 12:42:53', NULL),
(2, 'Bálint', 'Varga', 'email@gmail.com', NULL, '$2y$12$OoDiWEMgliL1GbBtXQNpRurL2SrwQhM8DhgxLxKVlaYdNluZ2Cr0S', 'customer', '+36 21 213 4141', NULL, '2025-04-28 12:50:11', '2025-04-28 12:50:11', NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_user_id_foreign` (`user_id`);

--
-- A tábla indexei `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`),
  ADD KEY `carts_product_id_foreign` (`product_id`),
  ADD KEY `carts_shopping_session_id_foreign` (`shopping_session_id`);

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_unique` (`name`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`),
  ADD KEY `orders_shipping_id_foreign` (`shipping_id`);

--
-- A tábla indexei `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- A tábla indexei `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_order_id_foreign` (`order_id`);

--
-- A tábla indexei `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- A tábla indexei `shippings`
--
ALTER TABLE `shippings`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `shopping_sessions`
--
ALTER TABLE `shopping_sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shopping_sessions_session_token_unique` (`session_token`),
  ADD KEY `shopping_sessions_user_id_foreign` (`user_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `shippings`
--
ALTER TABLE `shippings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `shopping_sessions`
--
ALTER TABLE `shopping_sessions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `carts_shopping_session_id_foreign` FOREIGN KEY (`shopping_session_id`) REFERENCES `shopping_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_shipping_id_foreign` FOREIGN KEY (`shipping_id`) REFERENCES `shippings` (`id`),
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Megkötések a táblához `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Megkötések a táblához `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `shopping_sessions`
--
ALTER TABLE `shopping_sessions`
  ADD CONSTRAINT `shopping_sessions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

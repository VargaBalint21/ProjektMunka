## Telepítési és használati útmutató

### Webes kliens indítása

# 1. Backend futtatása

XAMPP elindítása: Apache, MySQL

### Lépj be a backend mappába
cd webshop-backend

### Composer csomagok telepítése
composer install

### Környezeti fájl létrehozása és kulcsgenerálás
cp .env.example .env
php artisan key:generate

### Adatbázis migrálása és feltöltése tesztadatokkal
php artisan migrate:fresh --seed

### Szerver indítása
php artisan serve

### hasznos parancsok
(php artisan test - php artisan optimize)

# 2. Frontend futtatása
### Lépj be a frontend mappába
cd webshop-frontend

### NPM csomagok telepítése
npm install

### Fejlesztői szerver indítása
npm run dev

# 3.	Asztali alkalmazás indítása
Visual Studio-ban nyisd meg a WPF projektet
Indítsd el a megadott OnStartup logika szerint
vagy
Nyissa meg az OfficeWebshopAdminPanelApp mappán belül az OfficeWebshopAdminPanel.exe-t


## Készítők: Galambos Bence, Pál Barna, Varga Bálint

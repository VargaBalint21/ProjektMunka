Használati instrukciók
1.	Webes kliens indítása
o	Backend futtatása: 
o	cd webshop-backend
o	composer install
o	cp .env.example .env && php artisan key:generate
o	php artisan migrate:fresh --seed
o	php artisan serve
o	Frontend futtatása
o	cd webshop-frontend
o	npm install
o	npm run dev

2.	Asztali alkalmazás indítása
o	Visual Studio-ban nyisd meg a WPF projektet
o	Futtatás előtt ellenőrizd, hogy a AuthService.Token üresen indul
o	Indítsd el a megadott OnStartup logika szerint
o	vagy
o	Nyissa meg az OfficeWebshopAdminPanelApp mappán belül az OfficeWebshopAdminPanel.exe-t


Galambos Bence, Pál Barna, Varga Bálint

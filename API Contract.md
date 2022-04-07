# API Smart-Record

- [API Smart-Record](#api-smart-record)
	- [Najważniejsze informacje](#najważniejsze-informacje)
	- [Kody odpowiedzi używane tym w API](#kody-odpowiedzi-używane-tym-w-api)
	- [Format danych](#format-danych)
	- [Zabezpieczenia](#zabezpieczenia)
	- [Punkty końcowe](#punkty-końcowe)
		- [Tabela poglądowa](#tabela-poglądowa)
		- [Definicje ENUM](#definicje-enum)
		- [Punkty końcowe dla pracownika](#punkty-końcowe-dla-pracownika)
			- [Pobranie informacji o przedmiocie](#pobranie-informacji-o-przedmiocie)
			- [Pobieranie listy przedmiotów](#pobieranie-listy-przedmiotów)
			- [Aktualizacja danych użytkownika](#aktualizacja-danych-użytkownika)
			- [Wypożyczanie przedmiotu](#wypożyczanie-przedmiotu)
			- [Zwracanie przedmiotu](#zwracanie-przedmiotu)
			- [Pobranie listy wypożyczonych przedmiotów](#pobranie-listy-wypożyczonych-przedmiotów)
			- [Logowanie uzytkownika](#logowanie-uzytkownika)
			- [Wylogowanie użytkownika](#wylogowanie-użytkownika)
		- [Punkty końcowe dla magazyniera](#punkty-końcowe-dla-magazyniera)
			- [Dodawanie nowego przedmiotu](#dodawanie-nowego-przedmiotu)
			- [Aktualizacja grupy przedmiotów](#aktualizacja-grupy-przedmiotów)
			- [Usunięcie grupy przedmiotów](#usunięcie-grupy-przedmiotów)
			- [Aktualizacja przedmiotu](#aktualizacja-przedmiotu)
			- [Usuwanie przedmiotu](#usuwanie-przedmiotu)
			- [Dodawanie nowego użytkownika](#dodawanie-nowego-użytkownika)

## Najważniejsze informacje

* Wszystkie zapytania zwracają tablice lub obiekty JSON
* Podstawowe jednostki w API to: przedmiot `item`, wypożyczenie `rental`, użytkownik `user`.

## Kody odpowiedzi używane tym w API
Każda błędna odpowiedź zwraca wiadomość z informacja jaki konkrtnie błąd wystąpił

* HTTP `4XX` - używane dla błędnych zapytań. Błąd zawsze po stronie klienta. Czyli jak wywala `4XX` to wysłałeś złe zapytanie ;p.
* HTTP `400` - niepoprawne zapytanie.
* HTTP `403` - autoryzacja nideudana. Przy endpoincie `/login` oznacza niepoprawne dane autoryzacji.
* HTTP `404` - zasób `GET` nie istnieje.
* HTTP `409` - zasób `POST` już istnieje.
* HTTP `5XX` - błąd po stronie serwera.

## Format danych

* Dane w zapytaniach `GET` i `DELETE` powinny być wysłane w URI (czyli linku - np. `localhost:8080/user?id=1`)
* Dane w zapytaniach `POST` i `PUT` powinny być wysłane w `request body` w formacie JSON (`application/json`). Kolejność parametrów jest dowolna.

## Zabezpieczenia

* Każdy punkt końcowy jest zabezpieczony i wymaga autoryzacji tokenem.
* Różne punkty końcowe są dostępne dla użytkowników z różnymi uprawnieniami, zgodnie z podziałem punktów końcowych poniej.
* Token generuje się przez zapytanie do endpointu [/login](#logowanie-uzytkownika).
* Token ma być wysłany przez użytkownika w nagłówku `Authorization`.
* Token ma zawierać przedrostek `Bearer `, jest on z nim generowany.
* Wygenerowany token ma ważność 14 dni, po 14 dniach wygasa i nalezy zalogowac sie ponownie.
* Aby wylogować się (zakończyć sesję) należy usunąć token z pamięci klienta. Tokeny nie są przechowywane w bazie danych, tylko sprawdzane na podstawie klucza (zgodnie ze standardem JWT).

## Punkty końcowe 

### Tabela poglądowa

Kolorem zielonym oznaczone są endpointy dostępne dla magazyniera, kolorem niebieskim dla pracownika.  
Endpointy oznaczone kursywą będą dodane w przyszłości.

| Zasób | POST | PUT | GET | DELETE |
|-------|------|-----|-----|--------|
|/login| <blue>Logowanie</blue>|Błąd |Błąd | Błąd 
|/item  |<green>Dodanie nowej grupy przedmiotów</green>|*Aktualizacja grupy przedmiotów*|<blue>Pobranie listy przedmiotów</blue>|*Usunięcie grupy przedmiotów*|
|/item/{itemId}|Błąd|Aktualizacja przedmiotu|<blue>Pobranie informacji o przedmiocie</blue>|Usunięcie przedmiotu|
|/user| Dodanie nowego użytkownika | <blue>Aktualizacja swoich danych</blue>| Pobranie listy użytkowników | *Usunięcie grupy użytkowników*
|/user/{userId}| Brak | Aktualizacja danych użytkownika | Pobranie danych użytkownika | Usunięcie użytkownika
|/user/rental|<blue>Wypozyczenie przedmiotu</blue> | Błąd | <blue>Pobranie swoich wypozyczen</blue>| Błąd
|/user/rental/{rentalId}|Błąd | Błąd | <blue>Pobranie informacji o wypozyczeniu</blue>| <blue>Zwrócenie przedmiotu</blue> 
|/rental| Dodanie wypozyczenia | Błąd | Pobranie listy wypożyczeń | *Zakończenie grupy wypożyczeń*
|/rental/{rentalId}| Błąd| Błąd | Pobranie informacji o wypożyczeniu | Zakończenie wypożyczenia
<!-- |/user/{id}/rental| <blue>Wypozyczenie przedmiotu</blue> | Błąd | <blue>Pobranie swoich wypozyczen</blue>| <blue>Zwrócenie przedmiotu</blue>  -->
### Definicje ENUM

Sortowanie (sort)

| Wartość| Opis   |
|--------|--------|
|nameASC |według nazwy, rosnąco|
|nameDESC |według nazwy, malejąco|
|quantityASC |według ilości, rosnąco|
|quantityDESC |według ilości, malejąco|

Rola (role)

| Wartość| Opis   |
|--------|--------|
|EMPLOYEE|pracownik, użytkownik z tą rolą ma dostęp tylko do panelu pracownika|
|WAREHOUSEMAN|magazynier, ma dostęp do panelu magazyniera i pracownika (w aplikacji mobilnej)|
|ADMIN|administrator, ma dostęp do panelu pracownika, magazyniera i administratora|
### Punkty końcowe dla pracownika

#### Pobranie informacji o przedmiocie

Zwraca informacje wyświetlane w widoku przedmiotu. Jest dostępne dla pracownika, magazyniera oraz administratora.

```
GET /item/{id}?byCode=true
```

Parametry w uri

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|byCode|bool|nie|jeżeli true w uri zamiast zmiennej id powinien znaleźć się numer kodu kreskowego|


Odpowiedź

HTTP `200`

```javascript
{
	"id":1234,               //id przedmiotu
	"name":"Wiertarka Bosch",//nazwa przedmiotu
	"description":"Wiert...",//opis
	"isReturnable":false,    //czy przedmiot jest zwrotny
	"quantity":5,            //ilosc
	"timeLimit":48,          //dozwolony czas wypozyczenia w godzinach
	"criticalQuantity":2,    //ilość krytyczna
	"category":              //kategoria
	{
		"id":5,                //id kategorii
		"name":"ubrania"       //nazwa kategorii
	},
	"allowedGroups":         //dozwolone grupy
	[
		{
			"id":2,                    //id grupy
			"name":"Dział marketingu"  //nazwa grupy
		}
	]
}
```

#### Pobieranie listy przedmiotów 

```
GET /item?search=wiertarka?offset=20
```

Parametry

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|search |string|nie|fraza do wyszukiwania |
|offset |int|nie| przesuniecie listy |
<!-- |name |string|nie|do filtrowania, może być niepełna |
|isReturnable |boolean|nie|do filtrowania|
|category | integer |nie|do filtrowania|
|isRent | boolean |nie|do filtrowania|
|sort|enum (string)|nie|domyslnie "nameUp"| -->

Odpowiedź

Zwraca tablice o dlugosci maksymalnie 20 obiektów

HTTP `200`

```javascript
[
    {
        "id": 1,                         //id przedmiotu
        "quantity": -1,                  //ilosc (przy bezzwrotnych nie brana pod uwage)
        "itemTemplate": {
            "id": 1,                     //id wzorca przedmiotu
            "name": "Wiertarka Bosch",   //nazwa 
            "model": "wiertakrka GHB600",//model
            "description": "super...",   //opis
            "timeLimit": 48,             //maksymalny czas trwania wypozyczenia podawany w godzinach
            "criticalQuantity": 15,      //ilosc krytyczna
            "category": {                //kategoria
                "id": 1,
                "name": "Narzedzia"     
            },             
            "groups": [                  //grupy
                {
                    "id": 1,
                    "name": "Pracownicy biurowi"
                }
            ],
            "returnable": false,         //zwrotny
            "hibernateLazyInitializer": {}//zignorowac
        }
    }
]
```
#### Aktualizacja danych użytkownika

Jest dostępna dla pracownika, magazyniera i administratora. Resztę atrybutów można zaktualizować z poziomu administratora poprzez endpoint `/user/{id}`

```
PUT /user
```

Parametry

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|password|string|tak||
|newEmail|string|nie||
|newPassword|string|nie||

Odpowiedź

HTTP `200`

#### Wypożyczanie przedmiotu

```
POST /user/rental 
```

Zapytanie jest **tablicą obiektów** z poniższymi parametrami.

Parametry

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|code|int|tak|jest to numer kodu kreskowego przedmiotu|
|quantity|int|nie|jeśli bezzwrotny to podawana jest ilość|

Odpowiedź

HTTP `201`

```
[
	{
		"id":1234        //id wypożyczenia
		"item_id":1234   //id przedmiotu
	}
]
```

#### Zwracanie przedmiotu

```
DELETE /user/{id}/rental 
```

Zapytanie jest **tablicą obiektów** z poniższymi parametrami.

Parametry

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|code|int|tak|jest to numer kodu kreskowego przedmiotu|

Odpowiedź

HTTP `204`

#### Pobranie listy wypożyczonych przedmiotów

```
GET /user/{id}/rental 
```


Odpowiedź

HTTP `201`

```javascript
[
	{
		"id":1234,               //id przedmiotu
		"name":"Wiertarka Bosch" //nazwa przedmiotu
		"timeToReturn":48,       //czas do zwrotu
	}
]
```


#### Logowanie uzytkownika

```
POST /login
```
Parametry

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|username|string|tak|email użytkownika|
|password|string|tak|hash hasła użytkownika|

Algorytm hashujący do wybrania


Odpowiedź

HTTP `200`

```javascript
[
	{
		"token": "Bearer eyJhbG..." //token, który będzie używany do weryfikacji
	}
]
```

#### Wylogowanie użytkownika

Aby wylogować użytkownika należy usunąć token. 

___

### Punkty końcowe dla magazyniera


#### Dodawanie nowego przedmiotu

```
POST /item 
```

Parametry

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|code |long|tak||
|quantity |integer|tak||
|itemTemplateId |long|nie|id wzorca przedmiotu |
|itemTemplate|object|nie|należy zawrzeć jeśli nie zawarto itemTemplateId|

obiekt  `itemTemplate`

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|name |string|tak||
|category |string|tak||
|description|string|nie||
|crticalQuantity|int|nie||
|timeLimit|string|nie|jesli brak to nielimitowany|
|allowedGroups|array of integers|nie|zawiera id dozwolonych grup|


Odpowiedź

HTTP `200`

```
{
	"id":1234   //id dodanego przedmiotu
}
```

#### Aktualizacja grupy przedmiotów

```
PUT /item 
```

#####Opcjonalnie dodane zostanie zapytanie PATCH, ktore nie wymaga wszystkich parametrow.

Zapytanie jest **tablicą obiektów** z poniższymi parametrami.

Parametry

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|id |string|tak||
|name |string|tak||
|category |string|tak||
|description|string|tak||
|crticalQuantity|int|tak||
|timeLimit|string|tak||
|allowedGroups|string|tak||

Odpowiedź

HTTP `200`


#### Usunięcie grupy przedmiotów
```
DELETE /item 
```
Zapytanie jest **tablicą obiektów** z poniższymi parametrami.

Parametry

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
| id  |int| tak    |    |

Odpowiedź

HTTP `204`

#### Aktualizacja przedmiotu

```
PUT /item/{id}
```

Parametry

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|name |string|tak||
|category |string|tak||
|description|string|tak||
|crticalQuantity|int|tak||
|timeLimit|string|tak||
|allowedGroups|string|tak||

Odpowiedź

HTTP `200`


#### Usuwanie przedmiotu

```
DELETE /item/{id}
```

Odpowiedź

HTTP `204`

#### Dodawanie nowego użytkownika

```
POST /user
```


Parametry

|Nazwa|Typ|Wymagany|Opis|
|-----|---|--------|----|
|name |string|tak||
|surname |int|tak||
|isReturnable| bool|tak|
|description|string|tak||
|crticalQuantity|int|tak||
|timeLimit|string|tak||
|allowedGroups|string|tak||

Odpowiedź

HTTP `201`

```
{
	"id":1234   //id dodanego użytkownika
}
```


<style>
blue{
	color:#4f92ff;
}

green{
	color:#55cf63;
}

</style>
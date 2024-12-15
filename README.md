# PHP Chess Engine with DDD, CQRS, and React (Alpha)

## Opis
Silnik szachowy napisany w PHP z frontendem w React, z obsługą Domain-Driven Design (DDD) oraz Command Query Responsibility Segregation (CQRS). Aplikacja jest w fazie alpha.

## Funkcje
- Implementacja silnika szachowego w PHP
- Interfejs frontendowy do gry w szachy w React
- Zastosowanie wzorców Domain-Driven Design (DDD)
- Zastosowanie wzorców Command Query Responsibility Segregation (CQRS)
- Obsługa podstawowych zasad gry w szachy
- Zapisywanie i odtwarzanie partii

## Technologie
- PHP
- React.js
- Symfony (dla części backendowej)
- Doctrine ORM (dla DDD)
- PHPUnit (do testów jednostkowych)

## Jak uruchomić

### Krok 1: Sklonuj repozytorium
```sh
git clone https://github.com/twoje-repo/php-chess-engine-ddd-cqrs-react-alpha.git
cd php-chess-engine-ddd-cqrs-react-alpha
```

### Krok 2: Zainstaluj zależności PHP
```sh
composer install
```

### Krok 3: Zainstaluj zależności JavaScript
```sh
npm install
```

### Krok 4: Uruchom MySQL za pomocą Docker Compose
```sh
docker-compose up -d
```

### Krok 5: Uruchom aplikację Symfony
```sh
symfony serve
```

## Struktura katalogów:
- config/
- src/
  - Application/
  - Domain/
  - Infrastructure/
  - UI/
- tests/
- templates/

## Licencja:
MIT License

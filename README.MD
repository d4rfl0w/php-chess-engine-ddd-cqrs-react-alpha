# PHP Chess Engine with DDD, CQRS, and React (Alpha version)

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
- Cypress (do testów end-to-end)

## Struktura Katalogów

src/
├── Game/
│   ├── Application/
│   │   ├── Command/
│   │   ├── Handler/
│   │   ├── Query/
│   │   ├── Response/
│   │   └── Service/
│   │
│   ├── Domain/
│   │   ├── Entity/
│   │   ├── Repository/
│   │   └── ValueObject/
│   │
│   ├── UI/
│   │   ├── Controller/
│   │   └── DTO/
│   │
│   └── Infrastructure/
│       ├── Controller/
│       ├── Persistence/
│       ├── Service/
│       └── Specification/
│
├── Frontend/
│   ├── components/
│   ├── services/
│   └── pages/
│
tests/
config/
docs/

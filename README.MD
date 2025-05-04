# PHP Chess Engine with DDD, CQRS, and React (Alpha version)

## Description
A chess engine written in PHP with a React frontend, implementing Domain-Driven Design (DDD) and Command Query Responsibility Segregation (CQRS). The application is currently in the alpha stage.

## Features
- Chess engine implementation in PHP  
- React-based frontend chess interface  
- Domain-Driven Design (DDD) architecture  
- Command Query Responsibility Segregation (CQRS) patterns  
- Support for basic chess rules  
- Game saving and replay functionality

## Screenshot

![Screenshot](screen.png)

## Technologies
- PHP  
- React.js  
- Symfony (backend)  
- Doctrine ORM (for DDD)  
- PHPUnit (unit testing)  
- Cypress (end-to-end testing)

## Directory Structure

src/<br>
├── Game/<br>
│   ├── Application/<br>
│   │   ├── Command/<br>
│   │   ├── Handler/<br>
│   │   ├── Query/<br>
│   │   ├── Response/<br>
│   │   └── Service/<br>
│   │<br>
│   ├── Domain/<br>
│   │   ├── Entity/<br>
│   │   ├── Repository/<br>
│   │   └── ValueObject/<br>
│   │<br>
│   ├── UI/<br>
│   │   ├── Controller/<br>
│   │   └── DTO/<br>
│   │<br>
│   └── Infrastructure/<br>
│       ├── Controller/<br>
│       ├── Persistence/<br>
│       ├── Service/<br>
│       └── Specification/<br>
│<br>
├── Frontend/<br>
│   ├── components/<br>
│   ├── services/<br>
│   └── pages/<br>
│<br>
tests/<br>
config/<br>
docs/<br>

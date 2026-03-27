# Star Wars Character Search CLI

## Overview
- Welcome to the Star Wars Character Search, a typescript powered CLI application that searches for Star Wars characters in real time using Socket.io
    - Results are streamed back with simulated latency.
    - Supports case-insensitive partial matching and paginated responses.

## Prerequisites
- Node.js 18+
- Docker (for running the server)

## Installation
```bash
docker run -p 3000:3000 aaronbate/socketio-backend
git clone https://github.com/ccelest1/Valstro-Tech-Assessment.git
cd Valstro-Tech-Assessment
npm install
```

## Usage
```bash
# Development
npm run dev

# Production
npm run build
npm run start

# Tests
npm run test
```

## Example
### Start
![Start](/images/Start.png)

### Performing Search
#### Single Row Result
![Performing Search](/images/PerformingSearch.png)
#### Partial Search
![Partial](/images/PartialSearch-1.png)
#### Multiple Characters
![Multiple](/images/MultipleChars-1.png)

### Exit
#### Via `exit` command
![Exit-1](/images/Exit-1.png)
#### Via Ctrl+C
![Exit-2](/images/Exit-2.png)

## Features
- Case-insensitive partial matching
- Paginated response handling
- Input validation (empty, whitespace, unknown queries)
- Graceful exits via `exit` command or Ctrl+C
- Simulated async result

## Project Structure
```
.
├── src/
│   ├── index.ts          # Entry point — initializes socket, starts prompt loop
│   ├── types.ts          # Shared TypeScript interfaces (Character, Film, etc.)
│   └── utils/
│       ├── display.ts    # Console output formatting, result rendering, sleep
│       ├── socket.ts     # Socket.io connection, event emission, response handling
│       └── validation.ts # Input normalization, empty/exit query checks
├── tests/
│   ├── display.test.ts   # Tests for result rendering and prompt sequencing
│   ├── socket.test.ts    # Tests for socket event handling and error responses
│   └── validation.test.ts# Tests for case normalization, empty input, edge cases
├── images/               # Screenshots used in README
├── package.json
├── package-lock.json
├── tsconfig.json
├── vitest.config.ts
├── structure.md
└── README.md
```

## Design Decisions
- **Input normalization at the boundary**: Case normalization, trimming of whitespace occurs at point of input allowing for predictable downstream results
- **Async callback**: Used to prevent silent rejections

## Testing
- Tested with Vitest across three areas:
    1. **Validation**
        - Empty Input
        - Whitespace-only input
        - Case normalization
        - 'exit' keyword detection
    2. **Display**
        - `promptUserInput`
    3. **Socket**
        - Socket event emission on queries
        - Handling of empty and malformed responses

# StarPets QA Test Assignment

Automated UI and API tests implemented with Playwright + TypeScript.

## Stack

- Playwright
- TypeScript
- Page Object Model (POM)

## Project Structure

```
tests/
├── api/
│   └── users.spec.ts
├── ui/
│   └── product.spec.ts

pages/
└── ProductPage.ts

fixtures/
utils/
```

## Installation

```bash
npm install
```

## Run API Tests

```bash
npx playwright test tests/api/users.spec.ts --project=chromium
```

## Run UI Tests

```bash
npx playwright test tests/ui/product.spec.ts --project=chromium
```

## Run All Tests

```bash
npx playwright test
```

## Test Coverage

### API

- Create user
- Validation scenarios
- Invalid data handling
- Idempotency simulation

### UI

- Main page opens successfully
- URL validation
- Page loading verification

## Design Patterns

- Page Object Model (POM)
- Reusable page abstraction
- Playwright fixtures

## Author

Sergey Yur
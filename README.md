# Demo Playwright Framework

A production-ready Playwright automation framework with TypeScript, Page Object Model, API tests, and CI/CD.

## Project Structure

```
demo-playwright-framework/
├── pages/
│   ├── BasePage.ts
│   └── HomePage.ts
├── tests/
│   ├── homepage.spec.ts
│   └── api/
│       └── api.spec.ts
├── utils/
│   └── helpers.ts
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

## Setup

```bash
npm install
npx playwright install
cp .env.example .env
```

## Running Tests

```bash
npm test                  # all tests headless
npm run test:headed       # headed mode
npm run test:ui           # Playwright UI mode
npm run test:chromium     # chromium only
npm run test:report       # view HTML report
```

## CI/CD

GitHub Actions workflow triggers on push to `main`/`develop` and on pull requests. Reports uploaded as artifacts.

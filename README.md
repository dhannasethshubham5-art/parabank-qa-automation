
# ParaBank QA Automation Framework

## 1. Project Overview

This project implements a UI and API automation testing framework for the ParaBank web application using Playwright and TypeScript.

The framework follows the Page Object Model (POM) design pattern to improve code reusability, maintainability, and scalability.

## 2. Technology Stack

- Playwright
- TypeScript
- Node.js
- Visual Studio Code
- HTML Custom Reporter

## 3. Project Structure

```text
QA-Assignment/
├── pages/
│   ├── RegisterPage.ts
│   ├── AccountsPage.ts
│   └── TransferPage.ts
├── tests/
│   ├── smoke.spec.ts
│   ├── scenario-a.spec.ts
│   ├── scenario-b.spec.ts
│   ├── scenario-c-api.spec.ts
│   └── currency-parser.spec.ts
├── utils/
│   ├── apiHelpers.ts
│   ├── apiTypes.ts
│   ├── testData.ts
│   └── CurrencyParser.ts
├── reports/
├── custom-reporter.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── README.md
└── DECISIONS.md
```

## 4. Prerequisites

- Node.js
- npm
- Visual Studio Code
- Git

## 5. Installation

Clone the repository:

```bash
git clone https://github.com/dhannasethshubham5-art/parabank-qa-automation.git
```

Navigate to the project directory:

```bash
cd parabank-qa-automation
```

Install dependencies:

```bash
npm install
```

Install Playwright Chromium:

```bash
npx playwright install chromium
```

## 6. Test Execution

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests with the custom HTML reporter:

```bash
npx playwright test --reporter=list,./custom-reporter.ts
```

## 7. Test Reports

The framework includes:

- Standard Playwright HTML report.
- Custom HTML execution report.
- Passed, failed, and skipped test summaries.
- Test execution duration.
- Glassmorphism-inspired dashboard design.
- Orange accent color (#F48031).

Generate the custom report by running:

```bash
npx playwright test --reporter=list,./custom-reporter.ts
```

Open the custom report:

```powershell
Invoke-Item reports/custom-report.html
```

## 8. Test Coverage

The project includes test implementations for:

- ParaBank application smoke testing.
- Dynamic user registration.
- Checking account creation.
- Fund transfer workflows.
- Transaction history validation.
- API-based customer and account operations.
- Currency parsing and validation.

**Execution Note:** Not all end-to-end scenarios have been verified successfully against the public ParaBank demo environment. Refer to actual execution results for the current test status.

## 9. Design Decisions

Refer to [DECISIONS.md](DECISIONS.md) for framework architecture, shared database handling, currency precision, and API/UI testing decisions.

## 10. Repository

GitHub: https://github.com/dhannasethshubham5-art/parabank-qa-automation

---

**Framework:** Playwright + TypeScript  
**Application Under Test:** ParaBank  
**Purpose:** QA Automation Assignment

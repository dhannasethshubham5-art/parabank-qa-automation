
# Design Decisions

## 1. Framework Architecture
Page Object Model (POM) is used to separate page locators and actions from test logic. This improves maintainability and reusability.

## 2. Shared Database State and Test Contention
The ParaBank demo application uses shared backend data. Parallel execution and database resets can affect other tests. Therefore, workers are configured to 1 and tests are executed sequentially. Unique usernames are used to reduce data conflicts.

## 3. Currency Precision
Floating-point calculations can introduce precision errors. Currency values are converted into integer cents before calculations and comparisons.

## 4. API vs UI Testing Boundary
UI tests validate user-facing workflows such as registration and account interactions. API tests validate backend operations and response data without depending on browser interactions.

## 5. Test Reporting
A custom HTML reporter provides execution summaries, including passed, failed and skipped tests, using a glassmorphism design and #F48031 accent color.

## 6. Environment Limitations
The public ParaBank demo environment may experience backend errors or shared-data issues. Test results should be interpreted with these limitations in mind.

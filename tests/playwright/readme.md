# PLaywright e2e Tests

End to end testing with playwright.

[More about playwright](https://playwright.dev/)

## Directories

- `./playwright/e2e` ist the place for your tests

## Scripts

Use following npm scripts for your test workflow:

- `npm run playwright-test` to run full playwright test suite (use this to set up your tests)
- `npm run test:playwright` to run playwright tests in headless mode (use this for ci)

## CI setup

Add `CI=true` as environment variable.

More on [configuation for continous integration]()
